import { useCallback, useEffect, useRef, useState } from 'react'
import { pickI18n, useI18n, type Strings } from '../i18n'
import type { Product } from '../lib/catalog'
import { heroProduct, type BenefitIcon, type HeroProduct, type HeroProductKey } from '../lib/heroScenes'
import { useNav } from '../lib/router'
import { withBase } from '../lib/assetPath'

const AUTO_ROTATE_MS = 4500
const SWIPE_THRESHOLD = 40

/**
 * The approved main marketing artwork (2048×768). Designed with a clean
 * negative-space area on the LEFT for the marketing copy; the product cluster
 * on the right stays unobstructed. Text is localized HTML placed over the left
 * area — never baked into the image, never mirrored with the layout.
 */
const HERO_MAIN_BG = withBase('/hero/hero-main.png')

type Dir = 'rtl' | 'ltr'
type Campaign = Strings['hero']['campaigns'][number]

type Slide = { kind: 'marketing' } | { kind: 'product'; product: Product }

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Exactly 6 slides: slide 1 is the marketing hero (campaign 1 copy over
 * hero-main.png), slides 2–6 are five product slides — each on its category's
 * podium scene (heroScenes.ts) with the real product standing on the pedestal.
 */
export function HeroCarousel({ products }: { products: Product[] }) {
  const { t, tr, dir } = useI18n()
  const navigate = useNav()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useRef(prefersReducedMotion())
  const touchStartX = useRef<number | null>(null)

  const slides: Slide[] = [
    { kind: 'marketing' },
    ...products.slice(0, 5).map(product => ({ kind: 'product' as const, product })),
  ]
  const count = slides.length

  const step = useCallback((delta: number) => setIndex(i => (((i + delta) % count) + count) % count), [count])
  const prev = useCallback(() => step(-1), [step])
  const next = useCallback(() => step(1), [step])

  useEffect(() => {
    if (paused || reduceMotion.current || count < 2) return
    const id = window.setInterval(() => setIndex(i => (i + 1) % count), AUTO_ROTATE_MS)
    return () => window.clearInterval(id)
  }, [paused, count, index])

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  if (count < 2) return null

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > SWIPE_THRESHOLD) (delta < 0 ? next : prev)()
    touchStartX.current = null
  }

  return (
    <section
      className="relative px-4 pt-4 sm:pt-6"
      aria-roledescription="carousel"
      aria-label={t.hero.marketingLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-12px_rgba(11,43,107,0.18)] ring-1 ring-slate-200/70">
          <div
            dir="ltr"
            className="flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: reduceMotion.current ? 'none' : 'transform 620ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {slides.map((slide, i) => {
              const active = i === index
              return (
                <div
                  key={slide.kind === 'marketing' ? 'marketing' : slide.product.linkId}
                  className="w-full flex-shrink-0"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${count}`}
                  aria-hidden={!active}
                >
                  {slide.kind === 'marketing' ? (
                    <MarketingSlide
                      campaign={t.hero.campaigns[0]}
                      eyebrow={t.hero.eyebrow}
                      active={active}
                      dir={dir}
                      onCta={() => navigate({ name: 'catalog' })}
                    />
                  ) : (
                    <ProductSlide
                      product={slide.product}
                      active={active}
                      dir={dir}
                      reduceMotion={reduceMotion.current}
                      strings={t.hero}
                      name={tr(slide.product.name)}
                      onOpen={() => navigate({ name: 'product', id: slide.product.linkId })}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Arrows — physical sides; left = previous, right = next, in every
              language. Never flipped by direction. */}
          <HeroArrow direction="left" label={t.hero.prev} onClick={prev} />
          <HeroArrow direction="right" label={t.hero.next} onClick={next} />

          <div className="absolute inset-x-0 bottom-4 flex justify-center">
            <div dir="ltr" className="flex items-center gap-2 rounded-full bg-white/75 px-2.5 py-1.5 shadow-sm ring-1 ring-black/5 backdrop-blur">
              {slides.map((_s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={t.hero.goToSlide(i + 1)}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-7 bg-brand' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slides are module-level components so they are NOT recreated on every parent
// render — that is what previously remounted the subtree on hover (pause state)
// and replayed the entry animation, making the marketing text appear to move.
// ─────────────────────────────────────────────────────────────────────────────

function MarketingSlide({
  campaign,
  eyebrow,
  active,
  dir,
  onCta,
}: {
  campaign: Campaign
  eyebrow: string
  active: boolean
  dir: Dir
  onCta: () => void
}) {
  return (
    <div className="relative isolate bg-[#dbeafe]">
      {/* Desktop: the artwork fills the slide and the copy is overlaid on its
          clean left area. Mobile: artwork on top, copy in a block below. The
          image is never mirrored between languages. */}
      <div className="relative h-[210px] w-full overflow-hidden sm:h-[290px] md:h-auto md:[aspect-ratio:2048/768]">
        <img
          src={HERO_MAIN_BG}
          alt=""
          className="h-full w-full object-cover object-[70%_center] md:object-center"
        />
        {/* Very light lift for the copy — never a card, just enough that navy
            text stays crisp over the sky and the potted plant. Tied to the
            image's fixed left negative space, so it does not flip with dir. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[62%] md:block"
          style={{
            background:
              'linear-gradient(to right, rgba(238,245,255,0.78) 0%, rgba(238,245,255,0.5) 40%, rgba(238,245,255,0.16) 62%, rgba(238,245,255,0) 82%)',
          }}
        />
      </div>

      {/* Copy — no transform ever. Fades only when this slide becomes active;
          never reacts to the mouse. The information zone is pinned to a FIXED
          physical position and width (`left-0 w-[50%]`, symmetric padding) that
          never flips with the locale; the copy is centred inside it so different
          sentence lengths / RTL vs LTR do not move the composition. `dir` only
          affects text rendering. */}
      <div
        dir={dir}
        className={`bg-[#eef5ff] px-6 py-7 text-center transition-opacity duration-500 md:absolute md:inset-y-0 md:left-0 md:flex md:w-[50%] md:flex-col md:items-center md:justify-center md:bg-transparent md:px-12 md:py-0 lg:px-16 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="mx-auto w-full max-w-[20rem] sm:max-w-md lg:max-w-[32rem]">
          <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            <span className="h-1 w-1 rounded-full bg-brand" />
            {eyebrow}
          </span>
          <h2 className="text-balance text-[1.6rem] font-black leading-[1.14] tracking-tight sm:text-3xl md:text-[2.4rem] md:leading-[1.1] lg:text-[2.9rem]">
            <span className="block text-navy">{campaign.lead}</span>
            <span className="block text-accent">{campaign.emph}</span>
          </h2>
          <p className="mt-3.5 text-sm font-medium text-slate-600 sm:text-base md:mt-4 md:text-[1.05rem]">
            {campaign.subtitle}
          </p>
          <button
            type="button"
            onClick={onCta}
            tabIndex={active ? 0 : -1}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3 text-sm font-extrabold text-white shadow-md shadow-brand/25 transition-[background-color,box-shadow] duration-200 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/35 sm:text-base md:mt-7"
          >
            {campaign.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// Small single-stroke glyphs for the benefit circles. Decorative -> aria-hidden.
function BenefitGlyph({ icon, size = 17 }: { icon: BenefitIcon; size?: number }) {
  const p: Record<BenefitIcon, string> = {
    grease: 'M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z',
    sparkle: 'M12 3v6m0 6v6m-9-9h6m6 0h6M6.5 6.5l3 3m5 5 3 3m0-11-3 3m-5 5-3 3',
    derma: 'M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Zm-3 8 2 2 4-4',
    flower: 'M12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0-5v3m0 12v3m9-9h-3M6 12H3m14.5-6.5-2 2m-9 9-2 2m13 0-2-2m-9-9-2-2',
    drops: 'M9 3s4 5 4 8a4 4 0 0 1-8 0c0-3 4-8 4-8Zm7 6s3 4 3 6a3 3 0 0 1-6 0c0-2 3-6 3-6Z',
    washes: 'M20 12a8 8 0 1 1-3-6.2M20 4v4h-4',
    shield: 'M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Zm-3.5 8.5 2.5 2.5 4.5-4.5',
    mint: 'M11 21C6 21 3 17 3 12c5 0 8 3 8 9Zm2 0c5 0 8-4 8-9-5 0-8 3-8 9Zm-1-9c0-4 3-7 7-8-1 4-3 6-7 8Z',
    daily: 'M8 3v3m8-3v3M4 8h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm3.5 10 2 2 4-4',
    crystal: 'M6 4h12l3 5-9 11L3 9l3-5Zm-3 5h18M9 4 7.5 9 12 20m0-16 1.5 5L12 20',
    bolt: 'M13 2 4 14h7l-2 8 9-12h-7l2-8Z',
    swiss: 'M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm6 3.5v9m-4.5-4.5h9',
    leaf: 'M4 20c0-9 6-15 16-16 0 10-6 16-16 16Zm3-3C11 13 14 10 17 8',
    home: 'M4 11 12 4l8 7M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9',
    clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3 2',
    plates: 'M4 8c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 4c0 1.7 3.6 3 8 3s8-1.3 8-3m-16 4c0 1.7 3.6 3 8 3s8-1.3 8-3',
    shirt: 'M8 4 4 7l2 3 2-1v10h8V9l2 1 2-3-4-3-2 2H10L8 4Zm7 6 .8 2M14 13l.6 1.6',
    strand: 'M12 3c-2 4-4 6-4 10a4 4 0 0 0 8 0c0-4-2-6-4-10ZM6 8l-1.5-1M18 8l1.5-1M5 13H3m18 0h-2M7 18l-1.5 1M17 18l1.5 1',
    toilet: 'M6 4h9a1 1 0 0 1 1 1v6a5 5 0 0 1-10 0V4Zm0 3H4m5 12v2m6-2v2M8 14l-1 5h10l-1-5',
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={p[icon]} />
    </svg>
  )
}

function CartGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .7h8.7a1 1 0 0 0 1-.8L21 8H6M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </svg>
  )
}

type SlideCopy = Strings['hero']['products'][HeroProductKey]

function ProductSlide({
  product,
  active,
  dir,
  reduceMotion,
  strings,
  name,
  onOpen,
}: {
  product: Product
  active: boolean
  dir: Dir
  reduceMotion: boolean
  strings: Strings['hero']
  name: string
  onOpen: () => void
}) {
  const settled = active || reduceMotion
  const motion = reduceMotion ? '' : 'transition-[opacity,transform] duration-500 ease-out'
  const enter = settled ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'

  const hp: HeroProduct | null = heroProduct(pickI18n(product.name, 'en'))
  if (!hp) {
    // Featured list is fixed to five known products; this is a safety net only.
    return (
      <div className="relative isolate bg-[#e7eef6]">
        <div className="relative flex h-[260px] w-full items-center justify-center overflow-hidden sm:h-[320px] md:h-auto md:[aspect-ratio:2048/768]">
          <div dir={dir} className="px-8 text-center">
            <h2 className="text-2xl font-black text-navy">{name}</h2>
            <button
              type="button"
              onClick={onOpen}
              tabIndex={active ? 0 : -1}
              className="mt-4 rounded-xl bg-brand px-7 py-3 text-sm font-extrabold text-white"
            >
              {strings.shopNow}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const copy = strings.products[hp.key]

  return (
    <div className="relative isolate bg-[#e7eef6]">
      <div className="relative h-[300px] w-full overflow-hidden sm:h-[360px] md:h-auto md:[aspect-ratio:2048/768]">
        <img
          src={hp.bg}
          alt=""
          className="h-full w-full object-cover object-[70%_center] md:object-center"
        />

        {/* Readability layer for the left info column — a soft-focus of the scene
            there plus a blue-white gradient wash. Never an opaque card; both fade
            out well before the product. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[46%] md:block md:backdrop-blur-[3px] [mask-image:linear-gradient(to_right,#000_58%,transparent)] [-webkit-mask-image:linear-gradient(to_right,#000_58%,transparent)]" />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[64%] md:block"
          style={{
            background:
              'linear-gradient(to right, rgba(243,248,255,0.96) 0%, rgba(243,248,255,0.93) 30%, rgba(243,248,255,0.76) 44%, rgba(243,248,255,0.38) 56%, rgba(243,248,255,0.08) 70%, rgba(243,248,255,0) 82%)',
          }}
        />
      </div>

      {/* Info layer — real localised HTML, never baked into the artwork. Mobile:
          a block below the scene. Desktop: a FIXED physical information zone
          (`left-0`, fixed width, symmetric padding) that never flips with the
          locale; the copy is centred inside it so RTL/LTR and different sentence
          lengths keep the same physical position. `dir` only affects text
          rendering. Biased toward the top to match the references. */}
      <div
        dir={dir}
        className="bg-[#eef5ff] px-6 pb-24 pt-7 text-center md:absolute md:inset-y-0 md:left-0 md:flex md:w-[42%] md:flex-col md:items-center md:justify-center md:bg-transparent md:px-8 md:pb-0 md:pt-0 lg:px-12 xl:px-16"
      >
        <HeroInfo
          hp={hp}
          copy={copy}
          shopNow={strings.shopNow}
          onOpen={onOpen}
          active={active}
          motion={motion}
          enter={enter}
        />
      </div>
    </div>
  )
}

// One layout for all five product heroes, sized per-hero to match that hero's
// own approved reference: brand logo, localised headline, one support line, a
// strong horizontal row of three large benefit circles (white disc + brand
// icon + short text), and a brand-accent Shop-Now pill. Air Wick puts the CTA
// above the benefit row (`ctaFirst`) and uses the Ragwa-blue accent.
function HeroInfo({
  hp,
  copy,
  shopNow,
  onOpen,
  active,
  motion,
  enter,
}: {
  hp: HeroProduct
  copy: SlideCopy
  shopNow: string
  onOpen: () => void
  active: boolean
  motion: string
  enter: string
}) {
  const acc = hp.accent ?? { fg: 'text-brand', bg: 'bg-brand hover:bg-brand-dark' }

  const benefits = (
    <ul dir="ltr" className="flex items-start justify-center gap-2 md:gap-2.5 lg:gap-3.5">
      {hp.benefitIcons.map((icon, i) => (
        <li
          key={i}
          className="flex w-[4.4rem] flex-col items-center gap-1.5 text-center md:w-[5.2rem] md:gap-2 lg:w-[6rem] xl:w-[6.6rem]"
        >
          <span
            className={`grid h-[3rem] w-[3rem] shrink-0 place-items-center rounded-full bg-white ${acc.fg} shadow-[0_9px_22px_-8px_rgba(11,43,107,0.3)] md:h-[3.5rem] md:w-[3.5rem] lg:h-[3.9rem] lg:w-[3.9rem] xl:h-[4.5rem] xl:w-[4.5rem]`}
          >
            <BenefitGlyph icon={icon} size={24} />
          </span>
          <span
            className={`text-[0.66rem] font-bold leading-tight ${acc.fg} md:text-[0.71rem] lg:text-[0.77rem]`}
          >
            {copy.benefits[i]}
          </span>
        </li>
      ))}
    </ul>
  )

  const cta = (
    <button
      type="button"
      onClick={onOpen}
      tabIndex={active ? 0 : -1}
      className={`inline-flex items-center gap-2 self-center rounded-full px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_14px_30px_-10px_rgba(11,43,107,0.42)] transition-colors duration-200 md:gap-2.5 md:px-7 md:py-3 md:text-[0.92rem] lg:px-9 lg:py-3.5 lg:text-[1.02rem] ${acc.bg}`}
    >
      <CartGlyph />
      {shopNow}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="rtl:-scale-x-100"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  )

  return (
    <div
      className={`mx-auto flex w-full flex-col items-center ${motion} ${enter}`}
      style={{ maxWidth: 'min(96%, 25rem)' }}
    >
      {hp.logo ? (
        <img
          src={hp.logo}
          alt={hp.brand}
          className={`w-auto max-w-[15rem] object-contain md:max-w-[18rem] ${hp.logoH}`}
        />
      ) : (
        <div className="text-xl font-black tracking-tight text-navy md:text-2xl">{hp.brand}</div>
      )}

      <h2
        className={`mt-3 text-balance font-black leading-[1.12] text-navy md:mt-4 md:leading-[1.1] md:[text-shadow:0_1px_2px_rgba(255,255,255,0.92)] lg:mt-5 ${hp.headlineSize}`}
      >
        {copy.headline}
      </h2>
      {copy.support && (
        <p className="mt-1.5 text-[0.8rem] font-medium leading-snug text-slate-600 md:mt-1.5 md:text-[0.85rem] lg:text-[0.9rem]">
          {copy.support}
        </p>
      )}

      {hp.ctaFirst ? (
        <>
          <div className="mt-4 md:mt-5 lg:mt-6">{cta}</div>
          <div className="mt-4 md:mt-6 lg:mt-6">{benefits}</div>
        </>
      ) : (
        <>
          <div className="mt-4 md:mt-6 lg:mt-6">{benefits}</div>
          <div className="mt-4 md:mt-5 lg:mt-5">{cta}</div>
        </>
      )}
    </div>
  )
}




function HeroArrow({
  direction,
  label,
  onClick,
}: {
  direction: 'left' | 'right'
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-[150px] z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lg ring-1 ring-black/5 transition-colors hover:text-brand sm:top-[180px] md:top-1/2 md:h-12 md:w-12 ${
        direction === 'left' ? 'left-3 md:left-5' : 'right-3 md:right-5'
      }`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={direction === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
      </svg>
    </button>
  )
}
