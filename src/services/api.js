// All API calls go through this base URL.
// In development: proxied by Vite to http://localhost:8000
// In production (Docker): Nginx proxies /api → http://api:8000
const BASE_URL = '/api'

function getToken() {
  return localStorage.getItem('token')
}

async function request(url, options = {}) {
  const token = getToken()

  const res = await fetch(BASE_URL + url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  if (res.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    throw new Error('Session expired')
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || 'API Error')
  }

  // 204 No Content has no body
  if (res.status === 204) return null
  return res.json()
}

/* ── Auth ────────────────────────────────────────── */
export const login = (email, password) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

/* ── Dashboard ───────────────────────────────────── */
export const getDashboard = () => request('/dashboard/summary')

/* ── Products ────────────────────────────────────── */
export const getProducts = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  return request(`/products${qs ? '?' + qs : ''}`)
}

export const getProduct = (id) => request(`/products/${id}`)

export const createProduct = (data) =>
  request('/products', { method: 'POST', body: JSON.stringify(data) })

export const updateProduct = (id, data) =>
  request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const deleteProduct = (id) =>
  request(`/products/${id}`, { method: 'DELETE' })

/* ── Categories ──────────────────────────────────── */
export const getCategories = () => request('/categories')

export const createCategory = (data) =>
  request('/categories', { method: 'POST', body: JSON.stringify(data) })

/* ── Suppliers ───────────────────────────────────── */
export const getSuppliers = () => request('/suppliers')

export const createSupplier = (data) =>
  request('/suppliers', { method: 'POST', body: JSON.stringify(data) })

/* ── Stock ───────────────────────────────────────── */
export const stockIn = (data) =>
  request('/stock/in', { method: 'POST', body: JSON.stringify(data) })

export const stockOut = (data) =>
  request('/stock/out', { method: 'POST', body: JSON.stringify(data) })

export const getMovements = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  return request(`/stock/movements${qs ? '?' + qs : ''}`)
}

/* ── Alerts ──────────────────────────────────────── */
export const getAlerts = () => request('/alerts')

export const resolveAlert = (id) =>
  request(`/alerts/${id}/resolve`, { method: 'POST' })

/* ── Reports ─────────────────────────────────────── */
export const getInventoryValuation = () => request('/reports/inventory-valuation')

export const getMovementSummary = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  return request(`/reports/stock-movement-summary${qs ? '?' + qs : ''}`)
}

export const downloadCsv = () =>
  fetch(BASE_URL + '/reports/export/csv', {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then((r) => r.blob())

/* ── Users ───────────────────────────────────────── */
export const getUsers = () => request('/users')

export const createUser = (data) =>
  request('/users', { method: 'POST', body: JSON.stringify(data) })

export const updateUser = (id, data) =>
  request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const deleteUser = (id) =>
  request(`/users/${id}`, { method: 'DELETE' })
