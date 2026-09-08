import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth: Auth = getAuth(app)

/** The shop this storefront serves — Firestore `shops/{id}`. */
export const SHOP_ID: string = import.meta.env.VITE_SHOP_ID ?? ''

/** Base URL of the deployed chekchak-worker, e.g. https://chekchak-worker.<acct>.workers.dev */
export const WORKER_URL: string = (import.meta.env.VITE_WORKER_URL ?? '').replace(/\/$/, '')

/**
 * Public base URL for Cloudflare R2, used to turn an item's `image_key`
 * (a key without extension) into a real image URL. Empty when unset — the
 * reader then falls back to a stored full URL or a placeholder.
 */
export const R2_PUBLIC_URL: string = (import.meta.env.VITE_R2_PUBLIC_URL ?? '').replace(/\/$/, '')

let tokenPromise: Promise<string> | null = null

/**
 * A Firebase ID token for the Worker's storefront routes. The site has no
 * accounts — an anonymous sign-in is enough to make each catalog read and
 * order write attributable. The token (and its refresh) is cached for the tab.
 */
export async function getIdToken(): Promise<string> {
  if (!tokenPromise) {
    tokenPromise = (async () => {
      if (!auth.currentUser) {
        await signInAnonymously(auth)
      }
      return auth.currentUser!.getIdToken()
    })().catch(err => {
      tokenPromise = null
      throw err
    })
  }
  return tokenPromise
}
