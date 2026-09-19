// Thin client for andrho-api's public endpoints. Mirrors
// andrho-tracker-dashboard/web/src/lib/authApi.js's apiPost (same
// VITE_ANDRHO_API_URL trailing-slash gotcha: Railway's "Generate Domain"
// output includes one, which would otherwise turn every call into a
// double-slash path the Go router 404s on before CORS ever runs).
const API_URL = (import.meta.env.VITE_ANDRHO_API_URL || '').replace(/\/+$/, '')

export async function apiPost(path, body) {
  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch (cause) {
    console.error(`[api] could not reach ${API_URL}${path} (VITE_ANDRHO_API_URL="${API_URL}")`, cause)
    const error = new Error('No se pudo conectar con el servidor. Intenta de nuevo en un momento.')
    error.status = 0
    throw error
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    // no JSON body (e.g. 204) -- fine
  }

  if (!res.ok) {
    const error = new Error((data && data.error) || res.statusText || 'Ocurrió un error inesperado.')
    error.status = res.status
    throw error
  }

  return data
}
