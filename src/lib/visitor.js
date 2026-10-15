import { TOKEN_KEYS } from './authApi.js'

// Who is visiting, recorded the same way as the development site
// (andrho-tracker-dashboard/web/src/lib/visitor.js) so both read the same
// data:
//
//   nuevo        first visit
//   recurrente   came back (a second visit or more) without the form
//   registrado   already filled the waiting-list form (or has a session)
//
// Production only records it; the per-state landings live in development.
// A visit is a run of page views with less than VISIT_GAP between them.
// Everything lives in this browser's localStorage, and the same facts go to
// the web tracker as events, so the dashboard sees them per visitor
// (_atrk_vid):
//
//   visitor_profile  once per visit: { state, visits, form }
//   form_completed   when a form is sent: { form: 'waitlist' }

const KEY = 'andrho_visitor'
const VISIT_GAP = 30 * 60 * 1000

function read() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY))
    return v && typeof v === 'object' ? v : null
  } catch {
    return null
  }
}

function write(v) {
  try {
    localStorage.setItem(KEY, JSON.stringify(v))
  } catch {
    // Storage blocked: every visit looks like the first one.
  }
}

function hasSession() {
  try {
    return !!localStorage.getItem(TOKEN_KEYS.access)
  } catch {
    return false
  }
}

// Sends a tracker event once tracker.js (loaded with defer) is there.
export function track(eventType, payload) {
  const send = () => window.atrk?.('event', eventType, payload)
  if (window.atrk) send()
  else window.addEventListener('load', send, { once: true })
}

// The tracker's long-lived visitor id, when it has one.
export function trackerVisitorId() {
  try {
    return localStorage.getItem('_atrk_vid') || ''
  } catch {
    return ''
  }
}

function stateOf(v) {
  if (v.form || hasSession()) return 'registrado'
  return v.visits > 1 ? 'recurrente' : 'nuevo'
}

// Counts this page view (a new visit after VISIT_GAP of silence) and
// returns { state, visits, form }. Call once per page load.
export function recordVisit() {
  const now = Date.now()
  const v = read() ?? { visits: 0, firstAt: now, lastAt: 0, form: '' }
  const newVisit = now - (v.lastAt || 0) > VISIT_GAP
  if (newVisit) v.visits += 1
  v.lastAt = now
  write(v)
  const profile = { state: stateOf(v), visits: v.visits, form: v.form || '' }
  if (newVisit) track('visitor_profile', profile)
  return profile
}

// Marks a form as completed by this visitor ('waitlist').
export function markFormDone(form) {
  const v = read() ?? { visits: 1, firstAt: Date.now(), lastAt: Date.now() }
  v.form = form
  v.formAt = Date.now()
  write(v)
  track('form_completed', { form })
}
