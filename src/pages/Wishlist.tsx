import { useI18n } from '../i18n'
import { useCatalog } from '../lib/catalogStore'
import { useNav } from '../lib/router'
import { useWishlist } from '../lib/wishlist'
import { HeartIcon } from '../ui/icons'
import { RippleButton } from '../ui/primitives'
import { ProductCard } from '../components/ProductCard'
import { LoadingBlock } from '../components/StateBlock'

export function WishlistPage() {
  const { t } = useI18n()
  const { status, products } = useCatalog()
  const { ids } = useWishlist()
  const navigate = useNav()

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="min-h-[65vh] bg-slate-50">
        <LoadingBlock />
      </div>
    )
  }

  const order = new Map(ids.map((id, i) => [id, i]))
  const saved = products
    .filter(p => order.has(p.linkId))
    .sort((a, b) => (order.get(a.linkId) ?? 0) - (order.get(b.linkId) ?? 0))

  return (
    <div className="min-h-[65vh] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 flex items-center gap-2 text-3xl font-black text-slate-900">
          <HeartIcon size={24} filled /> {t.wishlist.title}
        </h1>

        {saved.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="text-6xl">🤍</div>
            <h2 className="text-xl font-bold text-slate-700">{t.wishlist.empty}</h2>
            <p className="text-slate-400">{t.wishlist.emptyHint}</p>
            <RippleButton
              onClick={() => navigate({ name: 'catalog' })}
              className="rounded-2xl bg-brand px-8 py-3.5 text-base font-extrabold text-white shadow-lg shadow-brand/30"
            >
              {t.wishlist.browse}
            </RippleButton>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {saved.map(p => (
              <ProductCard key={p.linkId} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
