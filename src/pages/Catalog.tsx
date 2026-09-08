import { useMemo, useState } from 'react'
import { pickI18n, useI18n } from '../i18n'
import { useCatalog } from '../lib/catalogStore'
import { useNav, type Route } from '../lib/router'
import { SearchIcon } from '../ui/icons'
import { ProductCard } from '../components/ProductCard'
import { EmptyBlock, ErrorBlock, LoadingBlock } from '../components/StateBlock'

type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'name'

export function CatalogPage({ route }: { route: Extract<Route, { name: 'catalog' }> }) {
  const { t, tr, locale } = useI18n()
  const { status, products, categories } = useCatalog()
  const navigate = useNav()

  const [sort, setSort] = useState<SortKey>('relevance')
  const [maxPrice, setMaxPrice] = useState<number | null>(null)

  const category = route.category
  const search = route.search ?? ''

  const priceCeiling = useMemo(
    () => Math.max(10, Math.ceil(products.reduce((m, p) => Math.max(m, p.effectivePrice), 0))),
    [products],
  )

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase()
    const cap = maxPrice ?? priceCeiling
    const result = products.filter(p => {
      if (category && p.categoryId !== category) return false
      if (p.effectivePrice > cap) return false
      if (needle) {
        const haystack = `${pickI18n(p.name, locale)} ${pickI18n(p.name, 'en')} ${p.brand}`.toLowerCase()
        if (!haystack.includes(needle)) return false
      }
      return true
    })
    result.sort((a, b) => {
      if (sort === 'price-asc') return a.effectivePrice - b.effectivePrice
      if (sort === 'price-desc') return b.effectivePrice - a.effectivePrice
      if (sort === 'name') return pickI18n(a.name, locale).localeCompare(pickI18n(b.name, locale))
      return 0
    })
    return result
  }, [products, category, search, maxPrice, priceCeiling, sort, locale])

  const setCategory = (id: string | undefined) => {
    navigate({ name: 'catalog', category: id, search: search || undefined })
  }

  return (
    <div className="min-h-[70vh] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-1 text-3xl font-black text-slate-900">{t.nav.catalog}</h1>
        <p className="mb-8 text-slate-500">{t.products.subheading}</p>

        <div className="grid gap-7 lg:grid-cols-[260px_1fr]">
          {/* Filters */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-base font-extrabold text-slate-900">{t.products.filters}</h2>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  {t.header.searchPlaceholder}
                </label>
                <div className="relative">
                  <input
                    type="search"
                    value={search}
                    onChange={e =>
                      navigate({ name: 'catalog', category, search: e.target.value || undefined })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 ps-4 pe-9 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                  />
                  <span className="absolute inset-y-0 end-3 grid place-items-center text-slate-400">
                    <SearchIcon size={14} />
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  {t.categories.heading}
                </label>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setCategory(undefined)}
                    className={`rounded-lg px-3 py-2 text-start text-sm transition ${
                      !category ? 'bg-blue-50 font-bold text-brand' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t.categories.all}
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`rounded-lg px-3 py-2 text-start text-sm transition ${
                        category === cat.id ? 'bg-blue-50 font-bold text-brand' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {tr(cat.name)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  {t.products.priceRange(0, maxPrice ?? priceCeiling)}
                </label>
                <input
                  type="range"
                  min={1}
                  max={priceCeiling}
                  value={maxPrice ?? priceCeiling}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand"
                />
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-500">{t.products.found(filtered.length)}</span>
              <label className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-slate-600">{t.products.sort}</span>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as SortKey)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand"
                >
                  <option value="relevance">{t.products.sortRelevance}</option>
                  <option value="price-asc">{t.products.sortPriceAsc}</option>
                  <option value="price-desc">{t.products.sortPriceDesc}</option>
                  <option value="name">{t.products.sortName}</option>
                </select>
              </label>
            </div>

            {status === 'loading' || status === 'idle' ? (
              <LoadingBlock />
            ) : status === 'error' ? (
              <ErrorBlock />
            ) : filtered.length === 0 ? (
              <EmptyBlock />
            ) : (
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p, i) => (
                  <div key={p.linkId} className="anim-fade-up" style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
