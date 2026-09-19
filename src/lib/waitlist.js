// Waitlist survey data + persistence.
import { apiPost } from './api.js'

export const SECTORS = [
  { value: 'comercio', label: 'Comercio / Retail' },
  { value: 'restaurantes', label: 'Restaurantes' },
  { value: 'servicios', label: 'Servicios' },
  { value: 'manufactura', label: 'Manufactura' },
  { value: 'logistica', label: 'Logística' },
  { value: 'salud', label: 'Salud' },
  { value: 'otro', label: 'Otro' },
]

export const COMPANY_SIZES = [
  { value: '1-10', label: '1 a 10 personas' },
  { value: '11-50', label: '11 a 50 personas' },
  { value: '51-200', label: '51 a 200 personas' },
  { value: '200+', label: 'Más de 200 personas' },
]

export const SALES_METHODS = [
  { value: 'b2b', label: 'B2B (empresa a empresa)' },
  { value: 'b2c', label: 'B2C (empresa a cliente final)' },
  { value: 'mixto', label: 'Mixto (B2B y B2C)' },
  { value: 'marketplace', label: 'Marketplace / terceros' },
]

export const MANAGEMENT_TOOLS = [
  { value: 'software', label: 'Software (ERP, hojas de cálculo, etc.)' },
  { value: 'papel', label: 'Papel / procesos manuales' },
  { value: 'mixto', label: 'Una mezcla de ambos' },
]

// Persists to andrho-api's `waitlist_submissions` table (POST /waitlist,
// public/unauthenticated -- see andrho-api/internal/handlers/waitlist.go).
// Throws (with a user-facing `.message`) on failure so the form can show an
// error and let the person retry instead of silently losing their answers.
export async function saveSubmission(entry) {
  await apiPost('/waitlist', entry)
}
