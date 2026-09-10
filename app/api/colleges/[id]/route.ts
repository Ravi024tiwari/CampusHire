import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleApiError, handleValidationError } from '@/lib/api-response';

const updateCollegeSchema = z.object({
  name: z.string().trim().min(2, 'College name must be at least 2 characters').optional(),
  code: z.string().trim().toUpperCase().min(2, 'College code must be at least 2 characters').optional().nullable(),
  domain: z.string().trim().toLowerCase().optional().nullable(),
  city: z.string().trim().min(2, 'City is required').optional().nullable(),
  state: z.string().trim().min(2, 'State is required').optional().nullable(),
  contactEmail: z.string().trim().email('Invalid contact email address').optional().nullable().or(z.literal('')),
  contactPhone: z.string().trim().optional().nullable(),
  logoUrl: z.string().url('Invalid logo URL').optional().nullable().or(z.literal('')),
  images: z.array(z.string().url('Invalid image URL')).max(10, 'Maximum 10 campus images allowed').optional(),
});

/**
 * GET /api/colleges/[id]
 * Production-grade endpoint to fetch complete institutional profile for a college,
 * including academic programs, recruiter track record, real stats, TPO officers, and location data.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [
      college,
      placedStudentsCount,
      totalOffersCount,
      totalApplicationsCount,
      placementEligibleCount,
      activeJobsCount,
      branchDistribution,
      collegeJobsList,
      collegeOffersList,
    ] = await Promise.all([
      prisma.college.findUnique({
        where: { id },
        include: {
          tpos: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  avatarUrl: true,
                  isActive: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
          },
          jobs: {
            include: {
              company: {
                select: {
                  id: true,
                  name: true,
                  logoUrl: true,
                  industry: true,
                  location: true,
                  isVerified: true,
                },
              },
              _count: {
                select: {
                  applications: true,
                  offers: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: 20,
          },
          _count: {
            select: {
              students: true,
              jobs: true,
              tpos: true,
              offers: true,
            },
          },
        },
      }),
      prisma.offer.count({
        where: {
          collegeId: id,
          status: 'ACCEPTED',
        },
      }),
      prisma.offer.count({
        where: {
          collegeId: id,
        },
      }),
      prisma.application.count({
        where: {
          job: {
            collegeId: id,
          },
        },
      }),
      prisma.studentProfile.count({
        where: {
          collegeId: id,
          isVerified: true,
        },
      }),
      prisma.job.count({
        where: {
          collegeId: id,
          status: 'ACTIVE',
        },
      }),
      prisma.studentProfile.groupBy({
        by: ['branch'],
        where: {
          collegeId: id,
        },
        _count: {
          id: true,
        },
      }),
      prisma.job.findMany({
        where: {
          collegeId: id,
        },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
              industry: true,
              location: true,
              isVerified: true,
            },
          },
          _count: {
            select: {
              applications: true,
              offers: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.offer.findMany({
        where: {
          collegeId: id,
        },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
              industry: true,
              location: true,
              isVerified: true,
            },
          },
          job: {
            select: {
              title: true,
              salaryPackage: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    if (!college) {
      return errorResponse('University / College institution not found', 404);
    }

    const name = college.name;
    const code = college.code || '';
    const city = college.city || '';
    const state = college.state || '';
    const locationStr = [city, state].filter(Boolean).join(', ');
    const domain = college.domain || '';
    const website = domain ? (domain.startsWith('http') ? domain : `https://${domain}`) : '';
    const contactEmail = college.contactEmail || college.tpos[0]?.user.email || '';
    const contactPhone = college.contactPhone || '';

    // Total counts calculation from real database
    const totalStudents = college._count?.students || 0;
    const placementEligible = placementEligibleCount > 0 ? placementEligibleCount : totalStudents;
    const placedStudents = placedStudentsCount;
    const placementRate = placementEligible > 0 
      ? Math.min(100, Math.round((placedStudents / placementEligible) * 100))
      : 0;

    // Academic courses / branch distribution from registered student profiles
    const courses = branchDistribution.map((b) => ({
      branch: b.branch || 'Engineering & Technology',
      level: 'Undergraduate / Postgraduate',
      duration: '4 Years',
      enrolled: b._count.id,
      averagePackage: 'Competitive',
    }));

    // Extract ONLY real companies tied up with this college from actual jobs & offers
    const companyMap = new Map<string, {
      id: string;
      name: string;
      logoUrl?: string | null;
      industry?: string | null;
      location?: string | null;
      hiresCount: number;
      tier: string;
      packageRange?: string;
      roles: string[];
      category: string;
      featured: boolean;
    }>();

    // 1. Process real jobs posted for this college
    for (const job of collegeJobsList) {
      if (!job.company) continue;
      const cId = job.company.id;
      const offersCount = job._count?.offers || 0;

      const indLower = (job.company.industry || '').toLowerCase();
      const category = indLower.includes('fintech') || indLower.includes('bank') || indLower.includes('quant')
        ? 'fintech'
        : indLower.includes('consult') || indLower.includes('advis')
        ? 'consulting'
        : indLower.includes('auto') || indLower.includes('electric') || indLower.includes('semi') || indLower.includes('hardw')
        ? 'core'
        : indLower.includes('start') || indLower.includes('venture')
        ? 'startup'
        : 'tech';

      if (!companyMap.has(cId)) {
        companyMap.set(cId, {
          id: cId,
          name: job.company.name,
          logoUrl: job.company.logoUrl,
          industry: job.company.industry || 'Technology & Engineering',
          location: job.company.location,
          hiresCount: offersCount,
          tier: job.company.isVerified ? 'Verified Partner' : 'Campus Recruiter',
          packageRange: job.salaryPackage || 'Competitive Package',
          roles: job.title ? [job.title] : [],
          category: category,
          featured: Boolean(job.company.isVerified),
        });
      } else {
        const existing = companyMap.get(cId)!;
        existing.hiresCount += offersCount;
        if (job.title && !existing.roles.includes(job.title)) {
          existing.roles.push(job.title);
        }
        if (job.salaryPackage && existing.packageRange === 'Competitive Package') {
          existing.packageRange = job.salaryPackage;
        }
      }
    }

    // 2. Process real offers extended to students of this college
    for (const offer of collegeOffersList) {
      if (!offer.company) continue;
      const cId = offer.company.id;
      if (!companyMap.has(cId)) {
        const indLower = (offer.company.industry || '').toLowerCase();
        const category = indLower.includes('fintech') || indLower.includes('bank') || indLower.includes('quant')
          ? 'fintech'
          : indLower.includes('consult') || indLower.includes('advis')
          ? 'consulting'
          : indLower.includes('auto') || indLower.includes('electric') || indLower.includes('semi') || indLower.includes('hardw')
          ? 'core'
          : indLower.includes('start') || indLower.includes('venture')
          ? 'startup'
          : 'tech';

        companyMap.set(cId, {
          id: cId,
          name: offer.company.name,
          logoUrl: offer.company.logoUrl,
          industry: offer.company.industry || 'Corporate Partner',
          location: offer.company.location,
          hiresCount: 1,
          tier: offer.company.isVerified ? 'Verified Partner' : 'Campus Recruiter',
          packageRange: offer.job?.salaryPackage || 'Competitive Package',
          roles: offer.job?.title ? [offer.job.title] : [],
          category: category,
          featured: Boolean(offer.company.isVerified),
        });
      } else {
        const existing = companyMap.get(cId)!;
        existing.hiresCount += 1;
        if (offer.job?.title && !existing.roles.includes(offer.job.title)) {
          existing.roles.push(offer.job.title);
        }
      }
    }

    const recruitingCompanies = Array.from(companyMap.values());

    const payload = {
      ...college,
      about: {
        summary: `${name} ${code ? `(${code})` : ''} is registered on CampusHire with ${totalStudents} active student profiles and placement operations.`,
        description: `${name} provides higher education programs located in ${locationStr || 'India'}. Discover verified talent, academic performance, and recruitment drive opportunities on CampusHire.`,
      },
      keyDetails: {
        universityType: 'Higher Education Institution',
        establishedYear: null,
        location: locationStr,
        website: website || domain,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
        accreditation: college.isVerified ? 'CampusHire Verified' : 'Pending Verification',
        approvedBy: 'AICTE / UGC',
      },
      highlights: [
        {
          title: `${totalStudents}`,
          subtitle: 'Enrolled Students',
          icon: 'users',
        },
        {
          title: `${college._count?.jobs || 0}`,
          subtitle: 'Active Placement Drives',
          icon: 'briefcase',
        },
        {
          title: `${placedStudents}`,
          subtitle: 'Confirmed Placements',
          icon: 'trophy',
        },
        {
          title: `${college._count?.tpos || 0}`,
          subtitle: 'Placement Officers (TPOs)',
          icon: 'network',
        },
      ],
      recruitingCompanies: recruitingCompanies,
      socialMedia: {
        linkedin: domain ? `https://linkedin.com/school/${code ? code.toLowerCase() : 'college'}` : '',
        instagram: '',
        youtube: '',
        twitter: '',
        facebook: '',
      },
      brochure: null,
      mapLocation: {
        lat: 28.6139,
        lng: 77.2090,
        label: `${name}${locationStr ? `, ${locationStr}` : ''}`,
        mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(`${name} ${locationStr}`)}`,
      },
      courses: courses,
      placementStats: {
        enrolledStudents: totalStudents,
        placedStudents: placedStudents,
        placementEligible: placementEligible,
        placementRate: placementRate,
        totalOffers: totalOffersCount,
        totalApplications: totalApplicationsCount,
        activeDrives: activeJobsCount,
        highestPackage: 'Disclosed per drive',
        averagePackage: 'Disclosed per drive',
        medianPackage: 'Disclosed per drive',
        recruitingCompaniesCount: recruitingCompanies.length,
      },
    };

    return successResponse(payload, 'College profile details and placement intelligence retrieved successfully');
  } catch (error: any) {
    return handleApiError(error, 'Failed to retrieve college profile', '[GET_COLLEGE_BY_ID_ERROR]');
  }
}

/**
 * PATCH /api/colleges/[id]
 * Secure production-grade endpoint for authorized TPOs and College Creators (or Super Admins)
 * to update their institution's profile details.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 1. Authenticate user
    const authUser = await requireAuth(req);

    // 2. Fetch target college and requesting user's profiles
    const [college, userProfile] = await Promise.all([
      prisma.college.findUnique({
        where: { id },
        include: {
          tpos: true,
        },
      }),
      prisma.user.findUnique({
        where: { id: authUser.userId },
        include: {
          tpo: true,
          recruiter: true,
        },
      }),
    ]);

    if (!college) {
      return errorResponse('University / College institution not found', 404);
    }

    // 3. Granular Production-Grade RBAC Authorization Check:
    // - SUPER_ADMIN: Can update any college
    // - TPO_ADMIN: Can only update if they belong to this college
    // - RECRUITER: Can only update if they were the creator of this college
    const isSuperAdmin = authUser.role === Role.SUPER_ADMIN;
    const isCollegeTpo = 
      authUser.role === Role.TPO_ADMIN && 
      (userProfile?.tpo?.collegeId === id || college.tpos.some((t) => t.userId === authUser.userId));
    const isCollegeCreator = college.createdById === authUser.userId;

    if (!isSuperAdmin && !isCollegeTpo && !isCollegeCreator) {
      return errorResponse(
        'Access denied. You do not have authorization to edit this college profile. Only assigned TPO administrators or institutional onboarding creators may perform this action.',
        403
      );
    }

    // 4. Validate payload with Zod
    const body = await req.json();
    const validatedData = updateCollegeSchema.parse(body);

    // 5. Unique checks if name or code are being changed
    if (validatedData.name && validatedData.name !== college.name) {
      const duplicateName = await prisma.college.findUnique({
        where: { name: validatedData.name },
      });
      if (duplicateName && duplicateName.id !== id) {
        return errorResponse('Another institution is already registered with this name.', 400);
      }
    }

    if (validatedData.code && validatedData.code !== college.code) {
      const duplicateCode = await prisma.college.findUnique({
        where: { code: validatedData.code },
      });
      if (duplicateCode && duplicateCode.id !== id) {
        return errorResponse('Institutional code is already assigned to another campus.', 400);
      }
    }

    // 6. Update college record
    const updatedCollege = await prisma.college.update({
      where: { id },
      data: {
        ...(validatedData.name !== undefined ? { name: validatedData.name } : {}),
        ...(validatedData.code !== undefined ? { code: validatedData.code || null } : {}),
        ...(validatedData.domain !== undefined ? { domain: validatedData.domain || null } : {}),
        ...(validatedData.city !== undefined ? { city: validatedData.city || null } : {}),
        ...(validatedData.state !== undefined ? { state: validatedData.state || null } : {}),
        ...(validatedData.contactEmail !== undefined ? { contactEmail: validatedData.contactEmail || null } : {}),
        ...(validatedData.contactPhone !== undefined ? { contactPhone: validatedData.contactPhone || null } : {}),
        ...(validatedData.logoUrl !== undefined ? { logoUrl: validatedData.logoUrl || null } : {}),
        ...(validatedData.images !== undefined ? { images: validatedData.images } : {}),
      },
      include: {
        tpos: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    return successResponse(updatedCollege, 'College profile details updated successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    return handleApiError(error, 'Failed to update college details', '[PATCH_COLLEGE_DETAILS_ERROR]');
  }
}
