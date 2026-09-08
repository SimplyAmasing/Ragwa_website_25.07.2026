import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { useCart } from '../lib/cart'
import { useNav } from '../lib/router'
import { CartIcon, MenuIcon, SearchIcon, TruckIcon, XIcon } from '../ui/icons'
import { LanguageSwitcher } from './LanguageSwitcher'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Header() {
  const { t } = useI18n()
  const { count } = useCart()
  const navigate = useNav()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [search, setSearch] = useState('')
  const prevCount = useRef(count)
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (count > prevCount.current) {
      setBounce(true)
      const id = setTimeout(() => setBounce(false), 400)
      return () => clearTimeout(id)
    }
    prevCount.current = count
  }, [count])

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate({ name: 'catalog', search: search.trim() || undefined })
    setMobileOpen(false)
  }

  const navItems: { label: string; onClick: () => void }[] = [
    { label: t.nav.home, onClick: () => navigate({ name: 'home' }) },
    { label: t.nav.catalog, onClick: () => navigate({ name: 'catalog' }) },
    { label: t.nav.about, onClick: () => scrollToId('site-footer') },
    { label: t.nav.contact, onClick: () => scrollToId('site-footer') },
  ]

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'border-b border-slate-100'}`}>
      {/* Top strip */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 text-xs">
          <LanguageSwitcher tone="dark" />
          <span className="hidden items-center gap-1.5 font-semibold text-amber-300 sm:flex">
            <TruckIcon size={14} /> {t.header.freeShipping}
          </span>
          <span className="text-slate-400">Ragwa</span>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <button
          onClick={() => navigate({ name: 'home' })}
          className="flex shrink-0 items-center gap-2.5"
          aria-label={t.brand}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-lg shadow-lg shadow-brand/30">
            🫧
          </span>
          <span className="text-xl font-black tracking-tight text-slate-900">{t.brand}</span>
        </button>

        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-brand"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="relative hidden max-w-sm flex-1 md:block">
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.header.searchPlaceholder}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 ps-4 pe-10 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10"
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-3 grid place-items-center text-slate-400"
            aria-label={t.header.searchPlaceholder}
          >
            <SearchIcon size={16} />
          </button>
        </form>

        <button
          onClick={() => navigate({ name: 'cart' })}
          className="relative flex shrink-0 items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3.5 py-2 text-sm font-bold text-brand transition hover:bg-blue-100"
        >
          <span style={bounce ? { animation: 'badgePop 0.4s cubic-bezier(0.22,0.68,0,1.2) both' } : undefined}>
            <CartIcon size={19} />
          </span>
          {count > 0 && (
            <span className="absolute -top-2 -end-2 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[11px] font-extrabold text-white">
              {count}
            </span>
          )}
          <span className="hidden lg:inline">{t.nav.cart}</span>
        </button>

        <button
          onClick={() => setMobileOpen(o => !o)}
          className="shrink-0 p-1 text-slate-600 md:hidden"
          aria-label={t.common.menu}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-100 px-4 pb-4 pt-3 md:hidden" style={{ animation: 'fadeInUp 0.2s ease both' }}>
          <form onSubmit={submitSearch} className="relative mb-3">
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.header.searchPlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 ps-4 pe-10 text-sm outline-none focus:border-brand focus:bg-white"
            />
            <button type="submit" className="absolute inset-y-0 end-3 grid place-items-center text-slate-400">
              <SearchIcon size={15} />
            </button>
          </form>
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => {
                item.onClick()
                setMobileOpen(false)
              }}
              className="block w-full rounded-lg px-2 py-3 text-start text-[15px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
