import { pickI18n } from '../i18n'
import type { Product } from './catalog'

/**
 * The 12 photographed "podium in a themed room" backgrounds for the hero
 * PRODUCT slides (slides 2–6). One per catalog category, by the fixed mapping:
 *
 *   1 Dish & Kitchen Cleaning      7 Laundry & Fabric Care
 *   2 Cleaning & Cleaning Tools    8 Personal Care
 *   3 Cleaning Gloves              9 Paper & Paper Products
 *   4 Air Fresheners               10 Trash Bags
 *   5 Home / Household Essentials   11 Household Cleaners
 *   6 Disposable Products          12 Car Care
 *
 * These are the HERO's images only — the homepage Main Categories section keeps
 * its own separate card artwork.
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

/**
 * Where the product stands on that scene's marble podium. Measured off each
 * background with a coordinate-grid overlay: `cx` is the VISIBLE CENTRE of the
 * marble podium (%, not the slide centre — every podium sits differently in its
 * artwork), `baseY` is the podium's top surface (% from the top) so the product
 * base rests on the stone. Scenes not listed use a sensible centre default.
 */
export interface PodiumPlacement {
  cx: number
  baseY: number
}

const PLACEMENT: Record<number, PodiumPlacement> = {
  1: { cx: 59, baseY: 74 }, // Palmolive — podium sits right of centre
  4: { cx: 63, baseY: 73 }, // Air Wick — living-room podium, well right of centre
  7: { cx: 51, baseY: 71 }, // Maxima — wide laundry-room podium
  8: { cx: 49, baseY: 71 }, // Head & Shoulders — bathroom podium
  11: { cx: 50, baseY: 71 }, // Durgol — utility-room podium
}

export function podiumPlacement(scene: number): PodiumPlacement {
  return PLACEMENT[scene] ?? { cx: 50, baseY: 70 }
}

/**
 * Per-scene copy placement. Each background has its own negative space, so the
 * text corner and tone vary while the typographic system stays the same.
 * Scenes without an entry fall back to a white bottom band.
 */
/** Physical corner (the scenes never mirror) where a scene's copy sits. */
export type TextCorner = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right'
export interface SceneText {
  corner: TextCorner
  tone: 'navy' | 'white'
  maxW: string
}

const SCENE_TEXT: Record<number, SceneText> = {
  1: { corner: 'top-left', tone: 'navy', maxW: '27rem' }, // podium right → copy top-left
  4: { corner: 'bottom-left', tone: 'navy', maxW: '26rem' }, // Air Wick: open floor, lower-left
  7: { corner: 'top-right', tone: 'navy', maxW: '27rem' }, // Maxima: podium centre-left → top-right
  8: { corner: 'top-left', tone: 'navy', maxW: '26rem' }, // Head & Shoulders: soft window light upper-left
  11: { corner: 'bottom-left', tone: 'navy', maxW: '27rem' }, // Durgol: clear lower-left tiling
}

export function sceneText(scene: number): SceneText {
  return SCENE_TEXT[scene] ?? { corner: 'bottom-left', tone: 'white', maxW: '32rem' }
}

/**
 * Hand-made transparent cutouts of the five hero products, each isolated from
 * its real catalog pack-shot's white canvas by a border flood-fill (only the
 * background connected to the image edge is removed — printed white on the
 * packaging, caps, labels, Hebrew text, logos and shape are all preserved;
 * cutout scripts are kept out of the bundle). Every hero product slide uses one
 * of these — there is no masked-rectangle fallback any more. If a featured
 * product is swapped for one with no entry here, ProductSlide renders the copy
 * only and logs a warning rather than showing a raw pack-shot.
 *
 * For Air Wick the WHOLE retail blister pack is kept (card + device), not just
 * the internal refill.
 *
 * `heightPct` — product height as a % of the slide, tuned per packaging shape.
 */
export interface ProductCutout {
  src: string
  heightPct: number
}

const CUTOUTS: { match: string; cutout: ProductCutout }[] = [
  { match: 'palmolive classic', cutout: { src: '/hero/products/palmolive.png', heightPct: 63 } },
  { match: 'maxima fabric softener', cutout: { src: '/hero/products/maxima.png', heightPct: 63 } },
  { match: 'head & shoulders menthol', cutout: { src: '/hero/products/head-shoulders.png', heightPct: 63 } },
  { match: 'durgol forte', cutout: { src: '/hero/products/durgol.png', heightPct: 62 } },
  { match: 'air wick electric', cutout: { src: '/hero/products/air-wick.png', heightPct: 58 } },
]

export function productCutout(nameEn: string): ProductCutout | null {
  const n = nameEn.toLowerCase()
  for (const { match, cutout } of CUTOUTS) {
    if (n.includes(match)) return cutout
  }
  return null
}
