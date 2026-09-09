import { useRef } from 'react'
import { useI18n } from '../i18n'
import type { Product } from '../lib/catalog'
import { ProductCard } from './ProductCard'

interface ProductRailProps {
  title: string
  subtitle: string
  viewAllLabel: string
  onViewAll: () => void
  products: Product[]
}

export function ProductRail({ title, subtitle, viewAllLabel, onViewAll, products }: ProductRailProps) {
  const { t } = useI18n()
  const scroller = useRef<HTMLDivElement>(null)

  if (products.length === 0) return null

  // Purely PHYSICAL movement, identical in Arabic, Hebrew and English:
  //   RIGHT button ( > )  -> cards slide physically LEFT,  new cards from the RIGHT
  //   LEFT  button ( < )  -> cards slide physically RIGHT, new cards from the LEFT
  //
  // A positive `scrollBy({ left })` delta increases `scrollLeft`, which pans the
  // viewport toward the physical right in every writing mode current browsers
  // ship (LTR, and the standardised negative-scrollLeft RTL model used by
  // Chrome/Firefox/Safari). No `dir` check, no list-index math, no sign
  // patching — there is nothing here for RTL to reverse.
  const pan = (physicalRight: boolean) => {
    const el = scroller.current
    if (!el) return
    const step = Math.round(el.clientWidth * 0.9)
    el.scrollBy({ left: physicalRight ? step : -step, behavior: 'smooth' })
  }

  return (
    <section className="px-4 py-12 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-navy sm:text-3xl">{title}</h2>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">{subtitle}</p>
          </div>
          <button
            onClick={onViewAll}
            className="flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold text-brand transition hover:bg-blue-50"
          >
            {viewAllLabel}
            <Chevron dir="right" className="rtl:-scale-x-100" />
          </button>
        </div>

        <div className="relative">
          <RailArrow direction="left" label={t.hero.prev} onClick={() => pan(false)} />
          <RailArrow direction="right" label={t.hero.next} onClick={() => pan(true)} />

          <div
            ref={scroller}
            className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map(product => (
              <div
                key={product.linkId}
                className="w-[calc((100%-1rem)/1.8)] shrink-0 snap-start sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-5rem)/6)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function RailArrow({ direction, label, onClick }: { direction: 'left' | 'right'; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white p-2.5 text-navy shadow-md transition hover:text-brand lg:grid ${
        direction === 'left' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'
      }`}
    >
      <Chevron dir={direction} />
    </button>
  )
}

function Chevron({ dir, className }: { dir: 'left' | 'right'; className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={dir === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
    </svg>
  )
}
