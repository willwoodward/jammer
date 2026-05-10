import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Fill these in from your Firebase console:
// https://console.firebase.google.com → Project Settings → Your apps → Config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const isConfigured = !!firebaseConfig.databaseURL

let db: ReturnType<typeof getDatabase> | null = null

if (isConfigured) {
  const app = initializeApp(firebaseConfig)
  db = getDatabase(app)
}

export { db, isConfigured }
