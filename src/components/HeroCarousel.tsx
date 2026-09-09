import { useCallback, useEffect, useRef, useState } from 'react'
import { pickI18n, useI18n, type Strings } from '../i18n'
import type { Product } from '../lib/catalog'
import {
  heroSceneImage,
  heroSceneNumber,
  podiumPlacement,
  productCutout,
  sceneText,
  type TextCorner,
} from '../lib/heroScenes'
import { useNav } from '../lib/router'
import { Money } from '../ui/primitives'

const AUTO_ROTATE_MS = 4500
const SWIPE_THRESHOLD = 40

/**
 * The approved main marketing artwork (2048×768). Designed with a clean
 * negative-space area on the LEFT for the marketing copy; the product cluster
 * on the right stays unobstructed. Text is localized HTML placed over the left
 * area — never baked into the image, never mirrored with the layout.
 */
const HERO_MAIN_BG = '/hero/hero-main.png'

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
                      featuredLabel={t.hero.featured}
                      ctaLabel={t.hero.ctaShop}
                      fallbackLine={t.hero.subtitle}
                      name={tr(slide.product.name)}
                      categoryName={tr(slide.product.categoryName)}
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
          never reacts to the mouse. Physically pinned to the left (the image's
          negative space); only the text alignment inside follows the language. */}
      <div
        dir={dir}
        className={`bg-[#eef5ff] px-6 py-7 text-start transition-opacity duration-500 md:absolute md:inset-y-0 md:left-0 md:flex md:w-[50%] md:flex-col md:justify-center md:bg-transparent md:py-0 md:pl-14 md:pr-12 lg:pl-20 lg:pr-14 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-full max-w-[20rem] sm:max-w-md lg:max-w-[32rem]">
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

const CORNER_CLASS: Record<TextCorner, string> = {
  'top-left': 'top-0 left-0',
  'bottom-left': 'bottom-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-right': 'bottom-0 right-0',
}

function ProductSlide({
  product,
  active,
  dir,
  reduceMotion,
  featuredLabel,
  ctaLabel,
  fallbackLine,
  name,
  categoryName,
  onOpen,
}: {
  product: Product
  active: boolean
  dir: Dir
  reduceMotion: boolean
  featuredLabel: string
  ctaLabel: string
  fallbackLine: string
  name: string
  categoryName: string
  onOpen: () => void
}) {
  const discounted = product.isDiscounted && product.price > 0
  const settled = active || reduceMotion
  const motion = reduceMotion ? '' : 'transition-[opacity,transform] duration-500 ease-out'
  const textEnter = settled ? 'translate-y-0' : 'translate-y-2'

  const scene = heroSceneNumber(product)
  const place = podiumPlacement(scene)
  const cutout = productCutout(pickI18n(product.name, 'en'))
  const txt = sceneText(scene)
  const top = txt.corner === 'top-left' || txt.corner === 'top-right'

  if (!cutout && typeof console !== 'undefined') {
    console.warn(
      `[hero] no transparent cutout for "${pickI18n(product.name, 'en')}" — slide shows copy only. Add it to heroScenes.ts CUTOUTS.`,
    )
  }

  return (
    <div className="relative isolate bg-[#e7eef6]">
      <div className="relative h-[260px] w-full overflow-hidden sm:h-[320px] md:h-auto md:[aspect-ratio:2048/768]">
        <img
          src={heroSceneImage(scene)}
          alt=""
          className="h-full w-full object-cover object-[50%_78%] md:object-center"
        />

        {/* The product on the marble podium — a real transparent cutout standing
            on the stone, centred on the VISIBLE podium centre, base on the
            surface, with a tight contact shadow. No masked rectangle fallback. */}
        {cutout && (
          <div
            className="pointer-events-none absolute"
            style={{
              left: `${place.cx}%`,
              bottom: `${100 - place.baseY}%`,
              height: `clamp(150px, ${cutout.heightPct}%, 560px)`,
              transform: 'translateX(-50%)',
            }}
          >
            {/* tight contact shadow directly under the base */}
            <div className="absolute inset-x-[8%] -bottom-[1.5%] h-[3%] min-h-[6px] rounded-[50%] bg-black/40 blur-[5px]" />
            <div className="absolute inset-x-[-4%] -bottom-[1%] h-[2%] min-h-[4px] rounded-[50%] bg-black/20 blur-md" />
            <img
              src={cutout.src}
              alt={name}
              className={`relative h-full w-auto ${motion} ${
                settled ? 'scale-100 opacity-100' : 'scale-[0.97] opacity-0'
              }`}
            />
          </div>
        )}

        {/* Readability treatment — a soft gradient anchored to the text corner
            only. Never a panel; most of the scene stays fully visible. */}
        <div
          className={`pointer-events-none absolute h-[64%] w-[64%] ${CORNER_CLASS[txt.corner]}`}
          style={{
            background: `radial-gradient(ellipse at ${top ? 'top' : 'bottom'} ${
              txt.corner.endsWith('left') ? 'left' : 'right'
            }, ${
              txt.tone === 'navy'
                ? 'rgba(240,246,255,0.82) 0%, rgba(240,246,255,0.32) 46%, rgba(240,246,255,0) 78%'
                : 'rgba(8,17,38,0.64) 0%, rgba(8,17,38,0.24) 46%, rgba(8,17,38,0) 80%'
            })`,
          }}
        />

        {/* Product info — placed in this scene's negative space. Fades + small
            rise on enter, then completely still; never reacts to the mouse. */}
        <div
          dir={dir}
          className={`absolute ${CORNER_CLASS[txt.corner]} flex max-w-full flex-col gap-2 px-6 py-6 text-start sm:px-10 md:px-14 md:py-10 ${motion} ${
            settled ? 'opacity-100' : 'opacity-0'
          } ${textEnter}`}
          style={{ width: `min(92%, ${txt.maxW})` }}
        >
          {(() => {
            const navy = txt.tone === 'navy'
            const eyebrow = navy ? 'text-brand' : 'text-white/80'
            const heading = navy ? 'text-navy' : 'text-white'
            const strike = navy ? 'text-slate-400' : 'text-white/70'
            const shadow = navy ? 'md:[text-shadow:0_1px_2px_rgba(255,255,255,0.85)]' : ''
            return (
              <>
                <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${eyebrow}`}>
                  {categoryName || featuredLabel || fallbackLine}
                </span>
                <h2 className={`text-balance text-xl font-black leading-tight sm:text-2xl md:text-[2rem] ${heading} ${shadow}`}>
                  {name}
                </h2>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Money value={product.effectivePrice} className={`text-2xl font-black sm:text-3xl ${heading}`} />
                  {discounted && (
                    <Money value={product.price} className={`text-sm line-through sm:text-base ${strike}`} />
                  )}
                  <button
                    type="button"
                    onClick={onOpen}
                    tabIndex={active ? 0 : -1}
                    className="rounded-xl bg-brand px-6 py-2.5 text-sm font-extrabold text-white shadow-md shadow-brand/30 transition-[background-color,box-shadow] duration-200 hover:bg-brand-dark hover:shadow-lg sm:text-base"
                  >
                    {ctaLabel}
                  </button>
                </div>
              </>
            )
          })()}
        </div>
      </div>
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
      className={`absolute top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lg ring-1 ring-black/5 transition-colors hover:text-brand md:h-12 md:w-12 ${
        direction === 'left' ? 'left-3 md:left-5' : 'right-3 md:right-5'
      }`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={direction === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
      </svg>
    </button>
  )
}
