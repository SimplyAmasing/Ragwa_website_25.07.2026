import { fetchWorkerCatalog, type WorkerProduct } from './api'
import { R2_PUBLIC_URL } from './firebase'
import type { I18nValue } from '../i18n'

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

  if (p.image_web?.startsWith('http')) push(p.image_web)
  if (p.image_mobile?.startsWith('http')) push(p.image_mobile)
  if (p.image_key?.startsWith('http')) push(p.image_key)

  if (p.image_key && !p.image_key.startsWith('http') && R2_PUBLIC_URL) {
    const base = `${R2_PUBLIC_URL}/${p.image_key.replace(/^\/+/, '')}`
    push(`${base}/card.webp`)
    push(`${base}.webp`)
    push(base)
  }

  return urls
}

export async function fetchCatalog(shopId: string): Promise<Catalog> {
  if (!shopId) return { products: [], categories: [] }

  const data = await fetchWorkerCatalog(shopId)
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
