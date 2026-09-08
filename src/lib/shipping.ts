/**
 * Delivery-fee rule shown at checkout. Not authoritative: the order the site
 * writes carries this as an advisory `delivery_fee`, and the Worker onCreate
 * hook (contracts/customer_orders.yaml "Worker hooks", step 0b) re-copies the
 * shop's real `shops.delivery_fee` and folds it into `total` if/when it runs.
 */
export const FREE_DELIVERY_THRESHOLD = 300
export const STANDARD_DELIVERY_FEE = 29.9

export function deliveryFeeFor(subtotal: number): number {
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE
}
