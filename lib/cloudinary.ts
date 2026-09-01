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
  resourceType: 'image' | 'raw' | 'video' = 'raw'
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

export default cloudinary;
