import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react'
import { catalogStore, loadCatalog } from './lib/catalogStore'
import type { Category, Product } from './lib/catalog'
import { createOrder } from './lib/orders'

// ─── Types ────────────────────────────────────────────────────────────────────
type Page = 'home' | 'catalog' | 'product' | 'cart' | 'checkout'

interface CartItem extends Product {
  quantity: number
}

interface ToastItem {
  id: number
  message: string
}

// ─── useInView hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ─── Global CSS animations ────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes pulseBlue {
    0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
    60%       { box-shadow: 0 0 0 12px rgba(37,99,235,0); }
  }
  @keyframes badgePop {
    0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
    70%  { transform: scale(1.12) rotate(2deg); }
    100% { transform: scale(1) rotate(0); opacity: 1; }
  }
  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }
  @keyframes cartBounce {
    0%, 100% { transform: scale(1); }
    30%       { transform: scale(1.3); }
    60%       { transform: scale(0.9); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(100px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes toastOut {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(100px); }
  }
  @keyframes dotPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.6); opacity: 0.6; }
  }

  .anim-fade-up   { animation: fadeInUp 0.55s cubic-bezier(.22,.68,0,1.2) both; }
  .anim-fade-left { animation: fadeInLeft 0.55s cubic-bezier(.22,.68,0,1.2) both; }
  .anim-fade-right{ animation: fadeInRight 0.55s cubic-bezier(.22,.68,0,1.2) both; }
  .anim-scale-in  { animation: scaleIn 0.45s cubic-bezier(.22,.68,0,1.2) both; }

  /* Stagger delays for grid children */
  .stagger-grid > *:nth-child(1)  { animation-delay: 0ms; }
  .stagger-grid > *:nth-child(2)  { animation-delay: 60ms; }
  .stagger-grid > *:nth-child(3)  { animation-delay: 120ms; }
  .stagger-grid > *:nth-child(4)  { animation-delay: 180ms; }
  .stagger-grid > *:nth-child(5)  { animation-delay: 240ms; }
  .stagger-grid > *:nth-child(6)  { animation-delay: 300ms; }
  .stagger-grid > *:nth-child(7)  { animation-delay: 360ms; }
  .stagger-grid > *:nth-child(8)  { animation-delay: 420ms; }
  .stagger-grid > *:nth-child(n+9){ animation-delay: 480ms; }

  /* Product card image zoom */
  .product-card { overflow: hidden; }
  .product-card:hover .card-img { transform: scale(1.06); }
  .card-img { transition: transform 0.45s cubic-bezier(.22,.68,0,1.2); }

  /* Product card overlay button */
  .card-overlay-btn {
    position: absolute; inset: 0; display: flex; align-items: flex-end;
    padding: 12px; opacity: 0; transition: opacity 0.25s ease;
    background: linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 50%);
    border-radius: 8px;
  }
  .product-card:hover .card-overlay-btn { opacity: 1; }

  /* Nav link underline slide */
  .nav-link { position: relative; }
  .nav-link::after {
    content: ''; position: absolute; bottom: -2px; right: 0;
    width: 0; height: 2px; background: #2563EB;
    transition: width 0.25s ease; border-radius: 1px;
  }
  .nav-link:hover::after, .nav-link.active::after { width: 100%; }

  /* Section title accent */
  .section-title-accent {
    display: inline-block; position: relative;
  }
  .section-title-accent::after {
    content: ''; position: absolute; bottom: -6px; right: 0;
    width: 40px; height: 3px; background: #2563EB; border-radius: 2px;
  }

  /* Category card icon bounce */
  .cat-card:hover .cat-icon {
    animation: cartBounce 0.4s ease;
  }

  /* Deal card image float */
  .deal-img-float { animation: floatY 4s ease-in-out infinite; }

  /* Dual-range price slider: two overlaid <input type="range">, only the thumb is interactive */
  .range-thumb-only { -webkit-appearance: none; appearance: none; pointer-events: none; }
  .range-thumb-only::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 16px; height: 16px; border-radius: 50%;
    background: #2563EB; border: 2px solid white; box-shadow: 0 1px 4px rgba(0,0,0,0.25);
    cursor: pointer; pointer-events: auto;
  }
  .range-thumb-only::-moz-range-thumb {
    width: 16px; height: 16px; border-radius: 50%;
    background: #2563EB; border: 2px solid white; box-shadow: 0 1px 4px rgba(0,0,0,0.25);
    cursor: pointer; pointer-events: auto;
  }
  .range-thumb-only::-webkit-slider-runnable-track { background: transparent; }
  .range-thumb-only::-moz-range-track { background: transparent; }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-grid        { grid-template-columns: 1fr !important; }
    .catalog-grid     { grid-template-columns: 1fr !important; }
    .product-grid     { grid-template-columns: 1fr !important; }
    .cart-grid        { grid-template-columns: 1fr !important; }
    .checkout-grid    { grid-template-columns: 1fr !important; }
  }
