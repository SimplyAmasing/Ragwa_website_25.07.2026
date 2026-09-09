import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

interface WishlistContextValue {
  ids: string[]
  count: number
  has: (linkId: string) => boolean
  toggle: (linkId: string) => void
  remove: (linkId: string) => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)
const STORAGE_KEY = 'ragwa.wishlist'

function readStored(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(readStored)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Non-fatal.
    }
  }, [ids])

  const toggle = useCallback((linkId: string) => {
    setIds(prev => (prev.includes(linkId) ? prev.filter(id => id !== linkId) : [linkId, ...prev]))
  }, [])

  const remove = useCallback((linkId: string) => {
    setIds(prev => prev.filter(id => id !== linkId))
  }, [])

  const value = useMemo<WishlistContextValue>(
    () => ({ ids, count: ids.length, has: (linkId: string) => ids.includes(linkId), toggle, remove }),
    [ids, toggle, remove],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within <WishlistProvider>')
  return ctx
}
