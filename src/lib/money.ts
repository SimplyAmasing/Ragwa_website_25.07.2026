/**
 * Money is two decimal places, everywhere. The contracts store `money` fields
 * as a number with at most two decimals and the Firestore rules reject a third
 * on write, so anything this site sends to `customer_orders` is rounded here
 * first. Arithmetic on prices goes through `addMoney` / `roundMoney` rather than
 * raw `+`, because binary floats drift in the last bit (0.1 + 0.2 !== 0.3).
 */

export function roundMoney(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

export function addMoney(...values: number[]): number {
  const cents = values.reduce((sum, v) => sum + Math.round(v * 100), 0)
  return cents / 100
}

export function multiplyMoney(price: number, quantity: number): number {
  return Math.round(price * 100 * quantity) / 100
}

/** Display string with a fixed two decimals, e.g. `12.90`. */
export function formatMoney(n: number): string {
  return roundMoney(n).toFixed(2)
}
