import type { Product } from './catalog'
import { pickI18n } from '../i18n'

/**
 * The hero carousel's products.
 *
 * For now this is a manual pick of 5 recognisable products with clean pack
 * shots — there are no sales yet. Matching is by English name fragment so the
 * same picks resolve whether the catalog comes from the Worker or the local
 * mock (English names are identical in both). If a matcher finds nothing, the
 * list is padded from the front of the catalog so the carousel always has 5.
 *
 * LATER: when order data exists, this becomes "top 5 best-sellers". That needs
 * an order-count per item, which the Worker does not expose today — adding it
 * is a chekchak-worker change, so it must be raised before being built. Until
 * then, edit FEATURED_NAME_MATCHERS here.
 */
// Chosen to span five different categories so each hero product slide gets a
// distinct podium background (see heroScenes.ts). Still a manual preview pick —
// there is no sales ranking available to the frontend yet.
const FEATURED_NAME_MATCHERS: string[] = [
  'Palmolive Classic', // Dish & Kitchen Cleaning  → scene 1
  'Maxima Fabric Softener 40 Washes', // Laundry & Fabric Care    → scene 7
  'Head & Shoulders Menthol Shampoo XXL', // Personal Care            → scene 8
  'Durgol Forte Limescale Remover', // Household Cleaners       → scene 11
  'Air Wick Electric Air Freshener', // Air Fresheners           → scene 4
]

const FEATURED_COUNT = 5

/** The 5 hero-carousel products (slides 2–6). */
export function pickFeatured(products: Product[]): Product[] {
  if (products.length === 0) return []

  const picked: Product[] = []
  const used = new Set<string>()

  for (const matcher of FEATURED_NAME_MATCHERS) {
    const needle = matcher.toLowerCase()
    const hit = products.find(
      p => !used.has(p.linkId) && pickI18n(p.name, 'en').toLowerCase().includes(needle),
    )
    if (hit) {
      picked.push(hit)
      used.add(hit.linkId)
    }
  }

  for (const p of products) {
    if (picked.length >= FEATURED_COUNT) break
    if (!used.has(p.linkId)) {
      picked.push(p)
      used.add(p.linkId)
    }
  }

  return picked.slice(0, FEATURED_COUNT)
}

/**
 * The "Featured Products" section — a wider hand-picked set. Spreads across
 * categories (one pass taking the first product of each category, then filling
 * from the rest) so the row is not all laundry. Excludes anything in `exclude`
 * (the on-sale rail) to avoid repeating cards.
 */
export function pickFeaturedSection(products: Product[], exclude: Set<string>, count = 12): Product[] {
  const available = products.filter(p => !exclude.has(p.linkId))
  const picked: Product[] = []
  const used = new Set<string>()
  const seenCategory = new Set<string>()

  for (const p of available) {
    if (picked.length >= count) break
    const key = p.categoryId ?? '—'
    if (seenCategory.has(key)) continue
    seenCategory.add(key)
    picked.push(p)
    used.add(p.linkId)
  }
  for (const p of available) {
    if (picked.length >= count) break
    if (!used.has(p.linkId)) {
      picked.push(p)
      used.add(p.linkId)
    }
  }
  return picked.slice(0, count)
}
