import type { I18nValue, Locale } from '../i18n'
import { pickI18n } from '../i18n'

/**
 * TEMPORARY, frontend-only store information for design review.
 *
 * The real values live on the `shops/{id}` Firestore document
 * (`address`, `opening_hours`, `timezone`). The Worker's /storefront/catalog
 * route does not return them yet — wiring that up is a chekchak-worker change.
 * Until then these placeholders drive the header's location + Open/Closed UI.
 *
 * Replace with dynamic data by reading `shop.address` / `shop.opening_hours` /
 * `shop.timezone` from the catalog response once the Worker exposes them.
 */

export interface DayHours {
  /** 0 = Sunday … 6 = Saturday */
  day: number
  /** "HH:MM" 24h, in the store timezone. Ignored when `closed`. */
  open: string
  close: string
  closed?: boolean
}

export const STORE_INFO: {
  address: I18nValue
  phone: string
  timezone: string
  hours: DayHours[]
} = {
  address: {
    he: 'ואדי אל-נסור, רחוב 82 — אום אל-פחם',
    ar: 'وادي النسور، شارع 82 — أم الفحم',
    en: 'Wadi al-Nasour St 82, Umm al-Fahm',
  },
  phone: '+972 4 000 0000',
  timezone: 'Asia/Jerusalem',
  // Placeholder: Sun–Thu 08:00–20:00, Fri 08:00–14:00, Sat closed.
  hours: [
    { day: 0, open: '08:00', close: '20:00' },
    { day: 1, open: '08:00', close: '20:00' },
    { day: 2, open: '08:00', close: '20:00' },
    { day: 3, open: '08:00', close: '20:00' },
    { day: 4, open: '08:00', close: '20:00' },
    { day: 5, open: '08:00', close: '14:00' },
    { day: 6, open: '00:00', close: '00:00', closed: true },
  ],
}

export function storeAddress(locale: Locale): string {
  return pickI18n(STORE_INFO.address, locale)
}

interface OpenStatus {
  open: boolean
  /** "HH:MM" the status next flips at, when known (today's close, or today's open). */
  until: string | null
}

/** Current wall-clock parts in the store timezone. */
function nowInStore(now: Date): { day: number; minutes: number } {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: STORE_INFO.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const parts = fmt.formatToParts(now)
  const weekday = parts.find(p => p.type === 'weekday')?.value ?? 'Sun'
  const hour = Number(parts.find(p => p.type === 'hour')?.value ?? '0') % 24
  const minute = Number(parts.find(p => p.type === 'minute')?.value ?? '0')
  const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday)
  return { day: dayIndex < 0 ? 0 : dayIndex, minutes: hour * 60 + minute }
}

const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}

export function computeOpenStatus(now: Date = new Date()): OpenStatus {
  const { day, minutes } = nowInStore(now)
  const today = STORE_INFO.hours.find(h => h.day === day)
  if (!today || today.closed) return { open: false, until: null }
  const open = toMinutes(today.open)
  const close = toMinutes(today.close)
  if (minutes < open) return { open: false, until: today.open }
  if (minutes >= close) return { open: false, until: null }
  return { open: true, until: today.close }
}
