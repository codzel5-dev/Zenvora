/**
 * CloudConvert API Service
 * 
 * Uses CloudConvert API v2 for file conversion.
 * Supports: import via URL, conversion between formats, and export/download.
 * 
 * Key rotation is handled by cloudconvert-keys.ts
 * Keys + OAuth credentials are managed in config/cloudconvert-keys.ts
 */

import {
  getAvailableKey,
  recordKeyUsage,
  markKeyExhausted,
  disableKey,
  getRemainingQuota,
  AvailableKeyResult,
} from './cloudconvert-keys';

const CLOUDCONVERT_API = 'https://api.cloudconvert.com/v2';

// Track which API key was used for each job (for status polling)
const jobKeyMap: Map<string, AvailableKeyResult> = new Map();

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

interface CloudConvertResponse {
  id: string;
  status: string;
  tasks?: Array<{
    id: string;
    name: string;
    operation: string;
    status: string;
    result?: {
      files?: Array<{
        filename: string;
        url: string;
      }>;
    };
  }>;
}

/**
 * Create a CloudConvert conversion job
 * Flow: Import (URL) → Convert → Export (URL)
 * 
 * Uses the key rotation system which automatically picks the next available
 * key (with its OAuth credentials) when the current key is exhausted.
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

  // Build the job payload — CloudConvert API v2 expects task properties
  // at the TOP LEVEL (not wrapped in a "data" object)
  const jobPayload = {
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
        // Retry with next available key
        return createConversionJob(fileUrl, inputMimeType, outputFormat, fileName);
      }
      if (response.status === 422) {
        throw new Error(`Unsupported conversion: ${inputFormat} → ${outputFormat}. CloudConvert rejected this format pair.`);
      }
      if (response.status === 429) {
        markKeyExhausted(keyResult.apiKey);
        // Retry with next available key
        return createConversionJob(fileUrl, inputMimeType, outputFormat, fileName);
      }

      throw new Error(`CloudConvert API error: ${response.status} - ${errorText}`);
    }

    const data: CloudConvertResponse = await response.json();

    // Record successful usage on this key
    recordKeyUsage(keyResult.apiKey);

    // Store which key was used for this job (needed for status polling)
    jobKeyMap.set(data.id, keyResult);

    console.log(`[CloudConvert] Job created: ${data.id} using ${keyResult.label} (converting ${inputFormat} → ${outputFormat})`);

    return {
      jobId: data.id,
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

/**
 * Get the status of a CloudConvert job
 * Uses the same API key that was used to create the job
 */
export async function getJobStatus(jobId: string): Promise<{
  status: 'waiting' | 'processing' | 'finished' | 'error';
  percent?: number;
  downloadUrl?: string;
  outputFilename?: string;
  error?: string;
}> {
  // Try to use the same key that created this job
  let keyResult = jobKeyMap.get(jobId) || null;

  // Fallback: if we don't know which key created this job, get any available one
  if (!keyResult) {
    keyResult = getAvailableKey();
  }

  if (!keyResult) {
    throw new Error('No available CloudConvert API keys to check job status');
  }

  try {
    const response = await fetch(`${CLOUDCONVERT_API}/jobs/${jobId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${keyResult.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`Failed to get job status: ${response.status} - ${errorText}`);
    }

    const data: CloudConvertResponse = await response.json();

    // Map CloudConvert status to our status
    const statusMap: Record<string, 'waiting' | 'processing' | 'finished' | 'error'> = {
      'waiting': 'waiting',
      'processing': 'processing',
      'finished': 'finished',
      'error': 'error',
    };

    const status = statusMap[data.status] || 'waiting';

    // Extract download URL from export task
    let downloadUrl: string | undefined;
    let outputFilename: string | undefined;
    let percent: number | undefined;

    if (data.tasks) {
      for (const task of data.tasks) {
        // Get progress from convert task
        if (task.operation === 'convert' && task.status === 'processing') {
          percent = 50;
        }

        // Get download URL from export task
        if (task.operation === 'export/url' && task.result?.files?.[0]) {
          downloadUrl = task.result.files[0].url;
          outputFilename = task.result.files[0].filename;
        }

        // Check for errors in any task
        if (task.status === 'error') {
          return {
            status: 'error',
            error: `Task "${task.name}" failed during conversion. The input format may not be supported for this conversion type.`,
          };
        }
      }
    }

    return {
      status,
      percent,
      downloadUrl,
      outputFilename,
    };
  } catch (error) {
    console.error('[CloudConvert] Error getting job status:', error);
    throw new Error(`Failed to get job status: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Wait for a CloudConvert job to complete (with polling)
 */
export async function waitForJob(
  jobId: string,
  maxWaitMs: number = 120000,
  pollIntervalMs: number = 2000
): Promise<{
  downloadUrl: string;
  outputFilename: string;
}> {
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitMs) {
    const status = await getJobStatus(jobId);

    if (status.status === 'finished' && status.downloadUrl) {
      return {
        downloadUrl: status.downloadUrl,
        outputFilename: status.outputFilename || 'converted-file',
      };
    }

    if (status.status === 'error') {
      throw new Error(status.error || 'Conversion failed');
    }

    // Wait before next poll
    await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
  }

  throw new Error('Conversion timed out. The file may be too large or the server is busy. Please try again.');
}
