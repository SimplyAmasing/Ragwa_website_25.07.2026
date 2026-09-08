import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db, SHOP_ID } from './firebase'
import { addMoney, multiplyMoney, roundMoney } from './money'

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
  /** Item name resolved to the visitor's language at checkout time. */
  name: string
  quantity: number
  unitCost: number
}

export interface PlaceOrderInput {
  contact: CheckoutContact
  lines: OrderLine[]
  fulfillmentMethod: 'delivery' | 'pickup'
  /** Delivery charge shown at checkout; null for pickup. */
  deliveryFee: number | null
}

/**
 * Writes one order to `shops/{shopId}/customer_orders/{id}` in the shape
 * `contracts/customer_orders.yaml` defines for the client `checkout` action:
 * `line_item` uses `unit_cost`, `status` is `pending`, `source` is `website`,
 * and every server-owned field (client_id, courier_*, coupon_*, payments,
 * fulfillments, returns, shop_notes) is pinned `null` — so if the Worker's
 * onCreate hook and the contract security rules are ever enabled, this document
 * already matches what they expect.
 *
 * The site is anonymous (no Firebase Auth), so `client_uid` is null and the
 * shop owner sees the order in the Business app as "not linked yet". The
 * customer's name and phone are also written into `order_notes` (a
 * contract field the Business app already renders) and, structured, into
 * `website_customer`, so the shop can act on the order with no other change.
 */
export async function placeOrder(input: PlaceOrderInput): Promise<string> {
  if (!SHOP_ID) throw new Error('VITE_SHOP_ID is not configured')
  if (input.lines.length === 0) throw new Error('Cannot place an order with no items')

  const { contact, lines, fulfillmentMethod } = input

  const subtotal = roundMoney(
    lines.reduce((sum, line) => addMoney(sum, multiplyMoney(line.unitCost, line.quantity)), 0),
  )
  const deliveryFee = fulfillmentMethod === 'pickup' ? null : input.deliveryFee != null ? roundMoney(input.deliveryFee) : null
  const total = roundMoney(addMoney(subtotal, deliveryFee ?? 0))

  const contactLine = [contact.name, contact.phone, contact.email].filter(Boolean).join(' · ')
  const orderNotes = [contactLine, contact.note?.trim()].filter(Boolean).join('\n') || null

  const ref = doc(collection(db, 'shops', SHOP_ID, 'customer_orders'))

  await setDoc(ref, {
    id: ref.id,
    shop_id: SHOP_ID,
    shop_name: null,
    shop_logo_key: null,

    client_id: null,
    client_uid: null,

    status: 'pending',
    source: 'website',

    courier_id: null,
    courier_name: null,
    courier_phone: null,
    courier_latitude: null,
    courier_longitude: null,

    subtotal,
    total,
    delivery_fee: deliveryFee,

    delivery_address: fulfillmentMethod === 'delivery' ? `${contact.address}, ${contact.city}`.trim() : null,
    estimated_delivery_date: null,
    fulfillment_method: fulfillmentMethod,
    scheduled_for: null,
    delivered_at: null,

    driver_notes: null,
    shop_notes: null,
    order_notes: orderNotes,

    coupon_id: null,
    coupon_discount_amount: null,
    payment_method_id: null,

    items: lines.map(line => ({
      item_id: line.itemId,
      name: line.name,
      quantity: line.quantity,
      unit_cost: roundMoney(line.unitCost),
      variant_id: null,
      modifiers: null,
    })),

    payments: null,
    fulfillments: null,
    returns: null,

    // Not a contract field. Anonymous website orders have no `client_uid` for
    // the Worker to resolve a CRM record from, so the customer's own details
    // ride here for the shop to read directly. Ignored by the generated Flutter
    // models; visible in the dashboard and Firestore console.
    website_customer: {
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
      city: contact.city,
      zip: contact.zip ?? null,
    },

    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  })

  return ref.id
}
