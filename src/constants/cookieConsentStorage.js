export const COOKIE_CONSENT_STORAGE_KEY = "sznyt_cookie_consent_v1";
export const COOKIE_CONSENT_VERSION = 1;

/** @typedef {{ v: number, necessary: boolean, analytics: boolean, marketing: boolean, t: number }} CookieConsentState */

export function readCookieConsent() {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.v !== COOKIE_CONSENT_VERSION) return null;
    if (typeof parsed.necessary !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

/** @param {Omit<CookieConsentState, 'v' | 't'> & { v?: number, t?: number }} partial */
export function writeCookieConsent(partial) {
  const state = {
    v: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics: !!partial.analytics,
    marketing: !!partial.marketing,
    t: partial.t ?? Date.now(),
  };
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(
    new CustomEvent("sznyt:cookie-consent", { detail: state })
  );
  return state;
}
