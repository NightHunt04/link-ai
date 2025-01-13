import { initializeApp } from "firebase/app"
import { GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-link.vercel.app",
  projectId: "socialai-84ffe",
  storageBucket: "socialai-84ffe.firebasestorage.app",
  messagingSenderId: "302294878610",
  appId: "1:302294878610:web:3a6057490e3adcbc6dd94b",
  measurementId: "G-ZS4VPGV6MS"
}

export const app = initializeApp(firebaseConfig)
export const provider = new GoogleAuthProvider()