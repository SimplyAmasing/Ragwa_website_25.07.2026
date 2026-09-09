import { useI18n } from '../i18n'
import { ShieldIcon, TruckIcon } from '../ui/icons'

function CardPayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  )
}

export function BenefitsRow() {
  const { t } = useI18n()

  const items = [
    { icon: <TruckIcon size={22} />, title: t.benefits.fastTitle, sub: t.benefits.fastSub },
    { icon: <ShieldIcon size={22} />, title: t.benefits.genuineTitle, sub: t.benefits.genuineSub },
    { icon: <CardPayIcon />, title: t.benefits.payTitle, sub: t.benefits.paySub },
  ]

  return (
    <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-4">
      <div className="grid divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-lg sm:grid-cols-3 sm:divide-x sm:rtl:divide-x-reverse">
        {items.map(item => (
          <div key={item.title} className="flex items-center gap-3.5 px-6 py-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-brand">
              {item.icon}
            </span>
            <div>
              <div className="text-sm font-extrabold text-slate-900">{item.title}</div>
              <div className="text-xs text-slate-500">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
