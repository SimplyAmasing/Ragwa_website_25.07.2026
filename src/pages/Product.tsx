import { useMemo, useState } from 'react'
import { useI18n } from '../i18n'
import { useCart } from '../lib/cart'
import { useCatalog } from '../lib/catalogStore'
import { useNav } from '../lib/router'
import { ArrowForwardIcon, CartIcon, CheckIcon, MinusIcon, PlusIcon } from '../ui/icons'
import { Money, RippleButton } from '../ui/primitives'
import { ProductImage } from '../components/ProductImage'
import { ProductCard } from '../components/ProductCard'
import { LoadingBlock } from '../components/StateBlock'

export function ProductPage({ linkId }: { linkId: string }) {
  const { t, tr } = useI18n()
  const { status, products } = useCatalog()
  const { add } = useCart()
  const navigate = useNav()

  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [tab, setTab] = useState<'description' | 'details'>('description')

  const product = useMemo(() => products.find(p => p.linkId === linkId), [products, linkId])
  const related = useMemo(
    () => (product ? products.filter(p => p.linkId !== product.linkId && p.categoryId === product.categoryId).slice(0, 4) : []),
    [products, product],
  )

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="min-h-[70vh] bg-slate-50">
        <LoadingBlock />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
        <div className="text-5xl">🧼</div>
        <p className="text-lg font-bold text-slate-600">{t.products.empty}</p>
        <button
          onClick={() => navigate({ name: 'catalog' })}
          className="rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white"
        >
          {t.nav.catalog}
        </button>
      </div>
    )
  }

  const name = tr(product.name)
  const description = tr(product.description)
  const soldOut = product.stock === 0

  const handleAdd = () => {
    add(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const details: [string, string][] = [
    [t.product.fieldCategory, tr(product.categoryName)],
    [t.product.fieldBrand, product.brand],
    [t.product.fieldBarcode, product.barcode],
    [t.product.fieldWeight, product.weightGrams ? `${product.weightGrams} ${t.product.grams}` : ''],
  ]

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-6 flex items-center gap-1.5 text-[13px] text-slate-400">
          <button onClick={() => navigate({ name: 'home' })} className="font-semibold text-brand">
            {t.nav.home}
          </button>
          <ArrowForwardIcon size={13} />
          <button onClick={() => navigate({ name: 'catalog' })} className="font-semibold text-brand">
            {t.nav.catalog}
          </button>
          <ArrowForwardIcon size={13} />
          <span className="line-clamp-1">{name}</span>
        </nav>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-9">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
              <ProductImage urls={product.imageUrls} alt={name} className="aspect-square w-full object-contain p-6" />
            </div>

            <div className="flex flex-col gap-5">
              {product.brand && (
                <div className="text-xs font-bold uppercase tracking-wide text-slate-400">{product.brand}</div>
              )}
              <h1 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">{name}</h1>

              <div className="flex items-baseline gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <Money value={product.effectivePrice} className="text-3xl font-black text-brand" />
                {product.isDiscounted && (
                  <Money value={product.price} className="text-base text-slate-300 line-through" />
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="inline-flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="grid h-11 w-11 place-items-center text-slate-600 hover:bg-slate-50"
                    aria-label="-"
                  >
                    <MinusIcon />
                  </button>
                  <span className="w-11 text-center text-base font-extrabold text-slate-900">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="grid h-11 w-11 place-items-center text-slate-600 hover:bg-slate-50"
                    aria-label="+"
                  >
                    <PlusIcon />
                  </button>
                </div>
                <span
                  className={`flex items-center gap-1.5 text-sm font-bold ${soldOut ? 'text-red-500' : 'text-green-600'}`}
                >
                  {!soldOut && <CheckIcon size={15} />}
                  {soldOut ? t.products.outOfStock : t.products.inStock}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <RippleButton
                  onClick={handleAdd}
                  disabled={soldOut}
                  className={`flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-extrabold text-white transition disabled:cursor-not-allowed disabled:bg-slate-300 ${
                    added ? 'bg-green-600' : 'bg-brand hover:bg-brand-dark'
                  }`}
                >
                  {added ? (
                    <>
                      <CheckIcon /> {t.products.added}
                    </>
                  ) : (
                    <>
                      <CartIcon size={18} /> {t.products.addToCart}
                    </>
                  )}
                </RippleButton>
                <RippleButton
                  onClick={() => {
                    add(product, qty)
                    navigate({ name: 'cart' })
                  }}
                  disabled={soldOut}
                  className="rounded-2xl bg-slate-900 px-6 py-4 text-base font-extrabold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {t.product.buyNow}
                </RippleButton>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-100 pt-8">
            <div className="mb-5 flex gap-2">
              {(['description', 'details'] as const).map(key => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`rounded-xl px-6 py-2.5 text-sm font-bold transition ${
                    tab === key ? 'bg-brand text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {key === 'description' ? t.product.tabDescription : t.product.tabDetails}
                </button>
              ))}
            </div>
            {tab === 'description' ? (
              <p className="leading-relaxed text-slate-600">{description || t.product.noDescription}</p>
            ) : (
              <div className="grid gap-2.5 sm:grid-cols-2">
                {details
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                    >
                      <span className="text-slate-400">{k}</span>
                      <span className="font-bold text-slate-800">{v}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-5 text-xl font-black text-slate-900">{t.product.related}</h2>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {related.map(p => (
                <ProductCard key={p.linkId} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
