import { useSyncExternalStore } from 'react'
import { fetchCatalog, type CatalogCategory, type Product } from './catalog'
import { SHOP_ID } from './firebase'

type Status = 'idle' | 'loading' | 'ready' | 'error'

interface CatalogState {
  status: Status
  products: Product[]
  categories: CatalogCategory[]
}

let state: CatalogState = { status: 'idle', products: [], categories: [] }
const listeners = new Set<() => void>()

function set(next: CatalogState) {
  state = next
  for (const listener of listeners) listener()
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => state

export function useCatalog(): CatalogState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

export async function loadCatalog(): Promise<void> {
  if (state.status === 'loading' || state.status === 'ready') return
  if (!SHOP_ID) {
    console.warn('VITE_SHOP_ID is not set — the catalog will stay empty.')
    set({ ...state, status: 'error' })
    return
  }
  set({ ...state, status: 'loading' })
  try {
    const { products, categories } = await fetchCatalog(SHOP_ID)
    set({ status: 'ready', products, categories })
  } catch (err) {
    console.error('Failed to load catalog:', err)
    set({ ...state, status: 'error' })
  }
}
