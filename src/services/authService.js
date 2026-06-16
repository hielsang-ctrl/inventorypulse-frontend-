import { create } from 'zustand'
import { login as apiLogin } from '../services/api'

const useAuthStore = create((set) => ({
  user: null,
  role: null,
  token: localStorage.getItem('token') || null,

  // Rehydrate user from token on page load
  init: () => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const email = localStorage.getItem('email')
    if (token && role) {
      set({ user: { email }, role, token })
    }
  },

  login: async (email, password) => {
    const data = await apiLogin(email, password)
    // data = { access_token, token_type, role }
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('role', data.role)
    localStorage.setItem('email', email)
    set({ user: { email }, role: data.role, token: data.access_token })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('email')
    set({ user: null, role: null, token: null })
  },
}))

export default useAuthStore
