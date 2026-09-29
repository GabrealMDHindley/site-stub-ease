// -----------------------------------------------------------------------
// Page-view counter for the "Website visitors" tool in the Stub-EASE CRM.
//
// One tiny beacon per page view — { p: path, r: referrer } — to the CRM's
// public endpoint, which keeps a daily count. No cookies, no localStorage,
// nothing that identifies a visitor is sent or stored: the CRM turns each
// request into a visitor hash that changes every day and keeps neither the
// IP address nor the browser string.
//
// Only the live site counts: previews (*.vercel.app), localhost, and
// automated browsers (navigator.webdriver) never send anything.
// -----------------------------------------------------------------------

export const ENDPOINT = 'https://crm-stub-ease.vercel.app/api/analytics'
export const TRACKED_HOSTS = ['stubease.com', 'www.stubease.com']

/**
 * Decides whether a page view should be sent, and with what payload.
 * Pure — every browser fact comes in as an argument — so it can be tested.
 * The referrer only rides along on the first page view of a page load;
 * after that, navigation is internal to the site.
 * @returns {{ p: string, r: string | null } | null} null = send nothing
 */
export function pageviewPayload({ hostname, webdriver, path, referrer, isFirstView }) {
  if (!TRACKED_HOSTS.includes(String(hostname || '').toLowerCase())) return null
  if (webdriver) return null
  if (typeof path !== 'string' || !path.startsWith('/')) return null
  return { p: path, r: (isFirstView && referrer) || null }
}

let isFirstView = true

/** Sends one page view for `path`. Never throws — analytics must never break the site. */
export function trackPageview(path) {
  try {
    const payload = pageviewPayload({
      hostname: window.location.hostname,
      webdriver: navigator.webdriver,
      path,
      referrer: document.referrer,
      isFirstView,
    })
    isFirstView = false
    if (!payload) return

    const body = JSON.stringify(payload)
    // text/plain keeps this a "simple" request: no CORS preflight.
    if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain' }))) return
    fetch(ENDPOINT, { method: 'POST', body, keepalive: true, mode: 'no-cors' }).catch(() => {})
  } catch {
    // Ignore: a failed count is not worth a broken page.
  }
}
