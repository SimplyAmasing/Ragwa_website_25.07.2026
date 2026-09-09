import { pickI18n, type Strings } from '../i18n'
import type { Product } from './catalog'

/**
 * Scene mapping kept for reference — the product hero slides now use a fully
 * composed background per product (see HERO_PRODUCTS below), the same technique
 * as the approved Air Wick hero: the enhanced product is integrated into its
 * category scene by the approved reference art, and only the information layer
 * (logo, headline, support, three benefits, Shop-Now CTA) is real localised HTML
 * on top. There are no prices anywhere on these slides.
 */

const SCENE_BY_SLUG: Record<string, number> = {
  'dish-kitchen-cleaning': 1,
  'cleaning-cleaning-tools': 2,
  'cleaning-gloves': 3,
  'air-fresheners-home-fragrance': 4,
  'home-accessories': 5,
  'disposable-kitchen-accessories': 6,
  'laundry-fabric-care': 7,
  'personal-care': 8,
  'paper-paper-products': 9,
  'trash-bags': 10,
  'household-cleaners': 11,
  'car-care-cleaning': 12,
}

const SCENE_BY_EN_KEYWORD: [test: (name: string) => boolean, scene: number][] = [
  [n => n.includes('dish'), 1],
  [n => n.includes('cleaning tool') || n.includes('cleaning & cleaning'), 2],
  [n => n.includes('glove'), 3],
  [n => n.includes('air fresh') || n.includes('fragrance'), 4],
  [n => n.includes('home access') || n.includes('household supp') || n.includes('essential'), 5],
  [n => n.includes('disposable'), 6],
  [n => n.includes('laundry') || n.includes('fabric care'), 7],
  [n => n.includes('personal care'), 8],
  [n => n.includes('paper'), 9],
  [n => n.includes('trash') || n.includes('garbage'), 10],
  [n => n.includes('household cleaner'), 11],
  [n => n.includes('car'), 12],
]

/** The scene number (1–12) for a product's category. Defaults to 11. */
export function heroSceneNumber(product: Product): number {
  if (product.categoryId && SCENE_BY_SLUG[product.categoryId]) return SCENE_BY_SLUG[product.categoryId]
  const en = pickI18n(product.categoryName, 'en').toLowerCase()
  for (const [test, scene] of SCENE_BY_EN_KEYWORD) {
    if (test(en)) return scene
  }
  return 11
}

