import { collection, documentId, getDocs, query, where } from 'firebase/firestore'
import { db, R2_PUBLIC_URL } from './firebase'
import type { I18nValue } from '../i18n'

// ─────────────────────────────────────────────────────────────────────────────
// Shapes returned to the UI. Names/descriptions stay as raw i18n values and are
// resolved at render time (the visitor can switch language after load), so the
// components call `tr(product.name)` rather than this module picking a string.
// ─────────────────────────────────────────────────────────────────────────────
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

type Doc = Record<string, unknown>

const str = (v: unknown): string => (typeof v === 'string' ? v : '')
const num = (v: unknown): number | null =>
  typeof v === 'number' && Number.isFinite(v) ? v : typeof v === 'string' && v.trim() !== '' && Number.isFinite(Number(v)) ? Number(v) : null

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

/** Batch-fetch documents by id from a top-level collection (Firestore `in` caps at 30). */
async function getByIds(collectionName: string, ids: string[]): Promise<Map<string, Doc>> {
  const byId = new Map<string, Doc>()
  for (const batch of chunk([...new Set(ids)], 30)) {
    if (batch.length === 0) continue
    const snap = await getDocs(query(collection(db, collectionName), where(documentId(), 'in', batch)))
    for (const d of snap.docs) byId.set(d.id, d.data() as Doc)
  }
  return byId
}

/**
 * Turn an item document's image fields into an ordered list of URLs to try.
 * Handles three shapes seen in `items`:
 *  - `image_key` = R2 key without extension (contract v2+), variants derived
 *  - `image_web` / `image_mobile` = a full URL (what the dashboard writes today)
 *  - a full URL stored directly in `image_key`
 */
function resolveImages(item: Doc): string[] {
  const key = str(item.image_key)
  const web = str(item.image_web)
  const mobile = str(item.image_mobile)
  const urls: string[] = []

  const pushUrl = (u: string) => {
    if (u && !urls.includes(u)) urls.push(u)
  }

  if (web.startsWith('http')) pushUrl(web)
  if (mobile.startsWith('http')) pushUrl(mobile)
  if (key.startsWith('http')) pushUrl(key)

  if (key && !key.startsWith('http') && R2_PUBLIC_URL) {
    const base = `${R2_PUBLIC_URL}/${key.replace(/^\/+/, '')}`
    pushUrl(`${base}/card.webp`) // contract variant
    pushUrl(`${base}.webp`) // single-file upload
    pushUrl(base)
  }

  return urls
}

/** Load everything the storefront shows for one shop, in the fewest round-trips. */
export async function fetchCatalog(shopId: string): Promise<Catalog> {
  if (!shopId) return { products: [], categories: [] }

  const linkSnap = await getDocs(
    query(collection(db, 'item_shop_links'), where('shop_id', '==', shopId), where('is_active', '==', true)),
  )

  const links = linkSnap.docs.map(d => ({ id: d.id, data: d.data() as Doc }))
  const itemIds = links.map(l => str(l.data.item_id)).filter(Boolean)
  if (itemIds.length === 0) return { products: [], categories: [] }

  const [itemsById, categoryIdByItem] = await Promise.all([
    getByIds('items', itemIds),
    fetchPrimaryCategoryByItem(itemIds),
  ])

  // Resolve the referenced categories, preferring the current `item_categories`
  // collection and falling back to the deprecated `categories` one.
  const referencedCategoryIds = [...new Set([...categoryIdByItem.values()])].filter(Boolean)
  let categoryDocs = await getByIds('item_categories', referencedCategoryIds)
  if (categoryDocs.size === 0 && referencedCategoryIds.length > 0) {
    categoryDocs = await getByIds('categories', referencedCategoryIds)
  }

  const products: Product[] = []
  for (const link of links) {
    const item = itemsById.get(str(link.data.item_id))
    if (!item) continue
    if (item.is_active === false) continue

    const price = num(link.data.app_price) ?? num(link.data.price) ?? 0
    const isAppDiscounted = link.data.is_app_discounted === true
    const discountPrice = num(link.data.app_discount_price)
    const effectivePrice = isAppDiscounted && discountPrice != null && discountPrice > 0 ? discountPrice : price

    const categoryId = categoryIdByItem.get(str(link.data.item_id)) ?? null
    const categoryDoc = categoryId ? categoryDocs.get(categoryId) : undefined

    products.push({
      linkId: link.id,
      itemId: str(link.data.item_id),
      // Prefer the denormalised copy on the link; fall back to the item.
      name: (link.data.item_name as I18nValue) ?? (item.name as I18nValue) ?? '',
      description: (item.description as I18nValue) ?? '',
      brand: str(item.brand),
      barcode: str(item.barcode),
      weightGrams: num(item.weight_grams),
      imageUrls: resolveImages(item),
      price,
      effectivePrice,
      isDiscounted: effectivePrice < price,
      stock: num(link.data.stock_quantity),
      categoryId,
      categoryName: (categoryDoc?.name as I18nValue) ?? '',
    })
  }

  // The category filter only offers categories that products actually use.
  const seen = new Set<string>()
  const categories: CatalogCategory[] = []
  for (const p of products) {
    if (!p.categoryId || seen.has(p.categoryId)) continue
    const doc = categoryDocs.get(p.categoryId)
    if (!doc) continue
    seen.add(p.categoryId)
    categories.push({
      id: p.categoryId,
      name: (doc.name as I18nValue) ?? '',
      iconName: str(doc.icon_name) || null,
    })
  }

  return { products, categories }
}

/** item_id → its first active category id, from `item_category_links`. */
async function fetchPrimaryCategoryByItem(itemIds: string[]): Promise<Map<string, string>> {
  const result = new Map<string, string>()
  for (const batch of chunk([...new Set(itemIds)], 30)) {
    if (batch.length === 0) continue
    const snap = await getDocs(query(collection(db, 'item_category_links'), where('item_id', 'in', batch)))
    for (const d of snap.docs) {
      const data = d.data() as Doc
      if (data.is_active === false) continue
      const itemId = str(data.item_id)
      const categoryId = str(data.category_id)
      if (itemId && categoryId && !result.has(itemId)) result.set(itemId, categoryId)
    }
  }
  return result
}
