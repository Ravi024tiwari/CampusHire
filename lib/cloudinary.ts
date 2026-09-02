import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary SDK with environment credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  bytes: number;
  format: string;
  resourceType: string;
  originalFilename?: string;
}

export interface UploadOptions {
  folder?: string;
  resourceType?: 'image' | 'raw' | 'auto' | 'video';
  publicId?: string;
  tags?: string[];
}

/**
 * Check if Cloudinary credentials are fully configured in the environment.
 */
export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Extract Cloudinary publicId from a full asset URL.
 * Supports standard Cloudinary image and raw upload URLs.
 */
export function extractPublicIdFromUrl(url: string): string | null {
  if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) {
    return null;
  }

  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname; // e.g. /demo/image/upload/v12345678/campushire/avatars/sample.jpg
    const parts = pathname.split('/');

    // Find the index of 'upload'
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1 || uploadIndex === parts.length - 1) {
      return null;
    }

    // Skip version tag (e.g. 'v12345678') if present
    let publicIdParts = parts.slice(uploadIndex + 1);
    if (publicIdParts[0] && publicIdParts[0].startsWith('v') && /^\d+$/.test(publicIdParts[0].substring(1))) {
      publicIdParts = publicIdParts.slice(1);
    }

    const fullPathWithExt = publicIdParts.join('/');
    // Strip file extension if present
    const lastDotIndex = fullPathWithExt.lastIndexOf('.');
    return lastDotIndex !== -1 ? fullPathWithExt.substring(0, lastDotIndex) : fullPathWithExt;
  } catch (err) {
    console.error('[EXTRACT_PUBLIC_ID_ERROR]', err);
    return null;
  }
}

/**
 * Production-grade upload buffer to Cloudinary using a Promise-wrapped stream.
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment variables.'
    );
  }

  const {
    folder = 'campushire/general',
    resourceType = 'auto',
    publicId,
    tags = ['campushire'],
  } = options;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: publicId,
        tags,
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          console.error('[CLOUDINARY_UPLOAD_ERROR]', error);
          return reject(error || new Error('Upload to Cloudinary failed with empty result.'));
        }

        resolve({
          url: result.secure_url || result.url,
          publicId: result.public_id,
          bytes: result.bytes,
          format: result.format || 'pdf',
          resourceType: result.resource_type,
          originalFilename: result.original_filename,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Delete an asset from Cloudinary by public ID.
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'raw' | 'video' = 'image'
): Promise<boolean> {
  if (!isCloudinaryConfigured() || !publicId) {
    return false;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result.result === 'ok';
  } catch (error) {
    console.error('[CLOUDINARY_DELETE_ERROR]', error);
    return false;
  }
}

/**
 * Helper to delete an asset directly by its Cloudinary URL in the background.
 */
export async function deleteFromCloudinaryUrl(
  url: string | null | undefined,
  resourceType: 'image' | 'raw' | 'video' = 'image'
): Promise<boolean> {
  if (!url) return false;
  const publicId = extractPublicIdFromUrl(url);
  if (!publicId) return false;
  return deleteFromCloudinary(publicId, resourceType);
}

/**
 * Delete multiple Cloudinary assets by URLs in parallel.
 */
export async function deleteMultipleCloudinaryUrls(
  urls: (string | null | undefined)[],
  resourceType: 'image' | 'raw' | 'video' = 'image'
): Promise<void> {
  const validUrls = urls.filter(Boolean) as string[];
  await Promise.allSettled(
    validUrls.map((url) => deleteFromCloudinaryUrl(url, resourceType))
  );
}

export default cloudinary;
