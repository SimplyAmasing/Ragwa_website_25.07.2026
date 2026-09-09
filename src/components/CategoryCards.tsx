import { useMemo } from 'react'
import { pickI18n, useI18n } from '../i18n'
import type { CatalogCategory, Product } from '../lib/catalog'
import { useNav } from '../lib/router'

/**
 * The 12 category artworks provided by the shop, one per category. Matched by
 * the catalog's category id (the mock uses stable slugs); a normalised
 * English-name match is the fallback for live Worker data whose ids are
 * Firestore doc ids.
 *
 * Each artwork has an Arabic label pill baked into its bottom third. The card
 * crops the image to its photo (object-top) so that pill is not shown, and
 * renders the category name as real localized text below — the site never
 * relies on text inside the images.
 */
const IMAGE_BY_SLUG: Record<string, string> = {
  'dish-kitchen-cleaning': '/categories/01.png',
  'cleaning-cleaning-tools': '/categories/02.png',
  'cleaning-gloves': '/categories/03.png',
  'air-fresheners-home-fragrance': '/categories/04.png',
  'home-accessories': '/categories/05.png',
  'disposable-kitchen-accessories': '/categories/06.png',
  'laundry-fabric-care': '/categories/07.png',
  'personal-care': '/categories/08.png',
  'paper-paper-products': '/categories/09.png',
  'trash-bags': '/categories/10.png',
  'household-cleaners': '/categories/11.png',
  'car-care-cleaning': '/categories/12.png',
}

const IMAGE_BY_EN_KEYWORD: [test: (name: string) => boolean, src: string][] = [
  [n => n.includes('dish'), '/categories/01.png'],
  [n => n.includes('cleaning tool') || n.includes('cleaning & cleaning'), '/categories/02.png'],
  [n => n.includes('glove'), '/categories/03.png'],
  [n => n.includes('air fresh') || n.includes('fragrance'), '/categories/04.png'],
  [n => n.includes('home access') || n.includes('household supp'), '/categories/05.png'],
  [n => n.includes('disposable'), '/categories/06.png'],
  [n => n.includes('laundry') || n.includes('fabric care'), '/categories/07.png'],
  [n => n.includes('personal care'), '/categories/08.png'],
  [n => n.includes('paper'), '/categories/09.png'],
  [n => n.includes('trash') || n.includes('garbage'), '/categories/10.png'],
  [n => n.includes('household cleaner'), '/categories/11.png'],
  [n => n.includes('car'), '/categories/12.png'],
]

function categoryImage(cat: CatalogCategory): string | null {
  if (IMAGE_BY_SLUG[cat.id]) return IMAGE_BY_SLUG[cat.id]
  const en = pickI18n(cat.name, 'en').toLowerCase()
  for (const [test, src] of IMAGE_BY_EN_KEYWORD) {
    if (test(en)) return src
  }
  return null
}

export function CategoryCards({ categories, products }: { categories: CatalogCategory[]; products: Product[] }) {
  const { t, tr } = useI18n()
  const navigate = useNav()

  const countByCategory = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of products) {
      if (p.categoryId) map.set(p.categoryId, (map.get(p.categoryId) ?? 0) + 1)
    }
    return map
  }, [products])

  const shown = categories.filter(c => categoryImage(c))
  if (shown.length === 0) return null

  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-navy sm:text-3xl">{t.categories.heading}</h2>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">{t.categories.subheading}</p>
          </div>
          <button
            onClick={() => navigate({ name: 'catalog' })}
            className="flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold text-brand transition hover:bg-blue-50"
          >
            {t.categories.viewAll}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {shown.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate({ name: 'catalog', category: cat.id })}
              aria-label={tr(cat.name)}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-md hover:ring-blue-200"
            >
              {/* Cropped to the photo — the artwork's baked Arabic label pill sits
                  in the bottom third and is intentionally out of frame. */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={categoryImage(cat)!}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col items-center gap-0.5 px-2 py-3">
                <span className="line-clamp-2 text-center text-sm font-bold text-navy">{tr(cat.name)}</span>
                <span className="text-xs font-semibold text-slate-400">
                  {t.categories.countProducts(countByCategory.get(cat.id) ?? 0)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
