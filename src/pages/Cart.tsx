import { useI18n } from '../i18n'
import { useCart } from '../lib/cart'
import { addMoney, formatMoney, multiplyMoney } from '../lib/money'
import { useNav } from '../lib/router'
import { deliveryFeeFor, FREE_DELIVERY_THRESHOLD } from '../lib/shipping'
import { MinusIcon, PlusIcon, TrashIcon, TruckIcon } from '../ui/icons'
import { Money, RippleButton } from '../ui/primitives'
import { ProductImage } from '../components/ProductImage'

export function CartPage() {
  const { t, tr } = useI18n()
  const { lines, subtotal, setQuantity, remove } = useCart()
  const navigate = useNav()

  if (lines.length === 0) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
        <div className="text-6xl" style={{ animation: 'floatY 3s ease-in-out infinite' }}>
          🛒
        </div>
        <h2 className="text-2xl font-black text-slate-900">{t.cart.empty}</h2>
        <p className="text-slate-400">{t.cart.emptyHint}</p>
        <RippleButton
          onClick={() => navigate({ name: 'catalog' })}
          className="rounded-2xl bg-brand px-8 py-3.5 text-base font-extrabold text-white shadow-lg shadow-brand/30"
        >
          {t.cart.browse}
        </RippleButton>
      </div>
    )
  }

  const delivery = deliveryFeeFor(subtotal)
  const total = addMoney(subtotal, delivery)
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-black text-slate-900">{t.cart.title}</h1>

        <div className="grid gap-7 lg:grid-cols-[1fr_340px]">
          <div className="flex flex-col gap-3">
            {lines.map(line => (
              <div
                key={line.linkId}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <ProductImage urls={line.imageUrls} alt={tr(line.name)} className="h-full w-full object-contain p-1.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 line-clamp-2 text-sm font-bold text-slate-800">{tr(line.name)}</div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center overflow-hidden rounded-lg border border-slate-200">
                      <button
                        onClick={() => setQuantity(line.linkId, line.quantity - 1)}
                        className="grid h-9 w-9 place-items-center text-slate-600 hover:bg-slate-50"
                        aria-label="-"
                      >
                        <MinusIcon size={14} />
                      </button>
                      <span className="w-9 text-center text-sm font-extrabold text-slate-900">{line.quantity}</span>
                      <button
                        onClick={() => setQuantity(line.linkId, line.quantity + 1)}
                        className="grid h-9 w-9 place-items-center text-slate-600 hover:bg-slate-50"
                        aria-label="+"
                      >
                        <PlusIcon size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => remove(line.linkId)}
                      className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      <TrashIcon /> {t.cart.remove}
                    </button>
                  </div>
                </div>
                <div className="shrink-0 text-end">
                  <Money value={multiplyMoney(line.unitPrice, line.quantity)} className="text-lg font-black text-brand" />
                  <div className="mt-0.5 text-xs text-slate-400">
                    <Money value={line.unitPrice} /> {t.cart.perUnit}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-24 lg:self-start">
            <h2 className="mb-5 text-lg font-extrabold text-slate-900">{t.cart.title}</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>{t.cart.subtotal}</span>
                <Money value={subtotal} className="font-bold" />
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t.cart.shipping}</span>
                <span className={`font-bold ${delivery === 0 ? 'text-green-600' : ''}`}>
                  {delivery === 0 ? t.cart.free : <Money value={delivery} />}
                </span>
              </div>
            </div>

            {remaining > 0 && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-[13px] font-semibold text-amber-800">
                <TruckIcon size={15} /> {t.cart.addMore(formatMoney(remaining))}
              </div>
            )}

            <div className="mt-5 flex items-baseline justify-between border-t-2 border-slate-100 pt-4">
              <span className="text-base font-extrabold text-slate-900">{t.cart.total}</span>
              <Money value={total} className="text-2xl font-black text-brand" />
            </div>

            <RippleButton
              onClick={() => navigate({ name: 'checkout' })}
              className="mt-5 w-full rounded-2xl bg-brand px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark"
            >
              {t.cart.checkout}
            </RippleButton>
            <button
              onClick={() => navigate({ name: 'catalog' })}
              className="mt-3 w-full rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
            >
              {t.cart.continue}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
