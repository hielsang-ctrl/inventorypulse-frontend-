const BASE_URL = 'http://localhost:8000/api'

// helper
async function request(url, options = {}) {
  const res = await fetch(BASE_URL + url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  })

  if (!res.ok) {
    throw new Error('API Error')
  }

  return res.json()
}

/* products */

export const getProducts = () => request('/products')

export const createProduct = (data) =>
  request('/products', {
    method: 'POST',
    body: JSON.stringify(data)
  })

export const deleteProduct = (id) =>
  request(`/products/${id}`, {
    method: 'DELETE'
  })

/* stock */

export const stockIn = (data) =>
  request('/stock/in', {
    method: 'POST',
    body: JSON.stringify(data)
  })

export const stockOut = (data) =>
  request('/stock/out', {
    method: 'POST',
    body: JSON.stringify(data)
  })

/* dashboard */

export const getDashboard = () => request('/dashboard/summary')

export const getLowStockAlerts = () => request('/alerts/low-stock')