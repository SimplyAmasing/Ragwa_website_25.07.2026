import { useI18n } from '../i18n'
import { useCatalog } from '../lib/catalogStore'
import { useNav } from '../lib/router'
import { CartIcon } from '../ui/icons'
import { RippleButton, useInView } from '../ui/primitives'
import { CategoryChips } from '../components/CategoryChips'
import { ProductCard } from '../components/ProductCard'
import { ErrorBlock, LoadingBlock } from '../components/StateBlock'

function Hero() {
  const { t } = useI18n()
  const navigate = useNav()
  const { ref, inView } = useInView(0.1)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-50/60 to-white px-4 py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute -top-24 -end-16 h-96 w-96 rounded-full bg-brand/5" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div className={inView ? 'anim-fade-up flex flex-col gap-5' : 'flex flex-col gap-5 opacity-0'}>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-[13px] font-bold text-brand shadow-sm">
            <span
              className="inline-block h-2 w-2 rounded-full bg-brand"
              style={{ animation: 'dotPulse 1.8s ease-in-out infinite' }}
            />
            {t.hero.badge}
          </span>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            {t.hero.titleTop}
            <br />
            <span className="text-brand">{t.hero.titleBottom}</span>
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-slate-500">{t.hero.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <RippleButton
              onClick={() => navigate({ name: 'catalog' })}
              className="flex items-center gap-2 rounded-2xl bg-brand px-7 py-3.5 text-base font-extrabold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark"
            >
              <CartIcon size={18} /> {t.hero.ctaOrder}
            </RippleButton>
            <button
              onClick={() => navigate({ name: 'catalog' })}
              className="rounded-2xl border-2 border-brand px-7 py-3.5 text-base font-bold text-brand transition hover:bg-blue-50"
            >
              {t.hero.ctaBrowse}
            </button>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-[13px] font-semibold text-slate-600">
            <span>✅ {t.hero.trust1}</span>
            <span>✅ {t.hero.trust2}</span>
            <span>✅ {t.hero.trust3}</span>
          </div>
        </div>

        <div className={inView ? 'anim-scale-in' : 'opacity-0'}>
          <div className="aspect-square w-full overflow-hidden rounded-3xl shadow-2xl shadow-brand/15">
            <img
              src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=900&h=900&fit=crop&auto=format"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  const { t } = useI18n()
  const { status, products, categories } = useCatalog()
  const navigate = useNav()

  const featured = products.slice(0, 8)

  return (
    <>
      <Hero />

      {categories.length > 0 && (
        <section className="bg-slate-50 px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{t.categories.heading}</h2>
                <p className="mt-1 text-slate-500">{t.categories.subheading}</p>
              </div>
              <button
                onClick={() => navigate({ name: 'catalog' })}
                className="shrink-0 rounded-lg px-3 py-2 text-sm font-bold text-brand transition hover:bg-blue-50"
              >
                {t.categories.viewAll}
              </button>
            </div>
            <CategoryChips
              categories={categories}
              onSelect={id => navigate({ name: 'catalog', category: id })}
            />
          </div>
        </section>
      )}

      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{t.products.featured}</h2>
            <p className="mt-1 text-slate-500">{t.products.subheading}</p>
          </div>

          {status === 'loading' || status === 'idle' ? (
            <LoadingBlock />
          ) : status === 'error' ? (
            <ErrorBlock />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {featured.map((p, i) => (
                  <div key={p.linkId} className="anim-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
              {products.length > featured.length && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => navigate({ name: 'catalog' })}
                    className="rounded-2xl border-2 border-brand px-8 py-3 text-sm font-bold text-brand transition hover:bg-blue-50"
                  >
                    {t.categories.viewAll} · {t.products.found(products.length)}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
