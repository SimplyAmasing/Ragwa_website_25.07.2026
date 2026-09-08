import { useState } from 'react'
import { useI18n } from '../i18n'
import { useCart } from '../lib/cart'
import type { Product } from '../lib/catalog'
import { useNav } from '../lib/router'
import { CartIcon, CheckIcon } from '../ui/icons'
import { Money } from '../ui/primitives'
import { ProductImage } from './ProductImage'

export function ProductCard({ product, animDelay = 0 }: { product: Product; animDelay?: number }) {
  const { t, tr } = useI18n()
  const { add } = useCart()
  const navigate = useNav()
  const [added, setAdded] = useState(false)

  const name = tr(product.name)
  const soldOut = product.stock === 0
  const discountPct =
    product.isDiscounted && product.price > 0
      ? Math.round((1 - product.effectivePrice / product.price) * 100)
      : 0

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    add(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article
      onClick={() => navigate({ name: 'product', id: product.linkId })}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/10"
      style={{ animationDelay: `${animDelay}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <ProductImage
          urls={product.imageUrls}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discountPct > 0 && (
          <span
            className="absolute top-3 end-3 rounded-lg bg-red-500 px-2 py-0.5 text-xs font-extrabold text-white"
            style={{ animation: 'badgePop 0.4s cubic-bezier(0.22,0.68,0,1.2) both' }}
          >
            -{discountPct}%
          </span>
        )}
        {soldOut && (
          <span className="absolute inset-x-0 bottom-0 bg-slate-900/70 py-1.5 text-center text-xs font-bold text-white">
            {t.products.outOfStock}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {product.brand && (
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{product.brand}</div>
        )}
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-800">{name}</h3>
        <div className="mt-1 flex items-baseline gap-2">
          <Money value={product.effectivePrice} className="text-xl font-black text-brand" />
          {product.isDiscounted && (
            <Money value={product.price} className="text-xs text-slate-300 line-through" />
          )}
        </div>
      </div>

      <div className="p-4 pt-0">
        <button
          onClick={handleAdd}
          disabled={soldOut}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:bg-slate-300 ${
            added ? 'bg-green-600' : 'bg-brand hover:bg-brand-dark'
          }`}
        >
          {added ? (
            <>
              <CheckIcon size={15} /> {t.products.added}
            </>
          ) : (
            <>
              <CartIcon size={15} /> {t.products.addToCart}
            </>
          )}
        </button>
      </div>
    </article>
  )
}
