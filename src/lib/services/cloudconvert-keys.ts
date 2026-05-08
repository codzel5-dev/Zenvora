/**
 * CloudConvert API Key Rotation System
 * 
 * Each API key has a daily limit (default: 10 conversions/day).
 * When a key's quota is exhausted, the system automatically switches
 * to the next available key.
 * 
 * To add more keys, simply add them to the CLOUDCONVERT_KEYS array below,
 * or set them as comma-separated values in the CLOUDCONVERT_API_KEYS env variable.
 */

interface KeyUsage {
  key: string;
  dailyCount: number;
  lastResetDate: string; // YYYY-MM-DD format
  isExhausted: boolean;
  disabled: boolean;     // Manually disabled (e.g., expired key)
}

const DAILY_LIMIT = 10; // Max conversions per key per day

// In-memory key tracking (resets on server restart, which is fine for daily quotas)
let keyUsageMap: Map<string, KeyUsage> = new Map();

/**
 * Get all available API keys from environment and config
 */
function getAllKeys(): string[] {
  const keys: string[] = [];

  // Primary key from env
  const primaryKey = process.env.CLOUDCONVERT_API_KEY;
  if (primaryKey) {
    keys.push(primaryKey);
  }

  // Additional keys from comma-separated env variable
  const additionalKeys = process.env.CLOUDCONVERT_API_KEYS;
  if (additionalKeys) {
    const parsed = additionalKeys
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);
    keys.push(...parsed);
  }

  // Hardcoded fallback keys (add more keys here as needed)
  // These serve as a secondary pool when env keys are exhausted
  const fallbackKeys: string[] = [
    // Add additional CloudConvert API keys here:
    // 'eyJ0eXAiOiJKV1QiLCJhbGci...',
    // 'eyJ0eXAiOiJKV1QiLCJhbGci...',
  ];

  for (const fk of fallbackKeys) {
    if (!keys.includes(fk)) {
      keys.push(fk);
    }
  }

  return keys.filter(k => k.length > 0);
}

/**
 * Get today's date string for quota reset tracking
 */
function getTodayString(): string {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

/**
 * Initialize or get key usage tracking
 */
function getKeyUsage(key: string): KeyUsage {
  let usage = keyUsageMap.get(key);
  if (!usage) {
    usage = {
      key,
      dailyCount: 0,
      lastResetDate: getTodayString(),
      isExhausted: false,
      disabled: false,
    };
    keyUsageMap.set(key, usage);
  }
  return usage;
}

/**
 * Reset daily counters if a new day has started
 */
function resetIfNeeded(usage: KeyUsage): void {
  const today = getTodayString();
  if (usage.lastResetDate !== today) {
    usage.dailyCount = 0;
    usage.lastResetDate = today;
    usage.isExhausted = false;
  }
}

/**
 * Get the next available API key that hasn't exceeded its daily limit.
 * Automatically rotates through keys using round-robin with quota awareness.
 */
export function getAvailableKey(): string | null {
  const allKeys = getAllKeys();

  if (allKeys.length === 0) {
    console.error('[CloudConvert] No API keys configured');
    return null;
  }

  for (const key of allKeys) {
    const usage = getKeyUsage(key);
    resetIfNeeded(usage);

    if (!usage.disabled && !usage.isExhausted && usage.dailyCount < DAILY_LIMIT) {
      return key;
    }
  }

  console.warn('[CloudConvert] All API keys have reached their daily limit');
  return null;
}

/**
 * Record a successful conversion for a specific key
 */
export function recordKeyUsage(key: string): void {
  const usage = getKeyUsage(key);
  resetIfNeeded(usage);
  usage.dailyCount += 1;

  if (usage.dailyCount >= DAILY_LIMIT) {
    usage.isExhausted = true;
    console.log(`[CloudConvert] Key ending in ...${key.slice(-8)} has reached daily limit (${usage.dailyCount}/${DAILY_LIMIT})`);
  }
}

/**
 * Mark a key as exhausted (e.g., if API returns rate limit error)
 */
export function markKeyExhausted(key: string): void {
  const usage = getKeyUsage(key);
  usage.isExhausted = true;
  console.warn(`[CloudConvert] Key ending in ...${key.slice(-8)} marked as exhausted`);
}

/**
 * Mark a key as disabled (e.g., expired, invalid, or revoked)
 */
export function disableKey(key: string): void {
  const usage = getKeyUsage(key);
  usage.disabled = true;
  console.error(`[CloudConvert] Key ending in ...${key.slice(-8)} has been disabled`);
}

/**
 * Get usage statistics for all keys (for monitoring/debugging)
 */
export function getKeyStats(): Array<{
  keySuffix: string;
  dailyCount: number;
  dailyLimit: number;
  isExhausted: boolean;
  disabled: boolean;
  lastReset: string;
}> {
  const allKeys = getAllKeys();
  return allKeys.map(key => {
    const usage = getKeyUsage(key);
    resetIfNeeded(usage);
    return {
      keySuffix: `...${key.slice(-8)}`,
      dailyCount: usage.dailyCount,
      dailyLimit: DAILY_LIMIT,
      isExhausted: usage.isExhausted,
      disabled: usage.disabled,
      lastReset: usage.lastResetDate,
    };
  });
}

/**
 * Get total remaining quota across all keys
 */
export function getRemainingQuota(): { total: number; used: number; limit: number } {
  const allKeys = getAllKeys();
  let used = 0;
  let limit = 0;

  for (const key of allKeys) {
    const usage = getKeyUsage(key);
    resetIfNeeded(usage);
    if (!usage.disabled) {
      used += usage.dailyCount;
      limit += DAILY_LIMIT;
    }
  }

  return {
    total: limit - used,
    used,
    limit,
  };
}

/**
 * Reset all key usage (useful for testing or manual reset)
 */
export function resetAllKeys(): void {
  keyUsageMap.clear();
  console.log('[CloudConvert] All key usage counters have been reset');
}
