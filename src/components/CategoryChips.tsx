import { useI18n } from '../i18n'
import type { CatalogCategory } from '../lib/catalog'

const EMOJI_BY_ICON: Record<string, string> = {
  sparkles: '✨',
  beaker: '🧴',
  cloud: '🌸',
  'squares-2x2': '🧹',
  window: '🪟',
  shirt: '👕',
  'square-3-stack-3d': '🧻',
  'hand-raised': '🧤',
  trash: '🗑️',
  wrench: '🪣',
  'shopping-basket': '🧺',
  home: '🏠',
}

export function categoryEmoji(iconName: string | null): string {
  return (iconName && EMOJI_BY_ICON[iconName]) || '🧽'
}

const TILE_BG = ['bg-blue-50', 'bg-green-50', 'bg-orange-50', 'bg-fuchsia-50', 'bg-sky-50', 'bg-amber-50']

export function CategoryChips({
  categories,
  selected,
  onSelect,
}: {
  categories: CatalogCategory[]
  selected?: string
  onSelect: (id: string | undefined) => void
}) {
  const { t, tr } = useI18n()
  if (categories.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      <button
        onClick={() => onSelect(undefined)}
        className={`rounded-2xl border-2 p-4 text-center text-sm font-bold transition ${
          !selected ? 'border-brand bg-blue-50 text-brand' : 'border-transparent bg-slate-50 text-slate-700 hover:border-blue-100'
        }`}
      >
        <div className="mb-1.5 text-3xl leading-none">🛒</div>
        {t.categories.all}
      </button>
      {categories.map((cat, i) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`rounded-2xl border-2 p-4 text-center text-sm font-bold transition hover:-translate-y-0.5 ${
            selected === cat.id
              ? 'border-brand bg-blue-50 text-brand'
              : `border-transparent ${TILE_BG[i % TILE_BG.length]} text-slate-800 hover:border-blue-100`
          }`}
        >
          <div className="mb-1.5 text-3xl leading-none">{categoryEmoji(cat.iconName)}</div>
          <span className="line-clamp-2">{tr(cat.name)}</span>
        </button>
      ))}
    </div>
  )
}
