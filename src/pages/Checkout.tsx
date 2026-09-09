import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { useCart } from '../lib/cart'
import { addMoney, formatMoney, multiplyMoney } from '../lib/money'
import { placeOrder, type CheckoutContact } from '../lib/orders'
import { useNav } from '../lib/router'
import { deliveryFeeFor } from '../lib/shipping'
import { CheckIcon, SpinnerIcon, StorefrontIcon, TruckIcon } from '../ui/icons'
import { Money, RippleButton } from '../ui/primitives'

type Fulfillment = 'delivery' | 'pickup'
const EMPTY: CheckoutContact = { name: '', phone: '', email: '', address: '', city: '', zip: '', note: '' }

export function CheckoutPage() {
  const { t, tr } = useI18n()
  const { lines, subtotal, clear } = useCart()
  const navigate = useNav()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [form, setForm] = useState<CheckoutContact>(EMPTY)
  const [fulfillment, setFulfillment] = useState<Fulfillment>('delivery')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const delivery = fulfillment === 'pickup' ? 0 : deliveryFeeFor(subtotal)
  const total = addMoney(subtotal, delivery)

  useEffect(() => {
    if (!done && lines.length === 0) navigate({ name: 'catalog' })
  }, [lines.length, done, navigate])

  const set = (key: keyof CheckoutContact) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const step1Valid = form.name.trim() !== '' && form.phone.trim() !== ''
  const step2Valid = fulfillment === 'pickup' || (form.address.trim() !== '' && form.city.trim() !== '')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setError(null)
    setSubmitting(true)
    try {
      await placeOrder({
        contact: form,
        fulfillmentMethod: fulfillment,
        deliveryFee: delivery,
        lines: lines.map(l => ({
          itemId: l.itemId,
          name: tr(l.name),
          quantity: l.quantity,
          unitCost: l.unitPrice,
        })),
      })
      setDone(true)
      clear()
      setTimeout(() => navigate({ name: 'home' }), 4000)
    } catch (err) {
      console.error('order failed', err)
      setError(t.checkout.error)
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 bg-slate-50 px-4 text-center">
        <div
          className="grid h-20 w-20 place-items-center rounded-full bg-green-100 text-4xl"
          style={{ animation: 'scaleIn 0.5s cubic-bezier(0.22,0.68,0,1.2) both' }}
        >
          ✅
        </div>
        <h2 className="text-2xl font-black text-slate-900">{t.checkout.successTitle}</h2>
        <p className="max-w-sm text-slate-500">{t.checkout.successBody}</p>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10'
  const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500'
  const steps = [t.checkout.step1, t.checkout.step2, t.checkout.step3]

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-black text-slate-900">{t.checkout.title}</h1>

        <div className="mb-8 flex items-center">
          {steps.map((label, i) => (
            <div key={label} className={`flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
              <div className="flex items-center gap-2">
                <div
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-extrabold transition ${
                    step > i + 1
                      ? 'bg-green-600 text-white'
                      : step === i + 1
                        ? 'bg-brand text-white'
                        : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span
                  className={`whitespace-nowrap text-sm ${step === i + 1 ? 'font-extrabold text-slate-900' : 'font-medium text-slate-400'}`}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`mx-3 h-0.5 flex-1 ${step > i + 1 ? 'bg-green-600' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_320px]">
          <form onSubmit={submit} className="space-y-5">
            {step === 1 && (
              <div className="anim-scale-in rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h3 className="mb-6 text-lg font-extrabold text-slate-900">{t.checkout.contactHeading}</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>{t.checkout.name} *</label>
                    <input className={inputClass} value={form.name} onChange={set('name')} required />
                  </div>
                  <div>
                    <label className={labelClass}>{t.checkout.phone} *</label>
                    <input className={inputClass} value={form.phone} onChange={set('phone')} required inputMode="tel" dir="ltr" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>{t.checkout.email}</label>
                    <input className={inputClass} value={form.email} onChange={set('email')} type="email" dir="ltr" />
                  </div>
                </div>
                <RippleButton
                  type="button"
                  onClick={() => step1Valid && setStep(2)}
                  disabled={!step1Valid}
                  className="mt-6 rounded-xl bg-brand px-8 py-3 text-sm font-extrabold text-white transition hover:bg-brand-dark disabled:bg-slate-300"
                >
                  {t.checkout.next}
                </RippleButton>
              </div>
            )}

            {step === 2 && (
              <div className="anim-scale-in space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                  <h3 className="mb-4 text-lg font-extrabold text-slate-900">{t.checkout.fulfilmentHeading}</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {([
                      { method: 'delivery' as const, Icon: TruckIcon, title: t.checkout.delivery, desc: t.checkout.deliveryDesc },
                      { method: 'pickup' as const, Icon: StorefrontIcon, title: t.checkout.pickup, desc: t.checkout.pickupDesc },
                    ]).map(({ method, Icon, title, desc }) => {
                      const selected = fulfillment === method
                      return (
                        <label
                          key={method}
                          className={`relative flex cursor-pointer gap-3 rounded-2xl border-2 p-4 transition ${
                            selected
                              ? 'border-brand bg-blue-50 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="fulfillment"
                            checked={selected}
                            onChange={() => setFulfillment(method)}
                            className="sr-only"
                          />
                          <span
                            className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                              selected ? 'bg-brand text-white' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            <Icon size={22} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-extrabold text-slate-900">{title}</span>
                            <span className="mt-0.5 block text-xs leading-snug text-slate-500">{desc}</span>
                          </span>
                          <span
                            className={`absolute top-3 end-3 grid h-5 w-5 place-items-center rounded-full border-2 transition ${
                              selected ? 'border-brand bg-brand text-white' : 'border-slate-300 bg-white text-transparent'
                            }`}
                          >
                            <CheckIcon size={12} />
                          </span>
                        </label>
                      )
                    })}
                  </div>

                  {fulfillment === 'pickup' && (
                    <div className="mt-4 flex items-start gap-3 rounded-xl border border-brand/20 bg-blue-50/60 p-4">
                      <StorefrontIcon size={20} className="mt-0.5 shrink-0 text-brand" />
                      <div className="text-sm">
                        <p className="font-bold text-slate-800">{t.checkout.pickupInfoTitle}</p>
                        <p className="mt-0.5 font-semibold text-green-700">{t.checkout.pickupInfoLine}</p>
                      </div>
                    </div>
                  )}

                  {fulfillment === 'delivery' && (
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className={labelClass}>{t.checkout.address} *</label>
                        <input className={inputClass} value={form.address} onChange={set('address')} required />
                      </div>
                      <div>
                        <label className={labelClass}>{t.checkout.city} *</label>
                        <input className={inputClass} value={form.city} onChange={set('city')} required />
                      </div>
                      <div>
                        <label className={labelClass}>{t.checkout.zip}</label>
                        <input className={inputClass} value={form.zip} onChange={set('zip')} dir="ltr" />
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <label className={labelClass}>{t.checkout.noteOptional}</label>
                    <textarea
                      className={`${inputClass} min-h-20 resize-y`}
                      value={form.note}
                      onChange={set('note')}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                  <h3 className="mb-3 text-lg font-extrabold text-slate-900">{t.checkout.paymentHeading}</h3>
                  <div className="flex items-center gap-3 rounded-xl border-2 border-brand bg-blue-50 p-4 text-sm font-bold text-slate-800">
                    <span className="text-xl">💵</span> {t.checkout.cod}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200"
                  >
                    {t.checkout.back}
                  </button>
                  <RippleButton
                    type="button"
                    onClick={() => step2Valid && setStep(3)}
                    disabled={!step2Valid}
                    className="flex-1 rounded-xl bg-brand px-6 py-3 text-sm font-extrabold text-white hover:bg-brand-dark disabled:bg-slate-300"
                  >
                    {t.checkout.next}
                  </RippleButton>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="anim-scale-in rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h3 className="mb-5 text-lg font-extrabold text-slate-900">{t.checkout.review}</h3>
                <dl className="mb-5 space-y-2.5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                  {[
                    [t.checkout.name, form.name],
                    [t.checkout.phone, form.phone],
                    [t.checkout.email, form.email],
                    [
                      t.checkout.fulfilmentHeading,
                      fulfillment === 'delivery'
                        ? `${t.checkout.delivery} — ${form.address}, ${form.city}`
                        : t.checkout.pickup,
                    ],
                    [t.checkout.paymentHeading, t.checkout.cod],
                    [t.checkout.note, form.note],
                  ]
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 border-b border-slate-200 pb-2 last:border-0 last:pb-0">
                        <dt className="shrink-0 text-slate-400">{k}</dt>
                        <dd className="text-end font-semibold text-slate-800">{v}</dd>
                      </div>
                    ))}
                </dl>

                {error && (
                  <div className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600">{error}</div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200"
                  >
                    {t.checkout.back}
                  </button>
                  <RippleButton
                    type="submit"
                    disabled={submitting}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-base font-extrabold text-white transition hover:bg-green-700 disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <SpinnerIcon size={18} /> {t.checkout.placing}
                      </>
                    ) : (
                      <>
                        <CheckIcon /> {t.checkout.place(formatMoney(total))}
                      </>
                    )}
                  </RippleButton>
                </div>
              </div>
            )}
          </form>

          {/* Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-24 lg:self-start">
            <h3 className="mb-4 text-base font-extrabold text-slate-900">{t.cart.title}</h3>
            <div className="mb-4 space-y-3">
              {lines.map(line => (
                <div key={line.linkId} className="flex justify-between gap-2 text-sm">
                  <span className="text-slate-600">
                    {tr(line.name)} <span className="text-slate-400">×{line.quantity}</span>
                  </span>
                  <Money value={multiplyMoney(line.unitPrice, line.quantity)} className="shrink-0 font-bold" />
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-slate-100 pt-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>{t.cart.subtotal}</span>
                <Money value={subtotal} />
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{t.cart.shipping}</span>
                <span>{delivery === 0 ? t.cart.free : <Money value={delivery} />}</span>
              </div>
              <div className="flex justify-between pt-1 text-base font-black text-slate-900">
                <span>{t.cart.total}</span>
                <Money value={total} className="text-brand" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