export function heroSceneImage(scene: number): string {
  return `/hero/scenes/${String(scene).padStart(2, '0')}.png`
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-product hero definitions for the five product slides (slides 2–6).
//
// `bg` is the approved composed reference art with its baked marketing text
// painted out — the enhanced product is already integrated on its podium there
// (correct scale, contact shadow, props, lighting). The HTML info layer (brand
// logo + product-specific localised headline + one support line + three benefit
// circles + Shop-Now CTA) sits on the clean left area, positioned to match the
// reference. Air Wick keeps its own approved layout and Ragwa-blue accent.
// ─────────────────────────────────────────────────────────────────────────────

export type HeroProductKey = keyof Strings['hero']['products']

export type BenefitIcon =
  | 'grease' | 'sparkle' | 'derma' // Palmolive
  | 'flower' | 'drops' | 'washes' // Maxima
  | 'shield' | 'mint' | 'daily' // Head & Shoulders
  | 'crystal' | 'bolt' | 'swiss' // Durgol
  | 'leaf' | 'home' | 'clock' // Air Wick
  | 'plates' | 'shirt' | 'strand' | 'toilet' // extra reference icons

export interface HeroAccent {
  /** icon colour */ fg: string
  /** CTA background + hover */ bg: string
}

export interface HeroProduct {
  key: HeroProductKey
  /** English-name fragment that identifies the catalog product. */
  match: string
  /** Authentic brand mark asset (extracted from the approved reference art),
   *  or `null` to fall back to the brand name as text. */
  logo: string | null
  brand: string
  /** Full composed background (approved reference art, baked text removed). */
  bg: string
  /** Rendered logo height, responsive Tailwind `h-*` classes, sized per brand
   *  to visually match that hero's own reference (never one universal size). */
  logoH: string
  /** Headline size, responsive, sized per reference (Air Wick's is one big line;
   *  the others are two lines). */
  headlineSize: string
  /** Air Wick's reference puts the CTA above the benefit row. */
  ctaFirst?: boolean
  /** Icon colour + CTA colour. Air Wick omits it → Ragwa blue. */
  accent?: HeroAccent
  benefitIcons: [BenefitIcon, BenefitIcon, BenefitIcon]
}

const HERO_PRODUCTS: HeroProduct[] = [
  {
    key: 'palmolive',
    match: 'palmolive classic',
    logo: '/hero/logos/palmolive.png',
    brand: 'Palmolive',
    bg: '/hero/products/palmolive-scene.png',
    logoH: 'h-10 md:h-[2.9rem] lg:h-[3.7rem] xl:h-[4.4rem]',
    headlineSize: 'text-[1.35rem] md:text-[1.5rem] lg:text-[1.7rem] xl:text-[1.9rem]',
    accent: { fg: 'text-[#1f6b45]', bg: 'bg-[#1f6b45] hover:bg-[#184f34]' },
    benefitIcons: ['grease', 'plates', 'derma'],
  },
  {
    key: 'maxima',
    match: 'maxima fabric softener',
    logo: '/hero/logos/maxima.png',
    brand: 'Maxima',
    bg: '/hero/products/maxima-scene.png',
    logoH: 'h-11 md:h-[3.4rem] lg:h-[4.3rem] xl:h-[5.2rem]',
    headlineSize: 'text-[1.35rem] md:text-[1.5rem] lg:text-[1.7rem] xl:text-[1.9rem]',
    accent: { fg: 'text-[#1554c8]', bg: 'bg-[#1554c8] hover:bg-[#0f429e]' },
    benefitIcons: ['flower', 'drops', 'shirt'],
  },
  {
    key: 'headShoulders',
    match: 'head & shoulders menthol',
    logo: '/hero/logos/head-shoulders.png',
    brand: 'Head & Shoulders',
    bg: '/hero/products/hs-scene.png',
    logoH: 'h-10 md:h-[2.9rem] lg:h-[3.6rem] xl:h-[4.3rem]',
    headlineSize: 'text-[1.3rem] md:text-[1.45rem] lg:text-[1.62rem] xl:text-[1.8rem]',
    accent: { fg: 'text-[#1a63c4]', bg: 'bg-[#1a63c4] hover:bg-[#144e9c]' },
    benefitIcons: ['shield', 'mint', 'strand'],
  },
  {
    key: 'durgol',
    match: 'durgol forte',
    logo: '/hero/logos/durgol.png',
    brand: 'durgol',
    bg: '/hero/products/durgol-scene.png',
    logoH: 'h-12 md:h-[3.8rem] lg:h-[4.9rem] xl:h-[6.1rem]',
    headlineSize: 'text-[1.3rem] md:text-[1.5rem] lg:text-[1.7rem] xl:text-[1.95rem]',
    accent: { fg: 'text-[#123a6b]', bg: 'bg-[#123a6b] hover:bg-[#0d2b50]' },
    benefitIcons: ['shield', 'sparkle', 'toilet'],
  },
  {
    key: 'airwick',
    match: 'air wick electric',
    logo: '/hero/logos/airwick.png',
    brand: 'Air Wick',
    bg: '/hero/products/air-wick-scene.png',
    logoH: 'h-14 md:h-[3.7rem] lg:h-[4.7rem] xl:h-[5.6rem]',
    headlineSize: 'text-[1.6rem] md:text-[1.8rem] lg:text-[2rem] xl:text-[2.3rem]',
    ctaFirst: true,
    benefitIcons: ['leaf', 'home', 'clock'],
  },
]

/** The hero definition for a product, matched by English name fragment. */
export function heroProduct(nameEn: string): HeroProduct | null {
  const n = nameEn.toLowerCase()
  return HERO_PRODUCTS.find(p => n.includes(p.match)) ?? null
}
