const LMFILES_API_URL = 'https://lmfiles.com/api/v1/files';

interface UploadResult {
  fileId: string;
  url: string;
}

/**
 * Sanitize a filename to only contain ASCII-safe characters.
 * lmfiles.com returns 500 Internal Server Error for files with
 * non-ASCII names (Arabic, Chinese, emoji, etc.), so we must
 * rename the file before uploading while keeping the extension.
 */
function sanitizeFileName(originalName: string): string {
  // Extract the extension (keep it as-is, it's usually ASCII)
  const lastDot = originalName.lastIndexOf('.');
  const baseName = lastDot > 0 ? originalName.substring(0, lastDot) : originalName;
  const extension = lastDot > 0 ? originalName.substring(lastDot) : '';

  // Replace any non-ASCII character with underscore, collapse multiple underscores
  const safeBase = baseName
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');

  // If the base name becomes empty after sanitization, generate a unique one
  const finalBase = safeBase || `file_${Date.now()}`;

  return finalBase + extension.toLowerCase();
}

export async function uploadFile(file: File): Promise<UploadResult> {
  const apiKey = process.env.LMFILES_API_KEY;

  if (!apiKey || apiKey === 'lmf_your_api_key_here') {
    // If no API key configured, simulate a successful upload for demo purposes
    const fakeId = `demo_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    return {
      fileId: fakeId,
      url: `https://lmfiles.com/f/${fakeId}`,
    };
  }

  // Sanitize filename to prevent 500 errors from lmfiles on non-ASCII names
  const safeName = sanitizeFileName(file.name);
  const safeFile = new File([file], safeName, { type: file.type });

  const formData = new FormData();
  formData.append('file', safeFile);

  const response = await fetch(`${LMFILES_API_URL}/upload`, {
    method: 'POST',
    headers: {
      'X-API-Key': apiKey,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`lmfiles upload failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  return {
    fileId: data.file_id || data.id || data.fileId,
    url: data.url || data.file_url || data.link,
  };
}

export async function deleteFile(fileId: string): Promise<void> {
  const apiKey = process.env.LMFILES_API_KEY;

  if (!apiKey || apiKey === 'lmf_your_api_key_here') {
    return; // Skip deletion for demo mode
  }

  const response = await fetch(`${LMFILES_API_URL}/${fileId}`, {
    method: 'DELETE',
    headers: {
      'X-API-Key': apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`lmfiles delete failed (${response.status}): ${errorText}`);
  }
}

export async function getFileInfo(fileId: string): Promise<Record<string, unknown>> {
  const apiKey = process.env.LMFILES_API_KEY;

  if (!apiKey || apiKey === 'lmf_your_api_key_here') {
    return { id: fileId, status: 'demo_mode' };
  }

  const response = await fetch(`${LMFILES_API_URL}/${fileId}`, {
    method: 'GET',
    headers: {
      'X-API-Key': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`lmfiles get file info failed (${response.status})`);
  }

  return response.json();
}
