import { useState } from 'react'
import { useI18n } from '../i18n'
import { useCart } from '../lib/cart'
import type { Product } from '../lib/catalog'
import { useNav } from '../lib/router'
import { extractSize } from '../lib/size'
import { useWishlist } from '../lib/wishlist'
import { CartIcon, CheckIcon, HeartIcon } from '../ui/icons'
import { Money } from '../ui/primitives'
import { ProductImage } from './ProductImage'

export function ProductCard({ product }: { product: Product }) {
  const { t, tr } = useI18n()
  const { add } = useCart()
  const wishlist = useWishlist()
  const navigate = useNav()
  const [added, setAdded] = useState(false)

  const name = tr(product.name)
  const size = extractSize(name)
  const soldOut = product.stock === 0
  const discountPct =
    product.isDiscounted && product.price > 0
      ? Math.round((1 - product.effectivePrice / product.price) * 100)
      : 0
  const wished = wishlist.has(product.linkId)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    add(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article
      onClick={() => navigate({ name: 'product', id: product.linkId })}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg hover:shadow-brand/10"
    >
      <div className="relative bg-white">
        <button
          type="button"
          onClick={e => {
            e.stopPropagation()
            wishlist.toggle(product.linkId)
          }}
          aria-label={t.header.wishlist}
          aria-pressed={wished}
          className="absolute start-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-400 shadow-sm backdrop-blur transition hover:text-red-500"
        >
          <HeartIcon size={16} filled={wished} />
        </button>

        {discountPct > 0 && (
          <span
            className="absolute end-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-extrabold text-white"
            style={{ animation: 'badgePop 0.4s cubic-bezier(0.22,0.68,0,1.2) both' }}
          >
            {t.products.discountOff(discountPct)}
          </span>
        )}
        {soldOut && (
          <span className="absolute inset-x-0 bottom-0 z-10 bg-slate-900/70 py-1.5 text-center text-xs font-bold text-white">
            {t.products.outOfStock}
          </span>
        )}

        <div className="aspect-square">
          <ProductImage
            urls={product.imageUrls}
            alt={name}
            className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 px-4 pt-3">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-800">{name}</h3>
        {size && <span className="text-xs font-medium text-slate-400">{size}</span>}
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <Money value={product.effectivePrice} className="text-lg font-black text-brand" />
          {discountPct > 0 && (
            <Money value={product.price} className="text-xs text-slate-400 line-through" />
          )}
        </div>
      </div>

      <div className="p-4 pt-3">
        <button
          type="button"
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
