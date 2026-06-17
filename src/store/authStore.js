import { create } from 'zustand'
import { loginUser, loginWithGoogle, logoutUser } from '../services/authService'

const useAuthStore = create((set) => ({
  user: null,
  role: null,
  loading: false,

  // EMAIL LOGIN
  login: async (email, password) => {
    const user = await loginUser(email, password)

    set({
      user,
      role: user.email === 'admin@inventorypulse.com' ? 'admin' : 'staff'
    })
  },

  // GOOGLE LOGIN
  loginWithGoogle: async () => {
    const user = await loginWithGoogle()

    set({
      user,
      role: user.email === 'admin@inventorypulse.com' ? 'admin' : 'staff'
    })
  },

  logout: async () => {
    await logoutUser()
    set({ user: null, role: null })
  }
}))

export default useAuthStore