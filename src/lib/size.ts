/**
 * Best-effort pack size / quantity from a product name.
 *
 * The catalog has no dedicated size field (`weight_grams` is empty in the
 * current data), but many names end in one, e.g. "…Laundry Liquid Blue 2.2 L",
 * "…Shampoo 750 ml", "Soft Napkins … 500 Units". This pulls a trailing
 * measurement so the card can show it as a chip. Conservative: only a match at
 * the very end of the string counts, and the name itself is never altered —
 * a miss just means no chip.
 */

const UNIT = String.raw`(?:l|ml|kg|g|m|cm|units?|pcs?|rolls?|` + // en
  String.raw`ליטר|מ["״']?ל|גרם|ק["״']?ג|יח['׳]?|יחידות|גלילים|מטר|` + // he
  String.raw`لتر|مل|كغم|كجم|غرام|جم|قطعة|قطع|عبوة|عبوات|وحدة|وحدات|لفة|لفات|متر)` // ar

const SIZE_RE = new RegExp(String.raw`(\d+(?:[.,]\d+)?)\s*(×\s*\d+(?:[.,]\d+)?\s*)?(${UNIT})\.?$`, 'iu')

export function extractSize(name: string): string | null {
  const trimmed = name.trim()
  const match = trimmed.match(SIZE_RE)
  if (!match) return null
  return match[0].replace(/\.$/, '').trim()
}
