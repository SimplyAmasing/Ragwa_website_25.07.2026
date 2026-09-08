import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

/** The shop this storefront serves — Firestore `shops/{id}`. */
export const SHOP_ID: string = import.meta.env.VITE_SHOP_ID ?? ''

/**
 * Public base URL for Cloudflare R2, used to turn an item's `image_key`
 * (a key without extension, e.g. `items/abc`) into a real image URL. Empty
 * when unset — the reader then falls back to a stored full URL or a placeholder.
 */
export const R2_PUBLIC_URL: string = (import.meta.env.VITE_R2_PUBLIC_URL ?? '').replace(/\/$/, '')
