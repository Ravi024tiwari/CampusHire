/**
 * PDF Viewer & Cloudinary Helper Utilities
 */

/**
 * Returns a robust URL to view or preview a PDF document.
 * 
 * Handles Cloudinary delivery variations:
 * 1. If it's a Cloudinary /image/upload/ PDF that might be blocked by browser/account restriction,
 *    can provide direct viewer or Google Docs embedded viewer link.
 * 2. If it's raw/upload/, returns direct URL.
 */
export function getPdfViewUrl(url?: string | null): string {
  if (!url || url === '#') return '#';

  const cleanUrl = url.trim();

  // If already a valid absolute URL
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    return cleanUrl;
  }

  return cleanUrl;
}

/**
 * Returns a Google Docs PDF Viewer URL as a reliable cross-origin fallback
 * for opening or embedding PDFs in iframes when cloud storage restricts direct preview.
 */
export function getGoogleDocsPdfViewerUrl(url?: string | null): string {
  if (!url || url === '#') return '#';
  return `https://docs.google.com/viewer?url=${encodeURIComponent(url.trim())}&embedded=true`;
}

/**
 * Cloudinary PDF download transformation:
 * Adds `fl_attachment` to force direct browser download if preview is blocked.
 */
export function getCloudinaryDownloadUrl(url?: string | null, filename?: string): string {
  if (!url || url === '#') return '#';
  if (!url.includes('cloudinary.com')) return url;

  // Insert fl_attachment after /upload/
  if (url.includes('/upload/')) {
    const attachmentFlag = filename ? `fl_attachment:${encodeURIComponent(filename)}` : 'fl_attachment';
    return url.replace('/upload/', `/upload/${attachmentFlag}/`);
  }

  return url;
}

/**
 * Safe PDF Opener in new browser tab
 */
export function openPdfInNewTab(url?: string | null, fallbackToGoogleDocs: boolean = false): void {
  if (!url || url === '#') return;

  const targetUrl = fallbackToGoogleDocs ? getGoogleDocsPdfViewerUrl(url) : getPdfViewUrl(url);
  window.open(targetUrl, '_blank', 'noopener,noreferrer');
}
