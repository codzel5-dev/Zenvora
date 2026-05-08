const BLOCKED_EXTENSIONS = [
  '.exe', '.bat', '.sh', '.php', '.py', '.js', '.cmd',
  '.com', '.vbs', '.ps1', '.msi', '.dll', '.scr',
  '.wsf', '.cpl', '.gadget', '.inf', '.reg',
  '.jar', '.app', '.deb', '.rpm', '.dmg',
  '.iso', '.img', '.apk', '.hta',
];

const ALLOWED_MIME_CATEGORIES = [
  'image/', 'video/', 'audio/', 'text/',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument',
  'application/vnd.ms-excel',
  'application/vnd.ms-powerpoint',
  'application/zip',
  'application/x-zip-compressed',
  'application/x-rar-compressed',
  'application/x-7z-compressed',
  'application/gzip',
  'application/x-tar',
  'application/json',
  'application/xml',
  'application/rtf',
  'application/vnd.oasis.opendocument',
  'application/epub+zip',
  'application/x-shockwave-flash',
];

const MAX_FILE_SIZE = parseInt(
  process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '104857600',
  10
);

interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFile(file: File): ValidationResult {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    const maxMB = Math.round(MAX_FILE_SIZE / (1024 * 1024));
    return {
      valid: false,
      error: `File size exceeds the maximum limit of ${maxMB}MB. Your file is ${formatFileSize(file.size)}.`,
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: 'Cannot upload empty files.',
    };
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const isBlockedExtension = BLOCKED_EXTENSIONS.some((ext) =>
    fileName.endsWith(ext)
  );

  if (isBlockedExtension) {
    const ext = fileName.substring(fileName.lastIndexOf('.'));
    return {
      valid: false,
      error: `File type "${ext}" is not allowed for security reasons. Executable and script files are blocked.`,
    };
  }

  // Check MIME type
  if (file.type) {
    const isAllowedMime = ALLOWED_MIME_CATEGORIES.some((cat) =>
      file.type.startsWith(cat)
    );

    if (!isAllowedMime) {
      return {
        valid: false,
        error: `MIME type "${file.type}" is not supported. Please upload images, videos, audio, documents, or archive files.`,
      };
    }
  } else {
    // If no MIME type detected, check extension isn't blocked (already done above)
    // Allow files without MIME type if extension is not blocked
  }

  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function getFileIcon(mimeType: string): string {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType === 'application/pdf') return 'pdf';
  if (
    mimeType.includes('word') ||
    mimeType.includes('document') ||
    mimeType.startsWith('text/')
  )
    return 'document';
  if (
    mimeType.includes('zip') ||
    mimeType.includes('rar') ||
    mimeType.includes('7z') ||
    mimeType.includes('tar') ||
    mimeType.includes('gzip')
  )
    return 'archive';
  if (
    mimeType.includes('excel') ||
    mimeType.includes('spreadsheet')
  )
    return 'spreadsheet';
  if (
    mimeType.includes('powerpoint') ||
    mimeType.includes('presentation')
  )
    return 'presentation';
  return 'file';
}
