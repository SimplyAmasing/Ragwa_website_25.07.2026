import { useEffect, useState } from 'react'
import { LOCALES, LOCALE_SHORT, useI18n } from '../i18n'
import { useCart } from '../lib/cart'
import { useNav } from '../lib/router'
import { computeOpenStatus, storeAddress } from '../lib/storeInfo'
import { useWishlist } from '../lib/wishlist'
import {
  CartIcon,
  FacebookIcon,
  HeadsetIcon,
  HeartIcon,
  InstagramIcon,
  MapPinIcon,
  MenuIcon,
  SearchIcon,
  ShieldIcon,
  TruckIcon,
  WhatsappIcon,
  XIcon,
} from '../ui/icons'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Header() {
  const { t, locale, setLocale } = useI18n()
  const { count: cartCount } = useCart()
  const { count: wishCount } = useWishlist()
  const navigate = useNav()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [search, setSearch] = useState('')

  const [status, setStatus] = useState(() => computeOpenStatus())
  useEffect(() => {
    const id = window.setInterval(() => setStatus(computeOpenStatus()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goSection = (id: string) => {
    setMobileOpen(false)
    if (window.location.hash !== '#/' && window.location.hash !== '') {
      window.location.hash = '#/'
      window.setTimeout(() => scrollToId(id), 250)
    } else {
      scrollToId(id)
    }
  }

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate({ name: 'catalog', search: search.trim() || undefined })
    setMobileOpen(false)
  }

  const nav: { label: string; onClick: () => void }[] = [
    { label: t.nav.home, onClick: () => navigate({ name: 'home' }) },
    { label: t.nav.allProducts, onClick: () => navigate({ name: 'catalog' }) },
    { label: t.nav.categories, onClick: () => goSection('categories') },
    { label: t.nav.offers, onClick: () => goSection('on-sale') },
    { label: t.nav.about, onClick: () => goSection('site-footer') },
    { label: t.nav.contact, onClick: () => goSection('site-footer') },
  ]

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'border-b border-slate-100'}`}>
      {/* Top strip */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            {LOCALES.map(code => (
              <button
                key={code}
                onClick={() => setLocale(code)}
                className={`rounded px-1.5 py-0.5 font-bold transition ${
                  code === locale ? 'text-brand' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {LOCALE_SHORT[code]}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            <span className="flex items-center gap-1.5">
              <TruckIcon size={14} className="text-brand" /> {t.header.fastDelivery}
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldIcon size={14} className="text-brand" /> {t.header.genuine100}
            </span>
            <span className="flex items-center gap-1.5">
              <HeadsetIcon size={14} className="text-brand" /> {t.header.support}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">{t.header.contactUs}</span>
            <a href="#" aria-label="Instagram" className="text-slate-400 transition hover:text-brand"><InstagramIcon size={15} /></a>
            <a href="#" aria-label="Facebook" className="text-slate-400 transition hover:text-brand"><FacebookIcon size={15} /></a>
            <a href="#" aria-label="WhatsApp" className="text-slate-400 transition hover:text-brand"><WhatsappIcon size={15} /></a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-5">
        {/* Logo + store */}
        <button onClick={() => navigate({ name: 'home' })} className="flex shrink-0 items-center gap-3">
          <img
            src="/brand/ragwa-logo.webp"
            alt={t.brand}
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-full object-contain shadow-lg shadow-brand/30"
          />
          <span className="hidden flex-col items-start leading-tight sm:flex">
            <span className="text-lg font-black text-slate-900">{t.brand}</span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <MapPinIcon size={11} />
              <span className="max-w-[10rem] truncate">{storeAddress(locale)}</span>
            </span>
            <span
              className={`mt-0.5 inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[10px] font-bold ${
                status.open ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${status.open ? 'bg-green-500' : 'bg-slate-400'}`} />
              {status.open
                ? `${t.header.openNow}${status.until ? ` · ${t.header.untilClose(status.until)}` : ''}`
                : `${t.header.closed}${status.until ? ` · ${t.header.opensAt(status.until)}` : ''}`}
            </span>
          </span>
        </button>

        {/* Nav */}
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {nav.map(item => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-brand"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none">
          <form onSubmit={submitSearch} className="relative hidden max-w-xs flex-1 md:block lg:w-56">
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.header.searchPlaceholder}
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 ps-4 pe-9 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10"
            />
            <button type="submit" aria-label={t.header.searchPlaceholder} className="absolute inset-y-0 end-3 grid place-items-center text-slate-400">
              <SearchIcon size={15} />
            </button>
          </form>

          <button
            onClick={() => navigate({ name: 'wishlist' })}
            aria-label={t.header.wishlist}
            className="relative grid h-10 w-10 place-items-center rounded-full text-slate-600 transition hover:bg-slate-50 hover:text-red-500"
          >
            <HeartIcon size={19} filled={wishCount > 0} />
            {wishCount > 0 && (
              <span className="absolute -top-0.5 -end-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-extrabold text-white">
                {wishCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate({ name: 'cart' })}
            aria-label={t.nav.cart}
            className="relative flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-sm font-bold text-brand transition hover:bg-blue-100"
          >
            <CartIcon size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -end-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[11px] font-extrabold text-white">
                {cartCount}
              </span>
            )}
            <span className="hidden xl:inline">{t.nav.cart}</span>
          </button>

          <button
            onClick={() => setMobileOpen(o => !o)}
            className="grid h-10 w-10 place-items-center rounded-full text-slate-600 lg:hidden"
            aria-label={t.common.menu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-100 px-4 pb-4 pt-3 lg:hidden" style={{ animation: 'fadeInUp 0.2s ease both' }}>
          <form onSubmit={submitSearch} className="relative mb-3">
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.header.searchPlaceholder}
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 ps-4 pe-10 text-sm outline-none focus:border-brand focus:bg-white"
            />
            <button type="submit" className="absolute inset-y-0 end-3 grid place-items-center text-slate-400">
              <SearchIcon size={15} />
            </button>
          </form>
          {nav.map(item => (
            <button
              key={item.label}
              onClick={() => {
                item.onClick()
                setMobileOpen(false)
              }}
              className="block w-full rounded-lg px-2 py-3 text-start text-[15px] font-medium text-slate-700 transition hover:bg-slate-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
