import { collection, documentId, getDocs, query, where } from 'firebase/firestore'
import { db } from './firebase'

export interface Product {
  id: string
  itemId: string
  name: string
  brand: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  category: string
  tag?: string
  image: string
  description: string
  stock: number
}

export interface Category {
  id: string
  name: string
  slug: string
  iconName: string | null
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size))
  return chunks
}

export async function fetchCategories(shopId: string): Promise<Category[]> {
  const linksSnap = await getDocs(
    query(collection(db, 'category_shop_links'), where('shop_id', '==', shopId), where('is_active', '==', true))
  )
  const categoryIds = [...new Set(linksSnap.docs.map(d => d.data().category_id as string))]
  if (categoryIds.length === 0) return []

  const byId = new Map<string, Record<string, unknown>>()
  for (const batch of chunk(categoryIds, 30)) {
    const snap = await getDocs(query(collection(db, 'categories'), where(documentId(), 'in', batch)))
    for (const doc of snap.docs) byId.set(doc.id, doc.data())
  }

  return categoryIds
    .map(id => byId.get(id) && { id, data: byId.get(id)! })
    .filter((v): v is { id: string; data: Record<string, unknown> } => Boolean(v))
    .map(({ id, data }) => ({
      id,
      name: (data.name as string) ?? '',
      slug: (data.slug as string) ?? '',
      iconName: (data.icon_name as string) ?? null,
    }))
}

export async function fetchProducts(shopId: string): Promise<Product[]> {
  const linksSnap = await getDocs(
    query(collection(db, 'item_shop_links'), where('shop_id', '==', shopId), where('is_active', '==', true))
  )
  const links = linksSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Array<{
    id: string
    item_id: string
    price?: number
    stock_quantity?: number
  }>
  const itemIds = [...new Set(links.map(l => l.item_id))]
  if (itemIds.length === 0) return []

  const itemsById = new Map<string, Record<string, unknown>>()
  for (const batch of chunk(itemIds, 30)) {
    const snap = await getDocs(query(collection(db, 'items'), where(documentId(), 'in', batch)))
    for (const doc of snap.docs) itemsById.set(doc.id, doc.data())
  }

  const categoryByItemId = await fetchPrimaryCategoryNames(itemIds)

  return links
    .filter(link => itemsById.has(link.item_id))
    .map(link => {
      const item = itemsById.get(link.item_id)!
      const price = link.price ?? 0
      return {
        id: link.id,
        itemId: link.item_id,
        name: (item.name as string) ?? '',
        brand: '',
        price,
        originalPrice: price,
        discount: 0,
        rating: 0,
        reviews: 0,
        category: categoryByItemId.get(link.item_id) ?? '',
        image: (item.image_web as string) || (item.image_mobile as string) || '',
        description: (item.description as string) ?? '',
        stock: link.stock_quantity ?? 0,
      }
    })
}

async function fetchPrimaryCategoryNames(itemIds: string[]): Promise<Map<string, string>> {
  const result = new Map<string, string>()
  const itemToCategoryId = new Map<string, string>()

  for (const batch of chunk(itemIds, 30)) {
    const snap = await getDocs(query(collection(db, 'item_category_links'), where('item_id', 'in', batch)))
    for (const doc of snap.docs) {
      const data = doc.data()
      const itemId = data.item_id as string
      if (!itemToCategoryId.has(itemId)) itemToCategoryId.set(itemId, data.category_id as string)
    }
  }

  const categoryIds = [...new Set(itemToCategoryId.values())]
  if (categoryIds.length === 0) return result

  const categoryNameById = new Map<string, string>()
  for (const batch of chunk(categoryIds, 30)) {
    const snap = await getDocs(query(collection(db, 'categories'), where(documentId(), 'in', batch)))
    for (const doc of snap.docs) categoryNameById.set(doc.id, doc.data().name as string)
  }

  for (const [itemId, categoryId] of itemToCategoryId) {
    const name = categoryNameById.get(categoryId)
    if (name) result.set(itemId, name)
  }
  return result
}
