import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCZcGz8jN-GS7aH6YLT1mNW1VHcPVR-W6E",
  authDomain: "inventorypulse.firebaseapp.com",
  projectId: "inventorypulse",
  storageBucket: "inventorypulse.firebasestorage.app",
  messagingSenderId: "1065493041249",
  appId: "1:1065493041249:web:28d94be575460d22b4da20"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig)


export const auth = getAuth(app)

export default app


