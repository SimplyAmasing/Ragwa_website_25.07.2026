import type { ReactNode } from 'react'
import { useI18n } from '../i18n'
import { SpinnerIcon } from '../ui/icons'

export function LoadingBlock() {
  const { t } = useI18n()
  return (
    <div className="flex flex-col items-center gap-3 py-24 text-slate-400">
      <SpinnerIcon size={32} className="text-brand" />
      <p className="text-sm font-medium">{t.common.loading}</p>
    </div>
  )
}

export function ErrorBlock() {
  const { t } = useI18n()
  return (
    <div className="py-24 text-center">
      <div className="mb-3 text-4xl">⚠️</div>
      <p className="text-sm font-semibold text-slate-600">{t.common.catalogError}</p>
    </div>
  )
}

export function EmptyBlock({ children }: { children?: ReactNode }) {
  const { t } = useI18n()
  return (
    <div className="py-24 text-center text-slate-400">
      <div className="mb-3 text-5xl">🔍</div>
      <p className="text-lg font-bold text-slate-600">{t.products.empty}</p>
      <p className="mt-1 text-sm">{children ?? t.products.emptyHint}</p>
    </div>
  )
}
