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
 * Provisions `accounts/{uid}` for a freshly-minted anonymous sign-in.
 *
 * The real design is a server-side Firebase Auth `user.create` trigger
 * (chekchak-worker's `/triggers/auth-user-created`) that fires this exactly
 * once per uid — but that needs Eventarc, which needs the Blaze plan's
 * network-attachment wiring, not yet built. Every other app in this fleet
 * works around the gap the same way: the client itself POSTs this route
 * right after sign-in. The handler is idempotent (never re-stamps an
 * existing account), so calling it on every fresh anonymous session is safe.
 * Best-effort: a failure here doesn't block getIdToken from returning a
 * usable token, it just means a route that checks the account doc (like
 * placeStorefrontOrder's client-type guard) will 403 until this succeeds.
 */
async function provisionAccount(idToken: string): Promise<void> {
  if (!WORKER_URL) return
  try {
    await fetch(`${WORKER_URL}/triggers/auth-user-created`, {
      method: 'POST',
      headers: { authorization: `Bearer ${idToken}` },
    })
  } catch {
    // Best-effort — see doc comment above.
  }
}

/**
 * A Firebase ID token for the Worker's storefront routes. The site has no
 * accounts — an anonymous sign-in is enough to make each catalog read and
 * order write attributable. The token (and its refresh) is cached for the tab.
 */
export async function getIdToken(): Promise<string> {
  if (!tokenPromise) {
    tokenPromise = (async () => {
      const isNewSignIn = !auth.currentUser
      if (isNewSignIn) {
        await signInAnonymously(auth)
      }
      const token = await auth.currentUser!.getIdToken()
      if (isNewSignIn) {
        await provisionAccount(token)
      }
      return token
    })().catch(err => {
      tokenPromise = null
      throw err
    })
  }
  return tokenPromise
}
