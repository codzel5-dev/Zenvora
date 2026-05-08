/**
 * CloudConvert API Key Rotation System
 * 
 * Each API key has a daily limit (default: 10 conversions/day).
 * When a key's quota is exhausted, the system automatically switches
 * to the next available key ALONG WITH its OAuth credentials
 * (Client ID, Client Secret, Redirect URL).
 * 
 * ⚠️  To add/remove keys, edit: src/config/cloudconvert-keys.ts
 *     Do NOT add keys to .env.local or Netlify environment variables.
 */

import { CLOUDCONVERT_KEYS, CloudConvertKey } from '@/config/cloudconvert-keys';

interface KeyUsage {
  apiKey: string;
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  label: string;
  dailyCount: number;
  lastResetDate: string; // YYYY-MM-DD format
  isExhausted: boolean;
  disabled: boolean;     // Manually disabled (e.g., expired key)
}

const DAILY_LIMIT = 10; // Max conversions per key per day

// In-memory key tracking (resets on server restart, which is fine for daily quotas)
let keyUsageMap: Map<string, KeyUsage> = new Map();

/**
 * Get today's date string for quota reset tracking
 */
function getTodayString(): string {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

/**
 * Initialize or get key usage tracking from a CloudConvertKey entry
 */
function getKeyUsage(entry: CloudConvertKey): KeyUsage {
  const key = entry.apiKey;
  let usage = keyUsageMap.get(key);
  if (!usage) {
    usage = {
      apiKey: key,
      clientId: entry.clientId,
      clientSecret: entry.clientSecret,
      redirectUrl: entry.redirectUrl,
      label: entry.label || `Key ...${key.slice(-8)}`,
      dailyCount: 0,
      lastResetDate: getTodayString(),
      isExhausted: false,
      disabled: false,
    };
    keyUsageMap.set(key, usage);
  } else {
    // Always update OAuth credentials in case config was changed
    usage.clientId = entry.clientId;
    usage.clientSecret = entry.clientSecret;
    usage.redirectUrl = entry.redirectUrl;
    usage.label = entry.label || usage.label;
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
 * Result of getting an available key — includes the full OAuth set
 */
export interface AvailableKeyResult {
  /** The API key (JWT Bearer token) */
  apiKey: string;
  /** OAuth Client ID for this key */
  clientId: string;
  /** OAuth Client Secret for this key */
  clientSecret: string;
  /** OAuth Redirect URL for this key */
  redirectUrl: string;
  /** Human-readable label */
  label: string;
}

/**
 * Get the next available API key (with its OAuth credentials)
 * that hasn't exceeded its daily limit.
 * Automatically rotates through keys using round-robin with quota awareness.
 */
export function getAvailableKey(): AvailableKeyResult | null {
  const allKeys = CLOUDCONVERT_KEYS;

  if (allKeys.length === 0) {
    console.error('[CloudConvert] No API keys configured in config/cloudconvert-keys.ts');
    return null;
  }

  for (const entry of allKeys) {
    const usage = getKeyUsage(entry);
    resetIfNeeded(usage);

    if (!usage.disabled && !usage.isExhausted && usage.dailyCount < DAILY_LIMIT) {
      return {
        apiKey: usage.apiKey,
        clientId: usage.clientId,
        clientSecret: usage.clientSecret,
        redirectUrl: usage.redirectUrl,
        label: usage.label,
      };
    }
  }

  console.warn('[CloudConvert] All API keys have reached their daily limit');
  return null;
}

/**
 * Record a successful conversion for a specific key
 */
export function recordKeyUsage(apiKey: string): void {
  const usage = keyUsageMap.get(apiKey);
  if (!usage) return;
  
  resetIfNeeded(usage);
  usage.dailyCount += 1;

  if (usage.dailyCount >= DAILY_LIMIT) {
    usage.isExhausted = true;
    console.log(`[CloudConvert] ${usage.label} has reached daily limit (${usage.dailyCount}/${DAILY_LIMIT})`);
  }
}

/**
 * Mark a key as exhausted (e.g., if API returns rate limit error)
 */
export function markKeyExhausted(apiKey: string): void {
  const usage = keyUsageMap.get(apiKey);
  if (!usage) return;
  usage.isExhausted = true;
  console.warn(`[CloudConvert] ${usage.label} marked as exhausted`);
}

/**
 * Mark a key as disabled (e.g., expired, invalid, or revoked)
 */
export function disableKey(apiKey: string): void {
  const usage = keyUsageMap.get(apiKey);
  if (!usage) return;
  usage.disabled = true;
  console.error(`[CloudConvert] ${usage.label} has been disabled`);
}

/**
 * Get usage statistics for all keys (for monitoring/debugging)
 */
export function getKeyStats(): Array<{
  label: string;
  keySuffix: string;
  clientId: string;
  dailyCount: number;
  dailyLimit: number;
  isExhausted: boolean;
  disabled: boolean;
  lastReset: string;
}> {
  return CLOUDCONVERT_KEYS.map(entry => {
    const usage = getKeyUsage(entry);
    resetIfNeeded(usage);
    return {
      label: usage.label,
      keySuffix: `...${usage.apiKey.slice(-8)}`,
      clientId: usage.clientId,
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
  let used = 0;
  let limit = 0;

  for (const entry of CLOUDCONVERT_KEYS) {
    const usage = getKeyUsage(entry);
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
