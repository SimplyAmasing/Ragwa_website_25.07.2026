import { useI18n } from '../i18n'
import { useCatalog } from '../lib/catalogStore'
import { useNav } from '../lib/router'
import { MailIcon, MapPinIcon, PhoneIcon } from '../ui/icons'

export function Footer() {
  const { t, tr } = useI18n()
  const { categories } = useCatalog()
  const navigate = useNav()

  return (
    <footer id="site-footer" className="bg-slate-900 px-4 pb-8 pt-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-lg">
                🫧
              </span>
              <span className="text-xl font-black">{t.brand}</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">{t.footer.tagline}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold text-slate-100">{t.footer.categories}</h4>
            <ul className="space-y-2.5">
              {categories.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigate({ name: 'catalog', category: cat.id })}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {tr(cat.name)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold text-slate-100">{t.footer.service}</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>{t.footer.faq}</li>
              <li>{t.footer.returns}</li>
              <li>{t.footer.track}</li>
              <li>{t.footer.terms}</li>
              <li>{t.footer.privacy}</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold text-slate-100">{t.footer.contact}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <PhoneIcon /> <span dir="ltr">+972 000 000 000</span>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon /> <span dir="ltr">info@ragwa.co.il</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPinIcon /> <span>—</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-500">
          {t.footer.rights(new Date().getFullYear())}
        </div>
      </div>
    </footer>
  )
}
