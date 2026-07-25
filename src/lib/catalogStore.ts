import { fetchCategories, fetchProducts, type Category, type Product } from './catalog'
import { SHOP_ID } from './firebase'

let products: Product[] = []
let categories: Category[] = []
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

export const catalogStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getProducts: () => products,
  getCategories: () => categories,
}

export async function loadCatalog() {
  if (!SHOP_ID) {
    console.warn('VITE_SHOP_ID is not set — catalog will stay empty until it is configured.')
    return
  }
  const [fetchedProducts, fetchedCategories] = await Promise.all([
    fetchProducts(SHOP_ID),
    fetchCategories(SHOP_ID),
  ])
  products = fetchedProducts
  categories = fetchedCategories
  emit()
}
