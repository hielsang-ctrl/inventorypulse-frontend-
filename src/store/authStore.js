import { create } from 'zustand'
import { loginUser, loginWithGoogle, logoutUser } from '../services/authService'

const useAuthStore = create((set) => ({
  user: null,
  role: null,
  loading: false,

  login: async (email, password) => {
    const user = await loginUser(email, password)

    set({
      user,
      role: user?.displayName || 'staff'
    })
  },

  loginWithGoogle: async () => {
    const user = await loginWithGoogle()

    set({
      user,
      role: user?.displayName || 'staff'
    })
  },

  logout: () => {
    logoutUser()
    set({ user: null, role: null })
  }
}))

export default useAuthStore