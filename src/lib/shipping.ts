/**
 * Delivery-fee figure shown in the cart / checkout. Not authoritative: the order
 * the site writes carries this as an advisory `delivery_fee`, and the
 * chekchak-worker storefront order route re-derives the real charge from the
 * shop's own `delivery_fee` before writing the order.
 *
 * A flat fee for every delivery order — there is no order-total threshold here,
 * because no free-delivery rule is enforced on the backend and the storefront
 * must not advertise one it cannot honour. Personal pickup carries no fee (that
 * `0` is applied at the checkout fulfillment step, not here).
 */
export const STANDARD_DELIVERY_FEE = 29.9

export function deliveryFeeFor(_subtotal: number): number {
  return STANDARD_DELIVERY_FEE
}
