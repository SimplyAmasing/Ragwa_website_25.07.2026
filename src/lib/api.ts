import { getIdToken, WORKER_URL } from './firebase'
import type { I18nValue } from '../i18n'

/**
 * Transport for the chekchak-worker storefront proxy. The deployed Firestore
 * rules block anonymous reads/writes, so the catalog and orders go through the
 * Worker, which holds the service account. Every call carries an anonymous
 * Firebase ID token (see `getIdToken`).
 */

export interface WorkerProduct {
  link_id: string
  item_id: string
  name: I18nValue
  description: I18nValue
  brand: string
  barcode: string
  weight_grams: number | null
  image_key: string | null
  image_web: string | null
  image_mobile: string | null
  price: number
  effective_price: number
  stock: number | null
  category_id: string | null
}

export interface WorkerCategory {
  id: string
  name: I18nValue
  icon_name: string | null
}

export interface WorkerCatalog {
  shop: { id: string; name: I18nValue; logo_key: string | null; delivery_fee: number | null; currency: string | null }
  products: WorkerProduct[]
  categories: WorkerCategory[]
}

export interface PlaceOrderPayload {
  shopId: string
  fulfillmentMethod: 'delivery' | 'pickup'
  contact: {
    name: string
    phone: string
    email?: string
    address?: string
    city?: string
    zip?: string
  }
  note?: string
  lines: { itemId: string; quantity: number }[]
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!WORKER_URL) throw new ApiError('VITE_WORKER_URL is not configured', 0)
  const token = await getIdToken()
  const res = await fetch(`${WORKER_URL}${path}`, {
    ...init,
    headers: { ...init.headers, authorization: `Bearer ${token}` },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new ApiError((body as { error?: string }).error ?? `request failed (${res.status})`, res.status, (body as { code?: string }).code)
  }
  return body as T
}

export function fetchWorkerCatalog(shopId: string): Promise<WorkerCatalog> {
  return request<WorkerCatalog>(`/storefront/catalog?shop=${encodeURIComponent(shopId)}`)
}

export function placeWorkerOrder(payload: PlaceOrderPayload): Promise<{ orderId: string; subtotal: number; total: number }> {
  return request('/storefront/order', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
