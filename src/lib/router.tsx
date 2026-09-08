import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

export type Route =
  | { name: 'home' }
  | { name: 'catalog'; category?: string; search?: string }
  | { name: 'product'; id: string }
  | { name: 'cart' }
  | { name: 'checkout' }

function parse(hash: string): Route {
  const path = hash.replace(/^#/, '') || '/'
  const [pathname, queryString] = path.split('?')
  const params = new URLSearchParams(queryString ?? '')
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return { name: 'home' }
  switch (segments[0]) {
    case 'catalog':
      return {
        name: 'catalog',
        category: params.get('c') ?? undefined,
        search: params.get('q') ?? undefined,
      }
    case 'p':
      return segments[1] ? { name: 'product', id: decodeURIComponent(segments[1]) } : { name: 'home' }
    case 'cart':
      return { name: 'cart' }
    case 'checkout':
      return { name: 'checkout' }
    default:
      return { name: 'home' }
  }
}

export function toHash(route: Route): string {
  switch (route.name) {
    case 'home':
      return '#/'
    case 'catalog': {
      const q = new URLSearchParams()
      if (route.category) q.set('c', route.category)
      if (route.search) q.set('q', route.search)
      const qs = q.toString()
      return qs ? `#/catalog?${qs}` : '#/catalog'
    }
    case 'product':
      return `#/p/${encodeURIComponent(route.id)}`
    case 'cart':
      return '#/cart'
    case 'checkout':
      return '#/checkout'
  }
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash))

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parse(window.location.hash))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((next: Route) => {
    const hash = toHash(next)
    if (window.location.hash === hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    window.location.hash = hash
  }, [])

  return { route, navigate }
}

// ─── Navigation context ──────────────────────────────────────────────────────
type NavigateFn = (route: Route) => void
const NavContext = createContext<NavigateFn | null>(null)

export function NavProvider({ navigate, children }: { navigate: NavigateFn; children: ReactNode }) {
  return <NavContext.Provider value={navigate}>{children}</NavContext.Provider>
}

export function useNav(): NavigateFn {
  const nav = useContext(NavContext)
  if (!nav) throw new Error('useNav must be used within <NavProvider>')
  return nav
}
