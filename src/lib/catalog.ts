import { fetchWorkerCatalog, type WorkerProduct } from './api'
import { R2_PUBLIC_URL, WORKER_URL } from './firebase'
import type { I18nValue } from '../i18n'

/**
 * Local UI-review mode: when the Worker URL is not configured and we are
 * running `vite dev`, the catalog comes from a static fixture (real product
 * names + photos, see mockCatalog.ts) instead of the network. Flips to live
 * data automatically once VITE_WORKER_URL is set. `VITE_USE_MOCK=0` forces it
 * off even in dev.
 */
const USE_MOCK =
  import.meta.env.VITE_USE_MOCK === '1' ||
  (import.meta.env.DEV && !WORKER_URL && import.meta.env.VITE_USE_MOCK !== '0')

// Names/descriptions stay as raw i18n values and are resolved at render time
// (the visitor can switch language after load), so components call
// `tr(product.name)` rather than this module picking a string.
export interface Product {
  /** `item_shop_links` document id — stable per (item, shop); the cart key. */
  linkId: string
  itemId: string
  name: I18nValue
  description: I18nValue
  brand: string
  barcode: string
  weightGrams: number | null
  /** Resolved image URLs, tried in order; empty array → placeholder. */
  imageUrls: string[]
  /** In-shop list price (`item_shop_links.app_price`). */
  price: number
  /** Price actually charged — discount price when on offer, else `price`. */
  effectivePrice: number
  isDiscounted: boolean
  /** null = this shop does not track stock for the item; 0 = sold out. */
  stock: number | null
  categoryId: string | null
  categoryName: I18nValue
}

export interface CatalogCategory {
  id: string
  name: I18nValue
  iconName: string | null
}

export interface Catalog {
  products: Product[]
  categories: CatalogCategory[]
}

/**
 * Turn an item's image fields into an ordered list of URLs to try. Handles the
 * shapes seen in `items`: an `image_key` (R2 key without extension, contract
 * v2+), a full URL in `image_web` / `image_mobile` (what the dashboard writes
 * today), or a full URL stored directly in `image_key`.
 */
function resolveImages(p: WorkerProduct): string[] {
  const urls: string[] = []
  const push = (u: string | null) => {
    if (u && !urls.includes(u)) urls.push(u)
  }
  // A full URL (dashboard uploads) or a root-relative path (local mock assets).
  const isDirectUrl = (u: string | null | undefined): boolean =>
    !!u && (u.startsWith('http') || u.startsWith('/'))

  if (isDirectUrl(p.image_web)) push(p.image_web)
  if (isDirectUrl(p.image_mobile)) push(p.image_mobile)
  if (isDirectUrl(p.image_key)) push(p.image_key)

  if (p.image_key && !isDirectUrl(p.image_key) && R2_PUBLIC_URL) {
    const key = p.image_key.replace(/^\/+/, '')
    const base = `${R2_PUBLIC_URL}/${key}`
    // Live data stores image_key as the full R2 object path, extension
    // included (e.g. "items/abc123.webp") -- no per-size variant subfolder
    // was ever generated, despite the contract's documented "key without
    // extension, reader appends the variant" convention. Try the real shape
    // first; the variant/no-extension forms stay as a fallback for the day a
    // variant pipeline actually exists.
    push(base)
    if (!/\.\w+$/.test(key)) {
      push(`${base}/card.webp`)
      push(`${base}.webp`)
    }
  }

  return urls
}

export const IS_MOCK = USE_MOCK

export async function fetchCatalog(shopId: string): Promise<Catalog> {
  if (!shopId && !USE_MOCK) return { products: [], categories: [] }

  let data
  if (USE_MOCK) {
    const { MOCK_CATALOG } = await import('./mockCatalog')
    console.info('%cRagwa: showing MOCK catalog (VITE_WORKER_URL unset)', 'color:#2563eb;font-weight:bold')
    data = MOCK_CATALOG
  } else {
    data = await fetchWorkerCatalog(shopId)
  }
  const categoryNameById = new Map(data.categories.map(c => [c.id, c.name]))

  const products: Product[] = data.products.map(p => ({
    linkId: p.link_id,
    itemId: p.item_id,
    name: p.name ?? '',
    description: p.description ?? '',
    brand: p.brand ?? '',
    barcode: p.barcode ?? '',
    weightGrams: p.weight_grams,
    imageUrls: resolveImages(p),
    price: p.price,
    effectivePrice: p.effective_price,
    isDiscounted: p.effective_price < p.price,
    stock: p.stock,
    categoryId: p.category_id,
    categoryName: (p.category_id && categoryNameById.get(p.category_id)) || '',
  }))

  const categories: CatalogCategory[] = data.categories.map(c => ({
    id: c.id,
    name: c.name ?? '',
    iconName: c.icon_name,
  }))

  return { products, categories }
}
