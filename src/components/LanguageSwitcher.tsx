import { useEffect, useRef, useState } from 'react'
import { LOCALES, LOCALE_LABEL, useI18n } from '../i18n'
import { ChevronDownIcon, GlobeIcon } from '../ui/icons'

export function LanguageSwitcher({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const { locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  const triggerColor = tone === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${triggerColor}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <GlobeIcon size={14} />
        {LOCALE_LABEL[locale]}
        <ChevronDownIcon size={12} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-50 mt-2 min-w-[140px] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl end-0"
        >
          {LOCALES.map(code => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === locale}
                onClick={() => {
                  setLocale(code)
                  setOpen(false)
                }}
                className={`block w-full px-4 py-2 text-start text-sm transition-colors hover:bg-slate-50 ${
                  code === locale ? 'font-bold text-brand' : 'font-medium text-slate-600'
                }`}
              >
                {LOCALE_LABEL[code]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
