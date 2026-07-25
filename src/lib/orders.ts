import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import { db, SHOP_ID } from './firebase'

export interface OrderLineItem {
  itemId: string
  name: string
  qty: number
  unitPrice: number
}

export interface CheckoutDetails {
  name: string
  phone: string
  email: string
  address: string
  city: string
}

async function findOrCreateClientId(details: CheckoutDetails): Promise<string> {
  const existing = await getDocs(
    query(collection(db, 'clients'), where('shop_id', '==', SHOP_ID), where('email', '==', details.email))
  )
  if (!existing.empty) return existing.docs[0].id

  const clientDoc = await addDoc(collection(db, 'clients'), {
    name: details.name,
    phone: details.phone,
    email: details.email,
    shop_id: SHOP_ID,
    notes: null,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  })
  return clientDoc.id
}

export async function createOrder(details: CheckoutDetails, items: OrderLineItem[]): Promise<string> {
  if (!SHOP_ID) throw new Error('VITE_SHOP_ID is not configured')
  if (items.length === 0) throw new Error('Cannot create an order with no items')

  const clientId = await findOrCreateClientId(details)
  const subtotal = items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0)

  const orderDoc = await addDoc(collection(db, 'shops', SHOP_ID, 'orders'), {
    shop_id: SHOP_ID,
    client_id: clientId,
    status: 'pending',
    items: items.map(i => ({ item_id: i.itemId, name: i.name, qty: i.qty, unit_price: i.unitPrice })),
    subtotal,
    total: subtotal,
    delivery_address: `${details.address}, ${details.city}`,
    notes: null,
    estimated_delivery_date: null,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  })
  return orderDoc.id
}
