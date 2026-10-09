/**
 * Cookie consent state helper.
 * Stored in localStorage as `rohi-consent`.
 * Categories: necessary (always on), analytics (opt-in), marketing (none used).
 */
export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: number;
  timestamp: number;
};

export const CONSENT_KEY = "rohi-consent";
export const CONSENT_VERSION = 1;

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  version: CONSENT_VERSION,
  timestamp: 0,
};

export function readConsent(): ConsentState {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return DEFAULT_CONSENT;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: false,
      version: CONSENT_VERSION,
      timestamp: Number(parsed.timestamp) || 0,
    };
  } catch {
    return DEFAULT_CONSENT;
  }
}

export function writeConsent(analytics: boolean): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics,
    marketing: false,
    version: CONSENT_VERSION,
    timestamp: Date.now(),
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  return state;
}

export function clearConsent(): void {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
}

export function hasConsented(): boolean {
  return readConsent().timestamp > 0;
}

export function analyticsAllowed(): boolean {
  return readConsent().analytics === true;
}
