import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthContext } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const authPayload = await getAuthContext(req);

    // If authenticated user is a student, fetch their personalized profile and records
    let studentProfile = null;
    let applicationsCount = 12;
    let interviewsCount = 5;
    let offersCount = 2;
    let profileCompletionPercentage = 78;
    let studentName = 'Ravi Tiwari';
    let studentSubtitle = 'B.Tech CSE (2026)';
    let studentAvatar = null;
    let collegeName = 'Delhi Technological University';

    if (authPayload && authPayload.role === Role.STUDENT) {
      studentProfile = await prisma.studentProfile.findUnique({
        where: { userId: authPayload.userId },
        include: {
          user: { select: { name: true, email: true, avatarUrl: true } },
          college: { select: { id: true, name: true, code: true, city: true, logoUrl: true } },
          applications: {
            include: {
              job: {
                include: {
                  company: { select: { name: true, logoUrl: true } },
                  college: { select: { name: true } },
                },
              },
            },
          },
          resumes: true,
        },
      });

      if (studentProfile) {
        studentName = studentProfile.user.name || 'Ravi Tiwari';
        studentAvatar = studentProfile.user.avatarUrl;
        studentSubtitle = `${studentProfile.branch || 'B.Tech CSE'} (${studentProfile.batchYear || 2026})`;
        if (studentProfile.college?.name) collegeName = studentProfile.college.name;

        applicationsCount = studentProfile.applications.length;
        interviewsCount = studentProfile.applications.filter(
          (a) => a.status === 'INTERVIEW_SCHEDULED'
        ).length;
        offersCount = studentProfile.applications.filter((a) => a.status === 'OFFERED').length;

        // Calculate profile completion percentage
        let score = 30; // base registered
        if (studentProfile.cgpa) score += 15;
        if (studentProfile.skills && studentProfile.skills.length > 0) score += 15;
        if (studentProfile.resumeUrl || studentProfile.resumes.length > 0) score += 15;
        if (studentProfile.githubUrl) score += 10;
        if (studentProfile.linkedinUrl) score += 10;
        if (studentProfile.tenthMarks && studentProfile.twelfthMarks) score += 5;
        profileCompletionPercentage = Math.min(100, score);
      }
    }

    // Fetch real live campus drives from database
    const now = new Date();
    const liveJobs = await prisma.job.findMany({
      where: {
        status: 'ACTIVE',
      },
      take: 6,
      orderBy: { deadline: 'asc' },
      include: {
        company: {
          select: { id: true, name: true, logoUrl: true },
        },
        college: {
          select: { id: true, name: true, code: true, city: true },
        },
        _count: {
          select: { applications: true },
        },
      },
    });

    // Fallback/Sample Upcoming Placement Drives matching mockup
    const upcomingDrives = liveJobs.length > 0 ? liveJobs.slice(0, 3).map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company.name,
      companyLogo: job.company.logoUrl,
      type: job.type === 'FULL_TIME' ? 'Full Time' : job.type === 'INTERNSHIP' ? 'Internship' : 'Intern + FTE',
      mode: job.location?.toLowerCase().includes('remote') ? 'Remote' : job.location?.toLowerCase().includes('hybrid') ? 'Hybrid' : 'On-campus',
      package: job.salaryPackage || '₹ 12 LPA',
      deadline: new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rawDeadline: job.deadline,
      collegeName: job.college.name,
    })) : [
      {
        id: 'drive-google-1',
        title: 'Software Engineer Intern',
        company: 'Google',
        companyLogo: '/images/company/google_logo.jpg',
        type: 'Internship',
        mode: 'On-campus',
        package: '₹ 12 LPA',
        deadline: 'Sep 15',
        rawDeadline: '2026-09-15T18:00:00.000Z',
        collegeName: 'Campus Partner',
      },
      {
        id: 'drive-ms-2',
        title: 'SDE Full Time',
        company: 'Microsoft',
        companyLogo: null,
        type: 'Full Time',
        mode: 'Hybrid',
        package: '₹ 28 LPA',
        deadline: 'Sep 20',
        rawDeadline: '2026-09-20T18:00:00.000Z',
        collegeName: 'Campus Partner',
      },
      {
        id: 'drive-tcs-3',
        title: 'Ninja Hiring',
        company: 'Tata Consultancy Services',
        companyLogo: null,
        type: 'Full Time',
        mode: 'On-campus',
        package: '₹ 7 LPA',
        deadline: 'Sep 25',
        rawDeadline: '2026-09-25T18:00:00.000Z',
        collegeName: 'Campus Partner',
      },
    ];

    // AI Recommended Jobs matching mockup
    const recommendedJobs = [
      {
        id: 'rec-phonepe-1',
        title: 'Product Analyst Intern',
        company: 'PhonePe',
        companyLogo: null,
        type: 'Internship',
        location: 'Bangalore',
        package: '₹ 10 LPA',
        matchScore: 92,
        skills: ['SQL', 'Python', 'Product Analytics'],
      },
      {
        id: 'rec-swiggy-2',
        title: 'Backend Developer',
        company: 'Swiggy',
        companyLogo: null,
        type: 'Full Time',
        location: 'Bangalore',
        package: '₹ 14 LPA',
        matchScore: 88,
        skills: ['Golang', 'Node.js', 'PostgreSQL'],
      },
      {
        id: 'rec-zoho-3',
        title: 'Software Engineer',
        company: 'Zoho',
        companyLogo: null,
        type: 'Full Time',
        location: 'Chennai',
        package: '₹ 8 LPA',
        matchScore: 85,
        skills: ['Java', 'Data Structures', 'Spring Boot'],
      },
    ];

    // Recent Updates Activity Feed matching mockup
    const recentUpdates = [
      {
        id: 'up-1',
        title: 'Microsoft started accepting applications',
        timeAgo: '2 hours ago',
        category: 'drive',
        iconType: 'company',
      },
      {
        id: 'up-2',
        title: 'Your interview is scheduled with TCS',
        timeAgo: '5 hours ago',
        category: 'interview',
        iconType: 'calendar',
      },
      {
        id: 'up-3',
        title: 'Google drive registration is now open',
        timeAgo: '1 day ago',
        category: 'drive',
        iconType: 'company',
      },
      {
        id: 'up-4',
        title: 'Your resume score improved to 85%',
        timeAgo: '2 days ago',
        category: 'resume',
        iconType: 'document',
      },
      {
        id: 'up-5',
        title: 'New learning resource added: System Design',
        timeAgo: '3 days ago',
        category: 'resource',
        iconType: 'book',
      },
    ];

    // Resume Analysis Score & Checklist matching mockup
    const resumeAnalysis = {
      score: 85,
      headline: 'Your resume is looking great!',
      checklist: [
        { label: 'Good structure', passed: true },
        { label: 'Relevant skills found', passed: true },
        { label: 'Add more projects', passed: false },
        { label: 'Include achievements', passed: true },
      ],
    };

    // Placement Readiness Checklist matching mockup
    const placementReadiness = {
      subtitle: "You're on the right track!",
      readinessScore: 82,
      milestones: [
        { key: 'resume', label: 'Resume', status: 'completed' },
        { key: 'aptitude', label: 'Aptitude Skills', status: 'completed' },
        { key: 'dsa', label: 'DSA Practice', status: 'in_progress' },
        { key: 'mock', label: 'Mock Interviews', status: 'pending' },
        { key: 'profile', label: 'Profile Completion', status: 'completed' },
      ],
    };

    const dashboardData = {
      student: {
        name: studentName,
        subtitle: studentSubtitle,
        avatarUrl: studentAvatar,
        college: collegeName,
      },
      stats: {
        appliedJobs: { count: applicationsCount, trend: '+3 this week' },
        interviews: { count: interviewsCount, trend: '2 upcoming' },
        offers: { count: offersCount, actionText: 'View details →' },
        profileCompletion: { percentage: profileCompletionPercentage, actionText: 'Complete now →' },
      },
      upcomingDrives,
      recommendedJobs,
      recentUpdates,
      resumeAnalysis,
      placementReadiness,
    };

    return successResponse(dashboardData, 'Student dashboard data retrieved successfully');
  } catch (error: any) {
    console.error('[STUDENT_DASHBOARD_GET_ERROR]', error);
    return errorResponse(error.message || 'Failed to retrieve student dashboard data', 500);
  }
}
