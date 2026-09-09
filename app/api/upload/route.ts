import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/rbac';
import { successResponse, errorResponse } from '@/lib/api-response';
import { uploadToCloudinary, isCloudinaryConfigured } from '@/lib/cloudinary';

// Max file sizes (in bytes) - Up to 10MB
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024; // 10MB for PDFs / Resumes / Offer Letters / Documents
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB for photos / logos / avatars / campus images

const ALLOWED_MIME_TYPES: Record<string, { mimes: string[]; folder: string; maxBytes: number; resourceType: 'auto' | 'image' | 'raw' }> = {
  resume: {
    mimes: ['application/pdf'],
    folder: 'campushire/resumes',
    maxBytes: MAX_DOCUMENT_SIZE,
    resourceType: 'raw',
  },
  avatar: {
    mimes: ['image/jpeg', 'image/png', 'image/webp'],
    folder: 'campushire/avatars',
    maxBytes: MAX_IMAGE_SIZE,
    resourceType: 'image',
  },
  logo: {
    mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    folder: 'campushire/company_logos',
    maxBytes: MAX_IMAGE_SIZE,
    resourceType: 'image',
  },
  college_campus: {
    mimes: ['image/jpeg', 'image/png', 'image/webp'],
    folder: 'campushire/college_campuses',
    maxBytes: MAX_IMAGE_SIZE,
    resourceType: 'image',
  },
  college_logo: {
    mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    folder: 'campushire/college_logos',
    maxBytes: MAX_IMAGE_SIZE,
    resourceType: 'image',
  },
  offer_letter: {
    mimes: ['application/pdf'],
    folder: 'campushire/offer_letters',
    maxBytes: MAX_DOCUMENT_SIZE,
    resourceType: 'raw',
  },
  general: {
    mimes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
    folder: 'campushire/documents',
    maxBytes: MAX_DOCUMENT_SIZE,
    resourceType: 'auto',
  },
};

export async function POST(req: NextRequest) {
  try {
    // 1. Check optional authentication (allows public logo/campus image upload during onboarding)
    let authUser = null;
    try {
      authUser = await requireAuth(req);
    } catch {
      // Allow unauthenticated uploads strictly for registration image categories
    }

    // 2. Parse multipart form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as string) || 'general';

    if (!file) {
      return errorResponse('No file uploaded. Please provide a "file" in form-data.', 400);
    }

    const publicCategories = ['logo', 'college_campus', 'college_logo', 'avatar'];
    if (!authUser && !publicCategories.includes(category)) {
      return errorResponse('Authentication required for document uploads.', 401);
    }

    const config = ALLOWED_MIME_TYPES[category] || ALLOWED_MIME_TYPES.general;

    // 3. Validate MIME type
    if (!config.mimes.includes(file.type)) {
      return errorResponse(
        `Invalid file format: ${file.type}. Allowed types for ${category}: ${config.mimes.join(', ')}`,
        400
      );
    }

    // 4. Validate File Size
    if (file.size > config.maxBytes) {
      const maxMb = Math.round(config.maxBytes / (1024 * 1024));
      return errorResponse(`File size exceeds maximum allowed limit of ${maxMb}MB.`, 400);
    }

    // 5. Check Cloudinary Configuration
    if (!isCloudinaryConfigured()) {
      return errorResponse(
        'Cloudinary storage is not configured on the server. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
        500
      );
    }

    // 6. Convert file stream to Buffer and upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await uploadToCloudinary(buffer, {
      folder: config.folder,
      resourceType: config.resourceType,
      tags: [
        category, 
        authUser?.role?.toLowerCase() || 'public_registration', 
        authUser?.userId || 'guest'
      ],
    });

    return successResponse(
      {
        url: uploadResult.url,
        publicId: uploadResult.publicId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        category,
      },
      'File uploaded successfully to Cloudinary',
      201
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[FILE_UPLOAD_API_ERROR]', error);
    return errorResponse(error.message || 'Failed to upload file.', 500);
  }
}