`

// ─── Product Data ─────────────────────────────────────────────────────────────
// Live products/categories are loaded from Firestore (src/lib/catalogStore.ts).
function useProducts(): Product[] {
  return useSyncExternalStore(catalogStore.subscribe, catalogStore.getProducts)
}

function useCategories(): Category[] {
  return useSyncExternalStore(catalogStore.subscribe, catalogStore.getCategories)
}

const CATEGORY_ICON_BY_NAME: Record<string, string> = {
  sparkles: '✨',
  beaker: '🧴',
  cloud: '🌸',
  'squares-2x2': '🧹',
  window: '🪟',
  shirt: '👕',
  'square-3-stack-3d': '🧻',
  'hand-raised': '🧤',
  trash: '🗑️',
  wrench: '🪣',
}
const CATEGORY_PALETTE = [
  { bg: '#EFF6FF', hover: '#DBEAFE' },
  { bg: '#F0FDF4', hover: '#BBF7D0' },
  { bg: '#FFF7ED', hover: '#FED7AA' },
  { bg: '#FDF4FF', hover: '#E9D5FF' },
  { bg: '#F0F9FF', hover: '#BAE6FD' },
  { bg: '#FEFCE8', hover: '#FEF08A' },
]

const DEALS = [
  { title: '30% הנחה על אקונומיקה', subtitle: 'כל מוצרי סנו ופרסיל', badge: 'חיסכון גדול', bg: '#EFF6FF', accent: '#2563EB', price: 'החל מ-₪14.9', img: '🧴' },
  { title: '2+1 על סבון כלים', subtitle: 'בחירה מקולקציית פיירי', badge: '2+1 חינם', bg: '#F0FDF4', accent: '#16A34A', price: 'החל מ-₪12.9', img: '🫧' },
  { title: 'מטהרי אוויר חדשים', subtitle: 'קולקציית אביב 2025', badge: 'חדש בחנות', bg: '#FFF7ED', accent: '#EA580C', price: 'החל מ-₪19.9', img: '🌸' },
  { title: 'חבילת ניקיון לבית', subtitle: '10 מוצרים מובחרים', badge: 'חבילה משתלמת', bg: '#FDF4FF', accent: '#9333EA', price: 'החל מ-₪149', img: '🧹' },
  { title: 'מבצע חומרי כביסה', subtitle: 'אריאל, פרסיל, ביולוג', badge: 'עד 40% הנחה', bg: '#FEFCE8', accent: '#CA8A04', price: 'החל מ-₪39.9', img: '👕' },
  { title: 'ניקוי מטבח פרמיום', subtitle: 'ספריי, סבון וספוגים', badge: 'ערכת פרמיום', bg: '#F0F9FF', accent: '#0891B2', price: 'החל מ-₪59.9', img: '🍋' },
]

// ─── Icons ────────────────────────────────────────────────────────────────────
const CartIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)
const HeartIcon = ({ filled = false, size = 18 }: { filled?: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#EF4444' : 'none'} stroke={filled ? '#EF4444' : 'currentColor'} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)
const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? '#F59E0B' : 'none'} stroke="#F59E0B" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
const SearchIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
)
const ChevronDown = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
)
const MenuIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
const XIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
const TrashIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6l-1 14H6L5 6M9 6V4h6v2" /></svg>
const TruckIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
const CheckIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12 5 5 9-9" /></svg>
const PhoneIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 10.5a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.59 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.18 6.18l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
const GlobeIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
const FacebookIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
const InstagramIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
const MinusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14" /></svg>
const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
const ArrowLeftIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
// ArrowRightIcon reserved for future use
// const ArrowRightIcon = () => <svg ... />

// ─── Ripple Button ────────────────────────────────────────────────────────────
function RippleButton({ onClick, style, className, children, type = 'button' }: {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  style?: React.CSSProperties
  className?: string
  children: React.ReactNode
  type?: 'button' | 'submit'
}) {
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const ripple = document.createElement('span')
    const size = Math.max(rect.width, rect.height)
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      background:rgba(255,255,255,0.35);
      transform:scale(0); animation:ripple 0.5s linear;
      pointer-events:none;
    `
    btn.style.position = 'relative'
    btn.style.overflow = 'hidden'
    btn.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())
    onClick?.(e)
  }, [onClick])

  return (
    <button ref={btnRef} type={type} onClick={handleClick} style={style} className={className}>
      {children}
    </button>
  )
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} filled={i <= Math.round(rating)} />)}
      {reviews !== undefined && (
        <span style={{ fontSize: 12, color: '#9CA3AF', marginRight: 4 }}>({reviews.toLocaleString()})</span>
      )}
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function ToastContainer({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div style={{ position: 'fixed', bottom: 28, left: 28, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none' }}>
      {toasts.map(t => (
        <div key={t.id} style={{ background: '#1F2937', color: 'white', borderRadius: 12, padding: '12px 18px', fontSize: 14, fontWeight: 600, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', gap: 10, animation: 'toastIn 0.35s cubic-bezier(.22,.68,0,1.2) both' }}>
          <span style={{ fontSize: 16 }}>🛒</span>
          {t.message}
        </div>
      ))}
    </div>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onAddToCart, onViewProduct, animDelay = 0 }: {
  product: Product
  onAddToCart: (p: Product) => void
  onViewProduct: (p: Product) => void
  animDelay?: number
}) {
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div
      onClick={() => onViewProduct(product)}
      className="product-card"
      style={{
        background: 'white',
        borderRadius: 16,
        border: '1px solid #F1F5F9',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        position: 'relative',
        transition: 'transform 0.28s cubic-bezier(.22,.68,0,1.2), box-shadow 0.28s ease',
        animationDelay: `${animDelay}ms`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 16px 48px rgba(37,99,235,0.1), 0 4px 16px rgba(0,0,0,0.06)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Wishlist */}
      <button
        onClick={e => { e.stopPropagation(); setLiked(!liked) }}
        style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, background: 'white', border: '1px solid #E5E7EB', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'transform 0.2s ease, border-color 0.2s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.15)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
      >
        <HeartIcon filled={liked} />
      </button>

      {/* Discount badge */}
      {product.discount > 0 && (
        <div style={{ position: 'absolute', top: 12, right: 12, background: '#EF4444', color: 'white', borderRadius: 8, padding: '3px 9px', fontSize: 12, fontWeight: 800, zIndex: 10, animation: 'badgePop 0.4s cubic-bezier(.22,.68,0,1.2) both' }}>
          -{product.discount}%
        </div>
      )}

      {/* Image container */}
      <div style={{ background: '#F8F9FB', borderRadius: '16px 16px 0 0', height: 188, overflow: 'hidden', position: 'relative' }}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/300x200/F8F9FB/2563EB?text=${encodeURIComponent(product.name)}` }}
        />
        <div className="card-overlay-btn">
          <button
            onClick={handleAdd}
            style={{ width: '100%', background: 'white', color: '#2563EB', border: 'none', borderRadius: 10, padding: '9px 12px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
          >
            <CartIcon size={15} /> הוסף לעגלה
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        {product.tag && (
          <span style={{ background: '#EFF6FF', color: '#2563EB', borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 700, alignSelf: 'flex-start', letterSpacing: 0.2 }}>
            {product.tag}
          </span>
        )}
        <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>{product.brand}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1E293B', lineHeight: 1.4 }}>{product.name}</div>
        <StarRating rating={product.rating} reviews={product.reviews} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: '#2563EB', letterSpacing: -0.5 }}>₪{product.price}</span>
          {product.discount > 0 && (
            <span style={{ fontSize: 13, color: '#CBD5E1', textDecoration: 'line-through' }}>₪{product.originalPrice}</span>
          )}
        </div>
      </div>

      {/* Add button */}
      <div style={{ padding: '0 16px 16px' }}>
        <RippleButton
          onClick={handleAdd}
          style={{
            background: added ? '#16A34A' : '#2563EB',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '11px 16px',
            fontSize: 14,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            fontFamily: 'Heebo, sans-serif',
            cursor: 'pointer',
            transition: 'background 0.25s ease, transform 0.15s ease',
          }}
        >
          {added ? (
            <><CheckIcon /> נוסף!</>
          ) : (
            <><CartIcon size={15} /> הוסף לעגלה</>
          )}
        </RippleButton>
      </div>
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ cartCount, cartBounce, onNavigate, currentPage }: {
  cartCount: number
  cartBounce: boolean
  onNavigate: (page: Page) => void
  currentPage: Page
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navItems = [
    { label: 'דף הבית', page: 'home' as Page },
    { label: 'קטלוג מוצרים', page: 'catalog' as Page },
    { label: 'מבצעים', page: 'home' as Page },
    { label: 'מותגים', page: 'home' as Page },
    { label: 'אודות', page: 'home' as Page },
    { label: 'צור קשר', page: 'home' as Page },
  ]

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 200, background: 'white',
      borderBottom: '1px solid #F1F5F9',
      boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.07)' : 'none',
      transition: 'box-shadow 0.3s ease',
    }}>
      {/* Top bar */}
      <div style={{ background: '#0F172A', color: 'white', padding: '7px 0' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Heebo, sans-serif', fontSize: 12, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
            >
              <GlobeIcon /> עברית <ChevronDown size={12} />
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Heebo, sans-serif', fontSize: 12, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
            >
              ₪ ILS <ChevronDown size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#FCD34D', fontWeight: 600 }}>
            <TruckIcon /> משלוח חינם מעל ₪300
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Heebo, sans-serif', fontSize: 12, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
            >
              <PhoneIcon /> 1-800-123-456
            </button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '13px 0' }}>
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <div style={{
              width: 38, height: 38, background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 19, boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.08)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(37,99,235,0.4)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(37,99,235,0.3)' }}
            >🫧</div>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', letterSpacing: -1 }}>ראגוה</span>
          </button>

          {/* Nav links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }} className="hidden md:flex">
            {navItems.map(item => {
              const isActive = currentPage === item.page && item.page !== 'home'
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.page)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  style={{
                    background: 'none', border: 'none', padding: '8px 13px', fontSize: 14,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#2563EB' : '#475569',
                    borderRadius: 8, cursor: 'pointer', fontFamily: 'Heebo, sans-serif',
                    whiteSpace: 'nowrap', transition: 'color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#2563EB'; (e.currentTarget as HTMLButtonElement).style.background = '#F8FAFF' }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#475569'; (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: 380, position: 'relative' }} className="hidden md:block">
            <input
              type="text"
              placeholder="חיפוש מוצרים..."
              style={{ width: '100%', padding: '10px 42px 10px 16px', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 14, fontFamily: 'Heebo, sans-serif', background: '#F8FAFC', outline: 'none', direction: 'rtl', transition: 'border-color 0.2s, box-shadow 0.2s' }}
              onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; e.target.style.background = 'white' }}
              onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#F8FAFC' }}
            />
            <div style={{ position: 'absolute', top: '50%', right: 13, transform: 'translateY(-50%)', color: '#94A3B8' }}>
              <SearchIcon size={16} />
            </div>
          </div>

          {/* Cart button */}
          <button
            onClick={() => onNavigate('cart')}
            style={{ position: 'relative', background: '#EFF6FF', border: '1.5px solid #DBEAFE', borderRadius: 11, padding: '9px 16px', color: '#2563EB', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Heebo, sans-serif', fontSize: 14, fontWeight: 700, flexShrink: 0, transition: 'background 0.2s, transform 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#DBEAFE'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#EFF6FF'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
          >
            <div style={{ animation: cartBounce ? 'cartBounce 0.4s ease' : 'none' }}>
              <CartIcon size={19} />
            </div>
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -8, right: -8, background: '#EF4444', color: 'white', borderRadius: '50%', width: 20, height: 20, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, animation: cartBounce ? 'badgePop 0.4s cubic-bezier(.22,.68,0,1.2) both' : 'none' }}>
                {cartCount}
              </span>
            )}
            <span className="hidden lg:inline">עגלה</span>
          </button>

          {/* Mobile menu */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: 4, transition: 'transform 0.2s' }}>
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden" style={{ borderTop: '1px solid #F1F5F9', padding: '12px 0 16px', animation: 'slideDown 0.25s ease' }}>
            <div style={{ marginBottom: 12, position: 'relative' }}>
              <input type="text" placeholder="חיפוש..." style={{ width: '100%', padding: '10px 40px 10px 14px', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 14, fontFamily: 'Heebo, sans-serif', background: '#F8FAFC', outline: 'none', direction: 'rtl' }} />
              <div style={{ position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)', color: '#94A3B8' }}><SearchIcon size={15} /></div>
            </div>
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => { onNavigate(item.page); setMobileOpen(false) }}
                style={{ display: 'block', width: '100%', textAlign: 'right', padding: '11px 8px', background: 'none', border: 'none', fontSize: 15, fontWeight: 500, color: '#374151', cursor: 'pointer', fontFamily: 'Heebo, sans-serif', borderRadius: 8, transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#F8FAFC'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'none'}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { ref, inView } = useInView(0.1)

  return (
    <section ref={ref} style={{ background: 'linear-gradient(150deg, #F0F7FF 0%, #EBF3FF 50%, #F8FAFF 100%)', overflow: 'hidden', position: 'relative', padding: '72px 24px 80px' }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: -120, right: -80, width: 440, height: 440, background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 360, height: 360, background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          {/* Left: content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {/* Live badge */}
            <div
              className={inView ? 'anim-fade-up' : ''}
              style={{ animationDelay: '0ms', display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', border: '1.5px solid #BFDBFE', borderRadius: 100, padding: '7px 18px', alignSelf: 'flex-start', boxShadow: '0 2px 12px rgba(37,99,235,0.08)' }}
            >
              <span style={{ width: 8, height: 8, background: '#2563EB', borderRadius: '50%', display: 'inline-block', animation: 'dotPulse 1.8s ease-in-out infinite' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#2563EB' }}>מבצעי הניקיון של השבוע</span>
            </div>

            <h1
              className={inView ? 'anim-fade-up' : ''}
              style={{ animationDelay: '80ms', fontSize: 'clamp(34px, 4.5vw, 58px)', fontWeight: 900, color: '#0F172A', lineHeight: 1.12, margin: 0, letterSpacing: -1.5 }}
            >
              כל מה שצריך<br />
              <span style={{ color: '#2563EB', display: 'inline-block' }}>לבית נקי ומבריק</span>
            </h1>

            <p
              className={inView ? 'anim-fade-up' : ''}
              style={{ animationDelay: '160ms', fontSize: 17, color: '#64748B', lineHeight: 1.75, margin: 0, maxWidth: 460 }}
            >
              מגוון עצום של מוצרי ניקיון וטיפוח לבית במחירים משתלמים. מותגים מובילים, משלוח מהיר ושירות לקוחות מצוין.
            </p>

            <div className={inView ? 'anim-fade-up' : ''} style={{ animationDelay: '220ms', display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 14, color: '#94A3B8', fontWeight: 500 }}>החל מ</span>
              <span style={{ fontSize: 42, fontWeight: 900, color: '#0F172A', letterSpacing: -2 }}>₪9.9</span>
            </div>

            <div className={inView ? 'anim-fade-up' : ''} style={{ animationDelay: '280ms', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <RippleButton
                onClick={() => onNavigate('catalog')}
                style={{ background: '#2563EB', color: 'white', border: 'none', borderRadius: 14, padding: '15px 30px', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 6px 24px rgba(37,99,235,0.28)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              >
                <CartIcon size={18} /> הזמן עכשיו
              </RippleButton>
              <button
                onClick={() => onNavigate('catalog')}
                style={{ background: 'white', color: '#2563EB', border: '2px solid #2563EB', borderRadius: 14, padding: '15px 30px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', transition: 'background 0.2s, transform 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#EFF6FF'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)' }}
              >
                לכל המבצעים
              </button>
            </div>

            <div className={inView ? 'anim-fade-up' : ''} style={{ animationDelay: '360ms', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {['✅ משלוח חינם מ-₪300', '✅ החזרה בתוך 30 יום', '✅ מוצרים מקוריים'].map(t => (
                <span key={t} style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div
            className={inView ? 'anim-fade-right' : ''}
            style={{ animationDelay: '120ms', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <div style={{ width: '100%', maxWidth: 500, aspectRatio: '1', borderRadius: 28, overflow: 'hidden', boxShadow: '0 24px 80px rgba(37,99,235,0.14)', position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=900&h=900&fit=crop&auto=format"
                alt="מוצרי ניקיון"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'}
                onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
              />
            </div>
            {/* Floating badges */}
            <div style={{ position: 'absolute', bottom: 20, right: -16, background: 'white', borderRadius: 18, padding: '14px 20px', boxShadow: '0 12px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 12, animation: 'floatY 3.5s ease-in-out infinite' }}>
              <div style={{ width: 42, height: 42, background: '#EFF6FF', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🏆</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>+500 מותגים</div>
                <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>מוצרים מובילים</div>
              </div>
            </div>
            <div style={{ position: 'absolute', top: 24, left: -16, background: 'white', borderRadius: 18, padding: '14px 20px', boxShadow: '0 12px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 12, animation: 'floatY 4.2s ease-in-out infinite 0.8s' }}>
              <div style={{ width: 42, height: 42, background: '#ECFDF5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>⭐</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>4.9/5 דירוג</div>
                <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>50,000+ לקוחות</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Categories ───────────────────────────────────────────────────────────────
function CategoriesSection({ onNavigate }: { onNavigate: (page: Page, category?: string) => void }) {
  const { ref, inView } = useInView()
  const categories = useCategories()

  return (
    <section ref={ref} style={{ background: '#F8FAFC', padding: '72px 24px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className={inView ? 'anim-fade-up' : ''} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', margin: '0 0 8px', letterSpacing: -0.5 }}>
              <span className="section-title-accent">קטגוריות</span>
            </h2>
            <p style={{ color: '#64748B', fontSize: 15, margin: 0 }}>גלה את כל מוצרי הניקיון לפי קטגוריה</p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            style={{ color: '#2563EB', fontWeight: 700, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Heebo, sans-serif', display: 'flex', alignItems: 'center', gap: 4, padding: '8px 14px', borderRadius: 8, transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#EFF6FF'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'none'}
          >
            הצג הכל <ArrowLeftIcon />
          </button>
        </div>

        <div className={`stagger-grid ${inView ? 'anim-scale-in' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(136px, 1fr))', gap: 14 }}>
          {categories.map((cat, i) => {
            const palette = CATEGORY_PALETTE[i % CATEGORY_PALETTE.length]
            const emoji = (cat.iconName && CATEGORY_ICON_BY_NAME[cat.iconName]) || '🧽'
            return (
              <button
                key={cat.id}
                onClick={() => onNavigate('catalog', cat.name)}
                className="cat-card"
                style={{ background: palette.bg, border: '1.5px solid transparent', borderRadius: 18, padding: '22px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'pointer', textAlign: 'center', fontFamily: 'Heebo, sans-serif', transition: 'border-color 0.22s, box-shadow 0.22s, transform 0.22s, background 0.22s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = '#BFDBFE'; el.style.boxShadow = '0 8px 28px rgba(37,99,235,0.1)'; el.style.transform = 'translateY(-4px)'; el.style.background = palette.hover }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = 'transparent'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)'; el.style.background = palette.bg }}
              >
                <div className="cat-icon" style={{ fontSize: 38, lineHeight: 1 }}>{emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', lineHeight: 1.3 }}>{cat.name}</div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Deals ────────────────────────────────────────────────────────────────────
function DealsSection({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} style={{ padding: '72px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className={inView ? 'anim-fade-up' : ''} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', margin: '0 0 8px', letterSpacing: -0.5 }}>
              <span className="section-title-accent">מבצעים מיוחדים</span>
            </h2>
            <p style={{ color: '#64748B', fontSize: 15, margin: 0 }}>הצעות אטרקטיביות לזמן מוגבל</p>
          </div>
        </div>

        <div className={`stagger-grid ${inView ? 'anim-fade-up' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 20 }}>
          {DEALS.map((deal, i) => (
            <div
              key={i}
              onClick={() => onNavigate('catalog')}
              style={{ background: deal.bg, borderRadius: 22, padding: '30px 26px', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', overflow: 'hidden', cursor: 'pointer', minHeight: 210, transition: 'transform 0.28s cubic-bezier(.22,.68,0,1.2), box-shadow 0.28s ease', border: '1.5px solid transparent' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.1)'; el.style.borderColor = 'rgba(255,255,255,0.6)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; el.style.borderColor = 'transparent' }}
            >
              <div className="deal-img-float" style={{ position: 'absolute', bottom: 12, left: 20, fontSize: 80, opacity: 0.13, lineHeight: 1, pointerEvents: 'none', animationDelay: `${i * 0.3}s` }}>
                {deal.img}
              </div>
              <span style={{ background: deal.accent, color: 'white', borderRadius: 8, padding: '4px 12px', fontSize: 11, fontWeight: 800, alignSelf: 'flex-start', letterSpacing: 0.4 }}>
                {deal.badge}
              </span>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', margin: 0, lineHeight: 1.2, letterSpacing: -0.3 }}>{deal.title}</h3>
              <p style={{ fontSize: 13, color: '#64748B', margin: 0, fontWeight: 500 }}>{deal.subtitle}</p>
              <div style={{ fontSize: 17, fontWeight: 800, color: deal.accent }}>{deal.price}</div>
              <RippleButton
                onClick={() => onNavigate('catalog')}
                style={{ background: deal.accent, color: 'white', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', alignSelf: 'flex-start', marginTop: 4, transition: 'opacity 0.2s, transform 0.15s' }}
              >
                קנה עכשיו
              </RippleButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Products Section ─────────────────────────────────────────────────────────
function ProductsSection({ onAddToCart, onViewProduct }: {
  onAddToCart: (p: Product) => void
  onViewProduct: (p: Product) => void
}) {
  const [activeTab, setActiveTab] = useState<'new' | 'popular' | 'deals'>('popular')
  const { ref, inView } = useInView()
  const PRODUCTS = useProducts()

  const tabs = [{ id: 'new', label: 'חדשים' }, { id: 'popular', label: 'הנמכרים ביותר' }, { id: 'deals', label: 'מבצעים' }] as const

  const filtered = activeTab === 'new'
    ? PRODUCTS.filter(p => p.tag === 'חדש')
    : activeTab === 'deals'
    ? PRODUCTS.filter(p => p.discount >= 25)
    : PRODUCTS.slice().sort((a, b) => b.reviews - a.reviews)

  return (
    <section ref={ref} style={{ background: '#F8FAFC', padding: '72px 24px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className={inView ? 'anim-fade-up' : ''} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', margin: '0 0 8px', letterSpacing: -0.5 }}>
              <span className="section-title-accent">מוצרים מובילים</span>
            </h2>
            <p style={{ color: '#64748B', fontSize: 15, margin: 0 }}>הנמכרים והאהובים ביותר</p>
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', background: 'white', borderRadius: 14, padding: 5, border: '1.5px solid #E2E8F0', gap: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 20px', borderRadius: 10, border: 'none', fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'Heebo, sans-serif',
                  background: activeTab === tab.id ? '#2563EB' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#94A3B8',
                  transition: 'all 0.2s cubic-bezier(.22,.68,0,1.2)',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(37,99,235,0.25)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`stagger-grid ${inView ? 'anim-fade-up' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(218px, 1fr))', gap: 20 }}>
          {(filtered.length ? filtered : PRODUCTS).map((product, i) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onViewProduct={onViewProduct} animDelay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { ref, inView } = useInView()

  return (
    <section ref={ref} style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #2563EB 100%)', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'rgba(255,255,255,0.04)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 300, height: 300, background: 'rgba(255,255,255,0.03)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className={inView ? 'anim-scale-in' : ''} style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', color: 'white', position: 'relative' }}>
        <div style={{ fontSize: 44, marginBottom: 16, animation: inView ? 'floatY 3s ease-in-out infinite' : 'none' }}>📧</div>
        <h2 style={{ fontSize: 34, fontWeight: 900, margin: '0 0 14px', letterSpacing: -0.5 }}>הישארו מעודכנים</h2>
        <p style={{ fontSize: 16, opacity: 0.8, marginBottom: 36, lineHeight: 1.75, fontWeight: 400 }}>
          הירשמו לניוזלטר וקבלו מבצעים בלעדיים, מוצרים חדשים וטיפים לניקיון ישירות למייל.
        </p>
        {subscribed ? (
          <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: 18, padding: '22px 36px', display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 18, fontWeight: 800, border: '1px solid rgba(255,255,255,0.2)' }}>
            <CheckIcon /> נרשמתם בהצלחה! 🎉
          </div>
        ) : (
          <form
            onSubmit={e => { e.preventDefault(); if (email) { setSubscribed(true); setEmail('') } }}
            style={{ display: 'flex', gap: 10, maxWidth: 460, margin: '0 auto', flexWrap: 'wrap' }}
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="כתובת האימייל שלך"
              required
              style={{ flex: 1, minWidth: 200, padding: '15px 20px', borderRadius: 14, border: 'none', fontSize: 15, fontFamily: 'Heebo, sans-serif', direction: 'rtl', outline: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
            />
            <RippleButton
              type="submit"
              style={{ background: '#F59E0B', color: 'white', border: 'none', borderRadius: 14, padding: '15px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(245,158,11,0.35)', transition: 'transform 0.2s, box-shadow 0.2s' }}
            >
              הרשמה
            </RippleButton>
          </form>
        )}
        <p style={{ fontSize: 12, opacity: 0.5, marginTop: 16, fontWeight: 500 }}>לא נשלח ספאם. ניתן לבטל הרשמה בכל עת.</p>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <footer style={{ background: '#0F172A', color: 'white', padding: '64px 24px 32px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 44, marginBottom: 52 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}>🫧</div>
              <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>ראגוה</span>
            </div>
            <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.85, margin: '0 0 22px' }}>
              החנות המובילה למוצרי ניקיון וטיפוח לבית. מותגים מובילים, מחירים משתלמים.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[<FacebookIcon />, <InstagramIcon />, <span style={{ fontSize: 16 }}>💬</span>].map((Icon, i) => (
                <button key={i}
                  style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.07)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s, color 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#2563EB'; el.style.color = 'white'; el.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'rgba(255,255,255,0.07)'; el.style.color = '#94A3B8'; el.style.transform = 'translateY(0)' }}
                >{Icon}</button>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 15, fontWeight: 800, marginBottom: 18, color: '#F1F5F9' }}>קטגוריות</h4>
            {['סבון כלים', 'אקונומיקה', 'מטהרי אוויר', 'חומרי כביסה', 'מרככי כביסה', 'מגבונים'].map(cat => (
              <button key={cat} onClick={() => onNavigate('catalog')}
                style={{ display: 'block', color: '#64748B', fontSize: 14, marginBottom: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Heebo, sans-serif', padding: 0, textAlign: 'right', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = '#64748B'}
              >{cat}</button>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: 15, fontWeight: 800, marginBottom: 18, color: '#F1F5F9' }}>שירות לקוחות</h4>
            {['שאלות נפוצות', 'מדיניות החזרות', 'מעקב הזמנה', 'תנאי שימוש', 'מדיניות פרטיות'].map(item => (
              <button key={item}
                style={{ display: 'block', color: '#64748B', fontSize: 14, marginBottom: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Heebo, sans-serif', padding: 0, textAlign: 'right', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = '#64748B'}
              >{item}</button>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: 15, fontWeight: 800, marginBottom: 18, color: '#F1F5F9' }}>יצירת קשר</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: '#64748B', fontSize: 14 }}>
              {[
                [<PhoneIcon />, '1-800-123-456'],
                ['📧', 'info@ragva.co.il'],
                ['📍', 'תל אביב, ישראל'],
                ['🕐', 'א-ה: 9:00-18:00'],
              ].map(([icon, text], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{icon} <span>{text as string}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ color: '#475569', fontSize: 13, margin: 0 }}>© 2025 ראגוה. כל הזכויות שמורות.</p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {['💳 Visa', '💳 MC', '📱 Bit', '🔒 SSL'].map((label, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 7, padding: '5px 10px', fontSize: 12, color: '#64748B', border: '1px solid rgba(255,255,255,0.06)' }}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage({ onAddToCart, onViewProduct, onNavigate }: {
  onAddToCart: (p: Product) => void
  onViewProduct: (p: Product) => void
  onNavigate: (page: Page, category?: string) => void
}) {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <CategoriesSection onNavigate={onNavigate} />
      <DealsSection onNavigate={onNavigate} />
      <ProductsSection onAddToCart={onAddToCart} onViewProduct={onViewProduct} />
      <NewsletterSection />
    </>
  )
}

// ─── Catalog Page ─────────────────────────────────────────────────────────────
function CatalogPage({ onAddToCart, onViewProduct, initialCategory }: {
  onAddToCart: (p: Product) => void
  onViewProduct: (p: Product) => void
  initialCategory?: string
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory ?? '')
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'new'>('popular')
  const [onlyDeals, setOnlyDeals] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { ref, inView } = useInView(0.05)
  const PRODUCTS = useProducts()

  const priceBounds = PRODUCTS.reduce(
    (acc, p) => ({ min: Math.min(acc.min, Math.floor(p.price)), max: Math.max(acc.max, Math.ceil(p.price)) }),
    { min: 0, max: 100 }
  )
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null)
  const [priceMin, priceMax] = priceRange ?? [priceBounds.min, priceBounds.max]

  const sorted = PRODUCTS
    .filter(p => !selectedCategory || p.category === selectedCategory)
    .filter(p => !onlyDeals || p.discount > 0)
    .filter(p => p.price >= priceMin && p.price <= priceMax)
    .filter(p => !searchQuery || p.name.includes(searchQuery) || p.brand.includes(searchQuery))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'new') return (b.tag === 'חדש' ? 1 : 0) - (a.tag === 'חדש' ? 1 : 0)
      return b.reviews - a.reviews
    })

  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className="anim-fade-up" style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 34, fontWeight: 900, color: '#0F172A', margin: '0 0 8px', letterSpacing: -0.5 }}>קטלוג מוצרים</h1>
          <p style={{ color: '#64748B', fontSize: 15, margin: 0 }}>מצא את מוצרי הניקיון המושלמים עבורך</p>
        </div>

        <div ref={ref} className="catalog-grid" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 28 }}>
          {/* Sidebar */}
          <aside>
            <div className={inView ? 'anim-fade-left' : ''} style={{ background: 'white', borderRadius: 18, padding: 24, border: '1px solid #E2E8F0', position: 'sticky', top: 84, boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 22px', color: '#0F172A' }}>סינון מוצרים</h3>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' }}>חיפוש</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="שם מוצר..." style={{ width: '100%', padding: '10px 36px 10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 14, fontFamily: 'Heebo, sans-serif', direction: 'rtl', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s' }} onFocus={inputFocus} onBlur={inputBlur} />
                  <div style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)', color: '#94A3B8' }}><SearchIcon size={14} /></div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase' }}>קטגוריה</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {['', ...[...new Set(PRODUCTS.map(p => p.category))]].map(cat => (
                    <button key={cat || 'all'} onClick={() => setSelectedCategory(cat)}
                      style={{ textAlign: 'right', padding: '8px 12px', borderRadius: 9, border: 'none', background: selectedCategory === cat ? '#EFF6FF' : 'transparent', color: selectedCategory === cat ? '#2563EB' : '#475569', fontWeight: selectedCategory === cat ? 700 : 500, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', fontSize: 14, transition: 'background 0.15s, color 0.15s' }}
                      onMouseEnter={e => { if (selectedCategory !== cat) (e.currentTarget as HTMLButtonElement).style.background = '#F8FAFC' }}
                      onMouseLeave={e => { if (selectedCategory !== cat) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                    >
                      {cat || 'כל הקטגוריות'}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase' }}>טווח מחיר: ₪{priceMin} – ₪{priceMax}</label>
                <div style={{ position: 'relative', height: 20 }}>
                  <div style={{ position: 'absolute', top: 9, left: 0, right: 0, height: 3, borderRadius: 2, background: '#E2E8F0' }} />
                  <div
                    style={{
                      position: 'absolute', top: 9, height: 3, borderRadius: 2, background: '#2563EB',
                      left: `${priceBounds.max === priceBounds.min ? 0 : ((priceMin - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}%`,
                      right: `${priceBounds.max === priceBounds.min ? 0 : (1 - (priceMax - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}%`,
                    }}
                  />
                  <input
                    type="range" min={priceBounds.min} max={priceBounds.max} value={priceMin}
                    onChange={e => setPriceRange([Math.min(Number(e.target.value), priceMax), priceMax])}
                    style={{ position: 'absolute', width: '100%', margin: 0, background: 'transparent', accentColor: '#2563EB', pointerEvents: 'none' }}
                    className="range-thumb-only"
                  />
                  <input
                    type="range" min={priceBounds.min} max={priceBounds.max} value={priceMax}
                    onChange={e => setPriceRange([priceMin, Math.max(Number(e.target.value), priceMin)])}
                    style={{ position: 'absolute', width: '100%', margin: 0, background: 'transparent', accentColor: '#2563EB', pointerEvents: 'none' }}
                    className="range-thumb-only"
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94A3B8', marginTop: 4 }}><span>₪{priceBounds.min}</span><span>₪{priceBounds.max}</span></div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E2E8F0', transition: 'border-color 0.2s' }}>
                <input type="checkbox" checked={onlyDeals} onChange={e => setOnlyDeals(e.target.checked)} style={{ width: 16, height: 16, accentColor: '#2563EB' }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>מבצעים בלבד</span>
              </label>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className={inView ? 'anim-fade-up' : ''} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <span style={{ fontSize: 14, color: '#64748B', fontWeight: 500 }}>{sorted.length} מוצרים נמצאו</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, color: '#374151', fontWeight: 600 }}>מיון:</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  style={{ padding: '9px 14px', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 14, fontFamily: 'Heebo, sans-serif', direction: 'rtl', outline: 'none', cursor: 'pointer', background: 'white', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target as HTMLSelectElement).style.borderColor = '#2563EB'}
                  onBlur={e => (e.target as HTMLSelectElement).style.borderColor = '#E2E8F0'}
                >
                  <option value="popular">פופולריות</option>
                  <option value="price-asc">מחיר: נמוך לגבוה</option>
                  <option value="price-desc">מחיר: גבוה לנמוך</option>
                  <option value="new">חדש</option>
                </select>
              </div>
            </div>

            {sorted.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 24px', color: '#94A3B8' }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#475569' }}>לא נמצאו מוצרים</p>
                <p style={{ fontSize: 14 }}>נסה לשנות את הסינון</p>
              </div>
            ) : (
              <div className="stagger-grid anim-fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 20 }}>
                {sorted.map((product, i) => (
                  <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onViewProduct={onViewProduct} animDelay={i * 50} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Product Page ─────────────────────────────────────────────────────────────
function ProductPage({ product, onAddToCart, onNavigate }: {
  product: Product
  onAddToCart: (p: Product) => void
  onNavigate: (page: Page) => void
}) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState<'desc' | 'specs'>('desc')
  const [selectedImg, setSelectedImg] = useState(0)
  const PRODUCTS = useProducts()

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '32px 24px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28, fontSize: 13, color: '#94A3B8' }}>
          <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: '#2563EB', cursor: 'pointer', fontFamily: 'Heebo, sans-serif', fontSize: 13, fontWeight: 600 }}>דף הבית</button>
          <ArrowLeftIcon />
          <button onClick={() => onNavigate('catalog')} style={{ background: 'none', border: 'none', color: '#2563EB', cursor: 'pointer', fontFamily: 'Heebo, sans-serif', fontSize: 13, fontWeight: 600 }}>קטלוג</button>
          <ArrowLeftIcon />
          <span>{product.name}</span>
        </div>

        <div style={{ background: 'white', borderRadius: 22, border: '1px solid #E2E8F0', padding: '40px 36px', marginBottom: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
            {/* Gallery */}
            <div className="anim-fade-left">
              <div style={{ borderRadius: 18, overflow: 'hidden', background: '#F8FAFC', aspectRatio: '1', position: 'relative', marginBottom: 14 }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'}
                  onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
                  onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/500x500/F8FAFC/2563EB?text=${encodeURIComponent(product.name)}` }}
                />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[product.image, product.image, product.image].map((img, i) => (
                  <div key={i} onClick={() => setSelectedImg(i)}
                    style={{ width: 76, height: 76, borderRadius: 12, overflow: 'hidden', border: `2px solid ${selectedImg === i ? '#2563EB' : '#E2E8F0'}`, cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s', transform: selectedImg === i ? 'scale(1.05)' : 'scale(1)' }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="anim-fade-right" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div>
                <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, marginBottom: 6, letterSpacing: 0.5, textTransform: 'uppercase' }}>{product.brand}</div>
                <h1 style={{ fontSize: 30, fontWeight: 900, color: '#0F172A', margin: '0 0 14px', lineHeight: 1.2, letterSpacing: -0.5 }}>{product.name}</h1>
                <StarRating rating={product.rating} reviews={product.reviews} />
              </div>

              <div style={{ background: '#F8FAFC', borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, border: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontSize: 42, fontWeight: 900, color: '#2563EB', letterSpacing: -1 }}>₪{product.price}</div>
                  {product.discount > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                      <span style={{ fontSize: 16, color: '#CBD5E1', textDecoration: 'line-through' }}>₪{product.originalPrice}</span>
                      <span style={{ background: '#EF4444', color: 'white', borderRadius: 6, padding: '3px 9px', fontSize: 12, fontWeight: 800, animation: 'badgePop 0.4s cubic-bezier(.22,.68,0,1.2) both' }}>-{product.discount}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Qty */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 10 }}>כמות:</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid #E2E8F0', borderRadius: 12, overflow: 'hidden', background: 'white' }}>
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 44, height: 44, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#F8FAFC'} onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}><MinusIcon /></button>
                    <span style={{ width: 44, textAlign: 'center', fontSize: 16, fontWeight: 800, color: '#0F172A' }}>{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} style={{ width: 44, height: 44, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#F8FAFC'} onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}><PlusIcon /></button>
                  </div>
                  <span style={{ fontSize: 13, color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CheckIcon /> במלאי
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
                <RippleButton
                  onClick={handleAdd}
                  style={{ background: added ? '#16A34A' : '#2563EB', color: 'white', border: 'none', borderRadius: 14, padding: '16px', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: added ? '0 6px 20px rgba(22,163,74,0.28)' : '0 6px 20px rgba(37,99,235,0.28)', transition: 'background 0.25s, box-shadow 0.25s' }}
                >
                  {added ? <><CheckIcon /> נוסף לעגלה!</> : <><CartIcon size={18} /> הוסף לעגלה</>}
                </RippleButton>
                <RippleButton
                  onClick={() => { handleAdd(); onNavigate('cart') }}
                  style={{ background: '#0F172A', color: 'white', border: 'none', borderRadius: 14, padding: '16px', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', transition: 'background 0.2s' }}
                >
                  קנה עכשיו
                </RippleButton>
              </div>

              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {['🚚 משלוח חינם מ-₪300', '↩️ החזרה תוך 30 יום', '🛡️ אחריות יצרן', '💳 תשלום מאובטח'].map(b => (
                  <div key={b} style={{ fontSize: 13, color: '#64748B', fontWeight: 500, padding: '8px 12px', background: '#F8FAFC', borderRadius: 9 }}>{b}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ borderTop: '1px solid #F1F5F9', marginTop: 40, paddingTop: 30 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
              {[{ id: 'desc', label: 'תיאור המוצר' }, { id: 'specs', label: 'מפרט טכני' }].map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id as 'desc' | 'specs')}
                  style={{ padding: '10px 26px', borderRadius: 11, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', background: activeTab === t.id ? '#2563EB' : '#F1F5F9', color: activeTab === t.id ? 'white' : '#64748B', transition: 'all 0.2s', boxShadow: activeTab === t.id ? '0 4px 12px rgba(37,99,235,0.22)' : 'none' }}
                >{t.label}</button>
              ))}
            </div>
            {activeTab === 'desc' ? (
              <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.85, margin: 0 }}>{product.description}</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[['קטגוריה', product.category], ['מותג', product.brand], ['מחיר', `₪${product.price}`], ['דירוג', `${product.rating}/5`], ['ביקורות', product.reviews.toLocaleString()], ['הנחה', `${product.discount}%`]].map(([k, v]) => (
                  <div key={k} style={{ background: '#F8FAFC', borderRadius: 11, padding: '13px 18px', display: 'flex', justifyContent: 'space-between', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: 14, color: '#94A3B8', fontWeight: 500 }}>{k}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', marginBottom: 22, letterSpacing: -0.3 }}>מוצרים דומים</h2>
            <div className="stagger-grid anim-fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 20 }}>
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onViewProduct={() => {}} animDelay={i * 70} />
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`@media(max-width:768px){.product-grid{grid-template-columns:1fr !important;}}`}</style>
    </div>
  )
}

// ─── Cart Page ────────────────────────────────────────────────────────────────
function CartPage({ cartItems, onUpdateQty, onRemove, onNavigate }: {
  cartItems: CartItem[]
  onUpdateQty: (id: string, qty: number) => void
  onRemove: (id: string) => void
  onNavigate: (page: Page) => void
}) {
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shipping = subtotal >= 300 ? 0 : 29.9
  const vat = subtotal * 0.17
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, background: '#F8FAFC', textAlign: 'center' }}>
        <div style={{ fontSize: 80, marginBottom: 24, animation: 'floatY 3s ease-in-out infinite' }}>🛒</div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', margin: '0 0 12px' }}>העגלה שלך ריקה</h2>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 28, fontWeight: 500 }}>הוסף מוצרים לעגלה כדי להמשיך לרכישה</p>
        <RippleButton onClick={() => onNavigate('catalog')} style={{ background: '#2563EB', color: 'white', border: 'none', borderRadius: 14, padding: '14px 34px', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', boxShadow: '0 6px 20px rgba(37,99,235,0.28)' }}>
          גלה מוצרים
        </RippleButton>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 className="anim-fade-up" style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', marginBottom: 32, letterSpacing: -0.5 }}>עגלת הקניות שלי</h1>
        <div className="cart-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {cartItems.map((item, i) => (
              <div key={item.id} className="anim-fade-up" style={{ background: 'white', borderRadius: 18, border: '1px solid #E2E8F0', padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'center', animationDelay: `${i * 60}ms`, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 24px rgba(0,0,0,0.08)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'}
              >
                <div style={{ width: 88, height: 88, borderRadius: 14, overflow: 'hidden', background: '#F8FAFC', flexShrink: 0, border: '1px solid #E2E8F0' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{item.brand}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 10 }}>{item.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
                      <button onClick={() => onUpdateQty(item.id, item.quantity - 1)} style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#F8FAFC'} onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}><MinusIcon /></button>
                      <span style={{ width: 36, textAlign: 'center', fontSize: 15, fontWeight: 800, color: '#0F172A' }}>{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, item.quantity + 1)} style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#F8FAFC'} onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}><PlusIcon /></button>
                    </div>
                    <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontFamily: 'Heebo, sans-serif', fontWeight: 600, padding: '6px 10px', borderRadius: 8, transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#FEF2F2'} onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'none'}>
                      <TrashIcon /> הסר
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: 'left', flexShrink: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#2563EB', letterSpacing: -0.5 }}>₪{(item.price * item.quantity).toFixed(1)}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500, marginTop: 2 }}>₪{item.price} / יחידה</div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="anim-fade-left" style={{ background: 'white', borderRadius: 22, border: '1px solid #E2E8F0', padding: 28, position: 'sticky', top: 84, boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: '0 0 22px' }}>סיכום הזמנה</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
              {[
                { label: 'סיכום ביניים', value: `₪${subtotal.toFixed(1)}`, bold: false },
                { label: 'משלוח', value: shipping === 0 ? 'חינם ✓' : `₪${shipping}`, bold: false, green: shipping === 0 },
                { label: 'מע"מ (17%)', value: `₪${vat.toFixed(1)}`, bold: false, muted: true },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, color: row.muted ? '#94A3B8' : '#374151' }}>
                  <span>{row.label}</span>
                  <span style={{ fontWeight: 700, color: row.green ? '#10B981' : undefined }}>{row.value}</span>
                </div>
              ))}
            </div>
            {shipping > 0 && (
              <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 11, padding: '11px 14px', marginBottom: 16, fontSize: 13, color: '#92400E', display: 'flex', alignItems: 'center', gap: 7, fontWeight: 600 }}>
                <TruckIcon /> הוסף ₪{(300 - subtotal).toFixed(1)} לקבלת משלוח חינם
              </div>
            )}
            <div style={{ borderTop: '2px solid #F1F5F9', paddingTop: 18, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: '#0F172A' }}>סה"כ לתשלום</span>
                <span style={{ fontSize: 26, fontWeight: 900, color: '#2563EB', letterSpacing: -0.5 }}>₪{total.toFixed(1)}</span>
              </div>
            </div>
            <RippleButton
              onClick={() => onNavigate('checkout')}
              style={{ width: '100%', background: '#2563EB', color: 'white', border: 'none', borderRadius: 14, padding: '16px', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', marginBottom: 12, boxShadow: '0 6px 20px rgba(37,99,235,0.25)', display: 'block', transition: 'transform 0.2s, box-shadow 0.2s' }}
            >
              המשך לתשלום →
            </RippleButton>
            <button
              onClick={() => onNavigate('catalog')}
              style={{ width: '100%', background: 'transparent', color: '#64748B', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: '14px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#94A3B8'; (e.currentTarget as HTMLButtonElement).style.color = '#374151' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E2E8F0'; (e.currentTarget as HTMLButtonElement).style.color = '#64748B' }}
            >
              המשך בקנייה
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Checkout Page ────────────────────────────────────────────────────────────
function CheckoutPage({ cartItems, onSuccess }: { cartItems: CartItem[]; onSuccess: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', zip: '' })
  const [shipping, setShipping] = useState<'standard' | 'express'>('standard')
  const [payment, setPayment] = useState<'card' | 'paypal' | 'bit'>('card')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shippingCost = subtotal >= 300 ? 0 : shipping === 'express' ? 59.9 : 29.9
  const total = subtotal + shippingCost

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  if (submitted) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, background: '#F8FAFC', textAlign: 'center' }}>
        <div style={{ width: 88, height: 88, background: '#D1FAE5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginBottom: 24, animation: 'scaleIn 0.5s cubic-bezier(.22,.68,0,1.2) both', boxShadow: '0 8px 32px rgba(16,185,129,0.2)' }}>✅</div>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: '#0F172A', margin: '0 0 14px' }}>ההזמנה בוצעה בהצלחה!</h2>
        <p style={{ color: '#64748B', fontSize: 16, marginBottom: 8, fontWeight: 500 }}>תודה על הרכישה שלך! אישור הזמנה נשלח למייל.</p>
        <p style={{ color: '#94A3B8', fontSize: 14 }}>חוזרים לדף הבית בעוד שניות...</p>
      </div>
    )
  }

  const steps = ['פרטים אישיים', 'משלוח ותשלום', 'אישור']
  const inputSt: React.CSSProperties = { width: '100%', padding: '12px 16px', border: '1.5px solid #E2E8F0', borderRadius: 11, fontSize: 15, fontFamily: 'Heebo, sans-serif', direction: 'rtl', outline: 'none', boxSizing: 'border-box', background: 'white', transition: 'border-color 0.2s, box-shadow 0.2s' }
  const iFocus = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }
  const iBlur = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 className="anim-fade-up" style={{ fontSize: 30, fontWeight: 900, color: '#0F172A', marginBottom: 32, letterSpacing: -0.5 }}>תשלום מאובטח</h1>

        {/* Step indicator */}
        <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: step > i + 1 ? '#16A34A' : step === i + 1 ? '#2563EB' : '#E2E8F0', color: step > i + 1 || step === i + 1 ? 'white' : '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, flexShrink: 0, transition: 'background 0.3s', boxShadow: step === i + 1 ? '0 4px 12px rgba(37,99,235,0.3)' : 'none' }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 14, fontWeight: step === i + 1 ? 800 : 500, color: step === i + 1 ? '#0F172A' : '#94A3B8', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? '#16A34A' : '#E2E8F0', margin: '0 14px', minWidth: 24, transition: 'background 0.3s, transform 0.2s' }} />}
            </div>
          ))}
        </div>

        <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28, alignItems: 'start' }}>
          <form onSubmit={e => {
            e.preventDefault()
            setSubmitError(null)
            setSubmitting(true)
            createOrder(
              { name: form.name, phone: form.phone, email: form.email, address: form.address, city: form.city },
              cartItems.map(i => ({ itemId: i.itemId, name: i.name, qty: i.quantity, unitPrice: i.price }))
            )
              .then(() => { setSubmitted(true); setTimeout(onSuccess, 3200) })
              .catch(err => setSubmitError(err instanceof Error ? err.message : 'שגיאה ביצירת ההזמנה'))
              .finally(() => setSubmitting(false))
          }}>
            {step === 1 && (
              <div className="anim-scale-in" style={{ background: 'white', borderRadius: 22, border: '1px solid #E2E8F0', padding: 34, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 26, color: '#0F172A' }}>פרטים אישיים</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div><label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.4 }}>שם מלא *</label><input type="text" required value={form.name} onChange={upd('name')} placeholder="ישראל ישראלי" style={inputSt} onFocus={iFocus} onBlur={iBlur} /></div>
                  <div><label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.4 }}>טלפון *</label><input type="tel" required value={form.phone} onChange={upd('phone')} placeholder="050-000-0000" style={inputSt} onFocus={iFocus} onBlur={iBlur} /></div>
                </div>
                <div style={{ marginBottom: 16 }}><label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.4 }}>אימייל *</label><input type="email" required value={form.email} onChange={upd('email')} placeholder="example@email.com" style={inputSt} onFocus={iFocus} onBlur={iBlur} /></div>
                <div style={{ marginBottom: 16 }}><label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.4 }}>כתובת *</label><input type="text" required value={form.address} onChange={upd('address')} placeholder="רחוב הרצל 1" style={inputSt} onFocus={iFocus} onBlur={iBlur} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div><label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.4 }}>עיר *</label><input type="text" required value={form.city} onChange={upd('city')} placeholder="תל אביב" style={inputSt} onFocus={iFocus} onBlur={iBlur} /></div>
                  <div><label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.4 }}>מיקוד</label><input type="text" value={form.zip} onChange={upd('zip')} placeholder="12345" style={inputSt} onFocus={iFocus} onBlur={iBlur} /></div>
                </div>
                <RippleButton type="button" onClick={() => setStep(2)} style={{ marginTop: 26, background: '#2563EB', color: 'white', border: 'none', borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', boxShadow: '0 6px 16px rgba(37,99,235,0.25)' }}>
                  המשך לשלב הבא →
                </RippleButton>
              </div>
            )}

            {step === 2 && (
              <div className="anim-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ background: 'white', borderRadius: 22, border: '1px solid #E2E8F0', padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, color: '#0F172A' }}>בחירת משלוח</h3>
                  {[
                    { id: 'standard', label: 'משלוח רגיל', desc: '3-5 ימי עסקים', price: subtotal >= 300 ? 'חינם' : '₪29.9' },
                    { id: 'express', label: 'משלוח מהיר', desc: '1-2 ימי עסקים', price: subtotal >= 300 ? 'חינם' : '₪59.9' },
                  ].map(opt => (
                    <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', border: `2px solid ${shipping === opt.id ? '#2563EB' : '#E2E8F0'}`, borderRadius: 14, cursor: 'pointer', marginBottom: 12, background: shipping === opt.id ? '#EFF6FF' : 'white', transition: 'all 0.2s' }}>
                      <input type="radio" name="ship" value={opt.id} checked={shipping === opt.id} onChange={() => setShipping(opt.id as 'standard' | 'express')} style={{ accentColor: '#2563EB', width: 18, height: 18 }} />
                      <TruckIcon />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{opt.label}</div>
                        <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 500 }}>{opt.desc}</div>
                      </div>
                      <span style={{ fontWeight: 800, color: '#2563EB', fontSize: 15 }}>{opt.price}</span>
                    </label>
                  ))}
                </div>
                <div style={{ background: 'white', borderRadius: 22, border: '1px solid #E2E8F0', padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, color: '#0F172A' }}>אמצעי תשלום</h3>
                  {[{ id: 'card', label: 'כרטיס אשראי', icon: '💳' }, { id: 'paypal', label: 'PayPal', icon: '🅿️' }, { id: 'bit', label: 'Bit', icon: '📱' }].map(opt => (
                    <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', border: `2px solid ${payment === opt.id ? '#2563EB' : '#E2E8F0'}`, borderRadius: 14, cursor: 'pointer', marginBottom: 10, background: payment === opt.id ? '#EFF6FF' : 'white', transition: 'all 0.2s' }}>
                      <input type="radio" name="pay" value={opt.id} checked={payment === opt.id} onChange={() => setPayment(opt.id as 'card' | 'paypal' | 'bit')} style={{ accentColor: '#2563EB', width: 18, height: 18 }} />
                      <span style={{ fontSize: 22 }}>{opt.icon}</span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="button" onClick={() => setStep(1)} style={{ background: '#F1F5F9', color: '#374151', border: 'none', borderRadius: 12, padding: '14px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', transition: 'background 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#E2E8F0'} onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#F1F5F9'}>← חזור</button>
                  <RippleButton type="button" onClick={() => setStep(3)} style={{ flex: 1, background: '#2563EB', color: 'white', border: 'none', borderRadius: 12, padding: '14px', fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: 'Heebo, sans-serif', boxShadow: '0 6px 16px rgba(37,99,235,0.25)' }}>המשך לאישור →</RippleButton>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="anim-scale-in" style={{ background: 'white', borderRadius: 22, border: '1px solid #E2E8F0', padding: 34, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24, color: '#0F172A' }}>אישור הזמנה</h3>
                <div style={{ background: '#F8FAFC', borderRadius: 14, padding: 20, marginBottom: 24, border: '1px solid #E2E8F0' }}>
                  {[['שם', form.name], ['טלפון', form.phone], ['אימייל', form.email], ['כתובת', `${form.address}, ${form.city}`], ['משלוח', shipping === 'express' ? 'מהיר (1-2 ימים)' : 'רגיל (3-5 ימים)'], ['תשלום', payment === 'card' ? 'כרטיס אשראי' : payment === 'paypal' ? 'PayPal' : 'Bit']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #E2E8F0', fontSize: 14 }}>
                      <span style={{ color: '#94A3B8', fontWeight: 500 }}>{k}:</span>
                      <span style={{ fontWeight: 700, color: '#0F172A' }}>{v}</span>
                    </div>
                  ))}
                </div>
                {submitError && (
                  <div style={{ background: '#FEF2F2', color: '#DC2626', borderRadius: 10, padding: '10px 14px', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>{submitError}</div>
                )}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="button" onClick={() => setStep(2)} style={{ background: '#F1F5F9', color: '#374151', border: 'none', borderRadius: 12, padding: '14px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Heebo, sans-serif' }}>← חזור</button>
                  <RippleButton type="submit" style={{ flex: 1, background: submitting ? '#94A3B8' : '#16A34A', color: 'white', border: 'none', borderRadius: 12, padding: '15px', fontSize: 16, fontWeight: 800, cursor: submitting ? 'default' : 'pointer', fontFamily: 'Heebo, sans-serif', boxShadow: '0 6px 20px rgba(22,163,74,0.28)', pointerEvents: submitting ? 'none' : 'auto' }}>
                    {submitting ? 'מבצע הזמנה...' : `✅ ביצוע הזמנה — ₪${total.toFixed(1)}`}
                  </RippleButton>
                </div>
              </div>
            )}
          </form>

          {/* Order summary */}
          <div className="anim-fade-left" style={{ background: 'white', borderRadius: 22, border: '1px solid #E2E8F0', padding: 26, position: 'sticky', top: 84, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: '0 0 18px' }}>סיכום הזמנה</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 10, overflow: 'hidden', background: '#F8FAFC', flexShrink: 0, border: '1px solid #E2E8F0' }}>
                    <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, fontSize: 13, color: '#374151', lineHeight: 1.4, fontWeight: 500 }}>{item.name} <span style={{ color: '#94A3B8' }}>×{item.quantity}</span></div>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>₪{(item.price * item.quantity).toFixed(1)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: '#64748B' }}><span>ביניים</span><span>₪{subtotal.toFixed(1)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontSize: 14, color: '#64748B' }}><span>משלוח</span><span style={{ color: shippingCost === 0 ? '#10B981' : undefined }}>{shippingCost === 0 ? 'חינם' : `₪${shippingCost}`}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 900 }}><span>סה"כ</span><span style={{ color: '#2563EB' }}>₪{total.toFixed(1)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [catalogCategory, setCatalogCategory] = useState<string | undefined>(undefined)
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartBounce, setCartBounce] = useState(false)
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const toastId = useRef(0)

  useEffect(() => {
    loadCatalog()
  }, [])

  const navigate = (p: Page, category?: string) => {
    setPage(p)
    if (p === 'catalog') setCatalogCategory(category)
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)
      return exists
        ? prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...product, quantity: 1 }]
    })
    // bounce + toast
    setCartBounce(true)
    setTimeout(() => setCartBounce(false), 500)
    const id = ++toastId.current
    setToasts(prev => [...prev, { id, message: `"${product.name}" נוסף לעגלה` }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2800)
  }

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) setCart(prev => prev.filter(i => i.id !== id))
    else setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div style={{ minHeight: '100vh', background: 'white', fontFamily: 'Heebo, sans-serif' }}>
        <Header cartCount={cartCount} cartBounce={cartBounce} onNavigate={navigate} currentPage={page} />
        <main>
          {page === 'home' && <HomePage onAddToCart={addToCart} onViewProduct={p => { setSelectedProduct(p); navigate('product') }} onNavigate={navigate} />}
          {page === 'catalog' && <CatalogPage onAddToCart={addToCart} onViewProduct={p => { setSelectedProduct(p); navigate('product') }} initialCategory={catalogCategory} />}
          {page === 'product' && selectedProduct && <ProductPage product={selectedProduct} onAddToCart={addToCart} onNavigate={navigate} />}
          {page === 'cart' && <CartPage cartItems={cart} onUpdateQty={updateQty} onRemove={id => setCart(prev => prev.filter(i => i.id !== id))} onNavigate={navigate} />}
          {page === 'checkout' && <CheckoutPage cartItems={cart} onSuccess={() => { setCart([]); navigate('home') }} />}
        </main>
        {page !== 'checkout' && <Footer onNavigate={navigate} />}
      </div>
      <ToastContainer toasts={toasts} />
    </>
  )
}
