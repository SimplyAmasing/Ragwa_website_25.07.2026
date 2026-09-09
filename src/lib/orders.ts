import { placeWorkerOrder } from './api'
import { IS_MOCK } from './catalog'
import { SHOP_ID } from './firebase'

export interface CheckoutContact {
  name: string
  phone: string
  email: string
  address: string
  city: string
  zip?: string
  note?: string
}

export interface OrderLine {
  itemId: string
  /** Item name resolved to the visitor's language — shown back, not trusted for pricing. */
  name: string
  quantity: number
  unitCost: number
}

export interface PlaceOrderInput {
  contact: CheckoutContact
  lines: OrderLine[]
  fulfillmentMethod: 'delivery' | 'pickup'
  /** Delivery charge shown at checkout; the Worker re-derives the real one. */
  deliveryFee: number | null
}

/**
 * Places the order through the chekchak-worker storefront proxy. The Worker is
 * the trusted boundary: it validates the shop, re-derives every price from
 * `item_shop_links`, and writes `shops/{shopId}/customer_orders/{id}` in the
 * `checkout` shape (contracts/customer_orders.yaml). The client-submitted
 * line prices and delivery fee are advisory only.
 */
export async function placeOrder(input: PlaceOrderInput): Promise<string> {
  if (input.lines.length === 0) throw new Error('Cannot place an order with no items')

  if (IS_MOCK) {
    console.info('Ragwa mock: order not sent', input)
    await new Promise(resolve => setTimeout(resolve, 600))
    return `mock-${Date.now()}`
  }

  if (!SHOP_ID) throw new Error('VITE_SHOP_ID is not configured')

  const { orderId } = await placeWorkerOrder({
    shopId: SHOP_ID,
    fulfillmentMethod: input.fulfillmentMethod,
    contact: {
      name: input.contact.name,
      phone: input.contact.phone,
      email: input.contact.email || undefined,
      address: input.contact.address || undefined,
      city: input.contact.city || undefined,
      zip: input.contact.zip || undefined,
    },
    note: input.contact.note || undefined,
    lines: input.lines.map(l => ({ itemId: l.itemId, quantity: l.quantity })),
  })

  return orderId
}
