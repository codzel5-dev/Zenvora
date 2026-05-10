/**
 * CloudConvert API Service
 * 
 * Uses CloudConvert API v2 for file conversion.
 * Supports: import via URL, conversion between formats, and export/download.
 * 
 * Key rotation is handled by cloudconvert-keys.ts
 * Keys + OAuth credentials are managed in config/cloudconvert-keys.ts
 * 
 * ⚠️ CloudConvert API v2 wraps all responses in a `data` object:
 *    { data: { id, status, tasks: [...] } }
 *    We must unwrap this to access the actual job data.
 * 
 * 🔄 Webhook flow:
 *    1. We create a job with `status_url` pointing to our webhook
 *    2. CloudConvert POSTs status updates to our webhook automatically
 *    3. Webhook stores the update in DB (ConversionJob table)
 *    4. Client polls our /api/convert/status endpoint (reads from DB — fast!)
 *    5. No need to call CloudConvert API for status checks
 */

import {
  getAvailableKey,
  recordKeyUsage,
  markKeyExhausted,
  disableKey,
  getRemainingQuota,
} from './cloudconvert-keys';

const CLOUDCONVERT_API = 'https://api.cloudconvert.com/v2';

// Supported conversion mappings
export const CONVERSION_MAP: Record<string, string[]> = {
  // Images
  'image/png': ['jpg', 'webp', 'gif', 'bmp', 'tiff', 'svg', 'pdf', 'ico'],
  'image/jpeg': ['png', 'webp', 'gif', 'bmp', 'tiff', 'pdf', 'ico'],
  'image/webp': ['png', 'jpg', 'gif', 'bmp', 'pdf'],
  'image/gif': ['png', 'jpg', 'webp', 'bmp', 'mp4'],
  'image/bmp': ['png', 'jpg', 'webp', 'pdf'],
  'image/tiff': ['png', 'jpg', 'webp', 'pdf'],
  'image/svg+xml': ['png', 'jpg', 'webp', 'pdf'],

  // Documents
  'application/pdf': ['docx', 'xlsx', 'pptx', 'txt', 'html', 'png', 'jpg'],
  'application/msword': ['pdf', 'txt', 'html', 'odt'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['pdf', 'txt', 'html', 'odt', 'rtf'],
  'application/vnd.ms-excel': ['pdf', 'csv', 'xlsx', 'html', 'ods'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['pdf', 'csv', 'html', 'ods'],
  'application/vnd.ms-powerpoint': ['pdf', 'pptx', 'png', 'jpg'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['pdf', 'png', 'jpg'],

  // Text & Code
  'text/plain': ['pdf', 'html', 'docx'],
  'text/html': ['pdf', 'txt', 'docx'],
  'text/csv': ['xlsx', 'pdf', 'json'],
  'application/json': ['csv', 'xml', 'yaml'],
  'application/xml': ['json', 'csv', 'html'],

  // Video
  'video/mp4': ['webm', 'avi', 'mov', 'mkv', 'gif', 'mp3', 'wav'],
  'video/webm': ['mp4', 'avi', 'mov', 'gif', 'mp3'],
  'video/avi': ['mp4', 'webm', 'mov', 'gif', 'mp3'],
  'video/quicktime': ['mp4', 'webm', 'avi', 'gif', 'mp3'],

  // Audio
  'audio/mpeg': ['wav', 'ogg', 'flac', 'aac', 'wma'],
  'audio/wav': ['mp3', 'ogg', 'flac', 'aac'],
  'audio/ogg': ['mp3', 'wav', 'flac'],
  'audio/flac': ['mp3', 'wav', 'ogg', 'aac'],

  // Archives
  'application/zip': ['tar', 'gz', '7z'],
  'application/x-rar-compressed': ['zip', 'tar', 'gz'],
};

/**
 * Get available output formats for a given MIME type
 */
export function getAvailableFormats(mimeType: string): string[] {
  return CONVERSION_MAP[mimeType] || [];
}

/**
 * Get the format string for CloudConvert from a MIME type
 */
function getFormatFromMime(mimeType: string): string {
  const mimeToFormat: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/tiff': 'tiff',
    'image/svg+xml': 'svg',
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
    'text/plain': 'txt',
    'text/html': 'html',
    'text/csv': 'csv',
    'application/json': 'json',
    'application/xml': 'xml',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'video/avi': 'avi',
    'video/quicktime': 'mov',
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'audio/ogg': 'ogg',
    'audio/flac': 'flac',
    'application/zip': 'zip',
    'application/x-rar-compressed': 'rar',
  };

  return mimeToFormat[mimeType] || mimeType.split('/').pop() || 'bin';
}

/**
 * Unwrap CloudConvert API v2 response.
 * Handles both wrapped { data: {...} } and unwrapped { id, status, ... } formats
 * for maximum compatibility.
 */
function unwrapJobData(raw: Record<string, unknown>): { id?: string; status?: string; tasks?: unknown[] } {
  if (raw && typeof raw === 'object' && 'data' in raw && raw.data && typeof raw.data === 'object') {
    return raw.data as { id?: string; status?: string; tasks?: unknown[] };
  }
  return raw as { id?: string; status?: string; tasks?: unknown[] };
}

/**
 * Create a CloudConvert conversion job
 * Flow: Import (URL) → Convert → Export (URL)
 * 
 * Uses the key rotation system and registers a webhook (status_url)
 * so CloudConvert pushes status updates to our server instead of us
 * having to poll their API.
 */
export async function createConversionJob(
  fileUrl: string,
  inputMimeType: string,
  outputFormat: string,
  fileName: string
): Promise<{ jobId: string; keyLabel: string }> {
  const keyResult = getAvailableKey();
  if (!keyResult) {
    const quota = getRemainingQuota();
    throw new Error(
      `No available CloudConvert API keys. Daily quota exhausted (${quota.used}/${quota.limit}). Please try again tomorrow or add more API keys to config/cloudconvert-keys.ts`
    );
  }

  const inputFormat = getFormatFromMime(inputMimeType);

  // Build the job payload with dynamic webhook (webhook_url)
  // Per CloudConvert docs: "When creating a job, you can set a webhook_url parameter.
  // This results in webhook notifications to the specified URL for the single job only."
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenvoora.vercel.app';
  const webhookUrl = `${siteUrl}/api/webhooks/cloudconvert`;

  const jobPayload = {
    webhook_url: webhookUrl,
    tasks: {
      'import-url': {
        operation: 'import/url',
        url: fileUrl,
        filename: fileName,
      },
      'convert-file': {
        operation: 'convert',
        input: 'import-url',
        input_format: inputFormat,
        output_format: outputFormat,
      },
      'export-url': {
        operation: 'export/url',
        input: 'convert-file',
      },
    },
  };

  try {
    const response = await fetch(`${CLOUDCONVERT_API}/jobs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${keyResult.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobPayload),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('[CloudConvert] Job creation failed:', response.status, errorText);

      // Handle specific errors with key rotation
      if (response.status === 401) {
        disableKey(keyResult.apiKey);
        return createConversionJob(fileUrl, inputMimeType, outputFormat, fileName);
      }
      if (response.status === 422) {
        throw new Error(`Unsupported conversion: ${inputFormat} → ${outputFormat}. CloudConvert rejected this format pair.`);
      }
      if (response.status === 429) {
        markKeyExhausted(keyResult.apiKey);
        return createConversionJob(fileUrl, inputMimeType, outputFormat, fileName);
      }

      throw new Error(`CloudConvert API error: ${response.status} - ${errorText}`);
    }

    const raw = await response.json();
    const jobData = unwrapJobData(raw);

    if (!jobData.id) {
      console.error('[CloudConvert] Unexpected response (no job ID):', JSON.stringify(raw).substring(0, 500));
      throw new Error('CloudConvert did not return a valid job ID.');
    }

    // Record successful usage on this key
    recordKeyUsage(keyResult.apiKey);

    console.log(`[CloudConvert] Job created: ${jobData.id} using ${keyResult.label} (converting ${inputFormat} → ${outputFormat})`);
    console.log(`[CloudConvert] Webhook registered: ${webhookUrl}`);

    return {
      jobId: jobData.id,
      keyLabel: keyResult.label,
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes('No available CloudConvert API keys')) {
      throw error;
    }
    console.error('[CloudConvert] Error creating job:', error);
    throw new Error(`Failed to create conversion job: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
