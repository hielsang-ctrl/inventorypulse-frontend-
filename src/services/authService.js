import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'

import { auth } from './firebase'

// SIGN UP (Email + Password)
export const registerUser = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  // set display name
  await updateProfile(userCredential.user, {
    displayName
  })

  return userCredential.user
}

// LOGIN (Email + Password)
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  )
  return userCredential.user
}

// GOOGLE LOGIN
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  return result.user
}

// LOGOUT
export const logoutUser = async () => {
  return signOut(auth)
}