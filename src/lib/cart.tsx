import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Product } from './catalog'
import type { I18nValue } from '../i18n'
import { addMoney, multiplyMoney } from './money'

export interface CartLine {
  linkId: string
  itemId: string
  name: I18nValue
  imageUrls: string[]
  /** Price charged per unit (discount price when on offer). */
  unitPrice: number
  quantity: number
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  subtotal: number
  add: (product: Product, quantity?: number) => void
  setQuantity: (linkId: string, quantity: number) => void
  remove: (linkId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'ragwa.cart'

function readStored(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (l): l is CartLine =>
        l && typeof l.linkId === 'string' && typeof l.unitPrice === 'number' && typeof l.quantity === 'number',
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readStored)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // Non-fatal — cart just won't survive a reload.
    }
  }, [lines])

  const add = useCallback((product: Product, quantity = 1) => {
    setLines(prev => {
      const existing = prev.find(l => l.linkId === product.linkId)
      if (existing) {
        return prev.map(l => (l.linkId === product.linkId ? { ...l, quantity: l.quantity + quantity } : l))
      }
      return [
        ...prev,
        {
          linkId: product.linkId,
          itemId: product.itemId,
          name: product.name,
          imageUrls: product.imageUrls,
          unitPrice: product.effectivePrice,
          quantity,
        },
      ]
    })
  }, [])

  const setQuantity = useCallback((linkId: string, quantity: number) => {
    setLines(prev =>
      quantity <= 0
        ? prev.filter(l => l.linkId !== linkId)
        : prev.map(l => (l.linkId === linkId ? { ...l, quantity } : l)),
    )
  }, [])

  const remove = useCallback((linkId: string) => {
    setLines(prev => prev.filter(l => l.linkId !== linkId))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, l) => sum + l.quantity, 0)
    const subtotal = lines.reduce((sum, l) => addMoney(sum, multiplyMoney(l.unitPrice, l.quantity)), 0)
    return { lines, count, subtotal, add, setQuantity, remove, clear }
  }, [lines, add, setQuantity, remove, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within <CartProvider>')
  return ctx
}
