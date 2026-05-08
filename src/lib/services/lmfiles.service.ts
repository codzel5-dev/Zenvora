const LMFILES_API_URL = 'https://lmfiles.com/api/v1/files';

interface UploadResult {
  fileId: string;
  url: string;
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

  const formData = new FormData();
  formData.append('file', file);

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
