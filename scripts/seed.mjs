// One-off seeder: Hebrew cleaning-product catalog for the Ragwa shop.
// Uses the Firebase client SDK directly (Firestore rules are currently open, no admin creds needed).
// Run with: node scripts/seed.mjs
import { initializeApp } from 'firebase/app'
import { addDoc, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCC-Spr0z5rzRi5llzolHE43AwQxFs3-7I',
  authDomain: 'chek-chak.firebaseapp.com',
  projectId: 'chek-chak',
  storageBucket: 'chek-chak.firebasestorage.app',
  messagingSenderId: '721392320778',
  appId: '1:721392320778:web:6d97ee595f7cea7da6baf3',
}

const SHOP_ID = '52715aa0608541689643'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const CATEGORIES = [
  { slug: 'dish-soap', name: 'סבון כלים', icon_name: 'sparkles', sort_order: 1 },
  { slug: 'bleach', name: 'אקונומיקה', icon_name: 'beaker', sort_order: 2 },
  { slug: 'air-freshener', name: 'מטהרי אוויר', icon_name: 'cloud', sort_order: 3 },
  { slug: 'floor-cleaner', name: 'ניקוי רצפות', icon_name: 'squares-2x2', sort_order: 4 },
  { slug: 'glass-cleaner', name: 'ניקוי זכוכית וחלונות', icon_name: 'window', sort_order: 5 },
  { slug: 'laundry-detergent', name: 'חומרי כביסה', icon_name: 'shirt', sort_order: 6 },
  { slug: 'fabric-softener', name: 'מרככי כביסה', icon_name: 'sparkles', sort_order: 7 },
  { slug: 'wipes', name: 'מגבונים', icon_name: 'square-3-stack-3d', sort_order: 8 },
  { slug: 'bathroom-cleaner', name: 'ניקוי אמבטיה ושירותים', icon_name: 'beaker', sort_order: 9 },
  { slug: 'kitchen-cleaner', name: 'ניקוי מטבח', icon_name: 'sparkles', sort_order: 10 },
  { slug: 'cleaning-gloves', name: 'כפפות ניקיון', icon_name: 'hand-raised', sort_order: 11 },
  { slug: 'trash-bags', name: 'שקיות אשפה', icon_name: 'trash', sort_order: 12 },
  { slug: 'cleaning-accessories', name: 'אביזרי ניקיון', icon_name: 'wrench', sort_order: 13 },
  { slug: 'multi-purpose-cleaner', name: 'חומרי ניקוי רב-תכליתיים', icon_name: 'beaker', sort_order: 14 },
]

const ITEMS = [
  {
    categorySlug: 'dish-soap',
    name: 'פיירי מקורי - סבון כלים',
    sku: 'FAIRY-500',
    description: 'סבון כלים פיירי מקורי עם ריח לימון רענן. יעיל במיוחד לשומן ולכלוך קשה. מיועד לשימוש יומיומי.',
    price: 14.9,
    stock_quantity: 40,
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'bleach',
    name: 'אקונומיקה סנו - 5 ליטר',
    sku: 'SANO-ECO-5L',
    description: 'אקונומיקה סנו ריכוז גבוה. מחטאת ומנקה בו זמנית. מתאימה לניקוי שירותים, אמבטיה ורצפות.',
    price: 18.9,
    stock_quantity: 25,
    image: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'air-freshener',
    name: 'גלייד מטהר אוויר - לבנדר',
    sku: 'GLADE-LAV',
    description: 'מטהר אוויר גלייד בריח לבנדר מרענן. ממשיך לפעול עד 30 יום. מגיע עם בקבוקון מילוי חינם.',
    price: 22.9,
    stock_quantity: 30,
    image: 'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'glass-cleaner',
    name: 'Mr. Muscle ספריי חלונות',
    sku: 'MRMUSCLE-GLASS',
    description: 'ספריי לניקוי חלונות ומשטחים שקופים. מבריק ללא שאריות. מנקה זכוכית, מראות ומסכי טלוויזיה.',
    price: 16.9,
    stock_quantity: 35,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'laundry-detergent',
    name: 'אריאל אבקת כביסה - 4 ק"ג',
    sku: 'ARIEL-POWDER-4KG',
    description: 'אבקת כביסה אריאל עם נוסחה מתקדמת להסרת כתמים. פועלת בטמפרטורות נמוכות.',
    price: 59.9,
    stock_quantity: 20,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'fabric-softener',
    name: 'לנור מרכך כביסה - ורדים',
    sku: 'LENOR-ROSE',
    description: 'מרכך כביסה לנור בריח ורדים עדין. משאיר את הבגדים רכים ומבושמים. מגן על הצבעים.',
    price: 34.9,
    stock_quantity: 28,
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'wipes',
    name: "דטול מגבונים לחיטוי - 80 יח'",
    sku: 'DETTOL-WIPES-80',
    description: 'מגבונים אנטי-בקטריאליים של דטול. מחטאים את הידיים ומשטחים. מתאימים לשימוש יומיומי.',
    price: 29.9,
    stock_quantity: 50,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'floor-cleaner',
    name: 'Flash נוזל לניקוי רצפות',
    sku: 'FLASH-FLOOR',
    description: 'נוזל ניקוי לרצפות Flash. מנקה ומבריק בלי להשאיר שאריות. מתאים לכל סוגי הרצפות.',
    price: 24.9,
    stock_quantity: 32,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'dish-soap',
    name: 'פרסיל ג\'ל כלים - לימון',
    sku: 'PERSIL-DISH-LEMON',
    description: 'ג\'ל לשטיפת כלים בעבודת יד, מרוכז ומפורק שומן מהיר. מתאים גם לשטיפה ביד וגם כטרום-שטיפה למדיח.',
    price: 13.5,
    stock_quantity: 45,
    image: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'bleach',
    name: 'אקונומיקה קלוראין - 3 ליטר',
    sku: 'CLORINE-3L',
    description: 'אקונומיקה מחטאת בריח קליל. מתאימה לניקוי וחיטוי משטחים, שירותים ומטבח.',
    price: 12.9,
    stock_quantity: 38,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'dish-soap',
    name: 'סוד סבון כלים - אלוורה',
    sku: 'SOD-DISH-ALOE',
    description: "סבון כלים עדין לידיים עם תמצית אלוורה. מנקה ביסודיות ושומר על עור הידיים רך.",
    price: 11.9,
    stock_quantity: 42,
    image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'bleach',
    name: 'אקונומיקה סנו ג\'ל - עבה',
    sku: 'SANO-ECO-GEL',
    description: 'ג\'ל אקונומיקה סמיך ונדבק למשטחים אנכיים. מחטא ומסיר אבנית באסלה ובקרמיקה.',
    price: 16.5,
    stock_quantity: 27,
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'air-freshener',
    name: 'אמברלה מטהר אוויר חשמלי - וניל',
    sku: 'AMBRELLA-VANILLA',
    description: 'מטהר אוויר חשמלי בריח וניל מתקתק. מגיע עם משאבת ריח אוטומטית לשחרור קבוע לאורך היום.',
    price: 27.9,
    stock_quantity: 18,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'air-freshener',
    name: 'פברז ספריי טקסטיל - אביב רענן',
    sku: 'FEBREZE-SPRING',
    description: 'ספריי לריענון בדים, וילונות וספות. מנטרל ריחות לא רצויים ולא רק מסווה אותם.',
    price: 19.9,
    stock_quantity: 33,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'floor-cleaner',
    name: 'סנו פלוס נוזל רצפות - אקליפטוס',
    sku: 'SANOPLUS-FLOOR-EUC',
    description: 'נוזל ניקוי רצפות בריח אקליפטוס מרענן. מתאים לפרקט, קרמיקה ואריחים.',
    price: 21.9,
    stock_quantity: 30,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'floor-cleaner',
    name: 'ויקס נוזל רצפות מרוכז - לבנדר',
    sku: 'VIX-FLOOR-CONC',
    description: 'נוזל ריכוז גבוה לניקוי רצפות, בקבוק אחד שווה ל-3 בקבוקים רגילים. מדלל במים לפני שימוש.',
    price: 26.9,
    stock_quantity: 22,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'glass-cleaner',
    name: 'סנו ספריי לזכוכית - עם אלכוהול',
    sku: 'SANO-GLASS-ALC',
    description: 'ספריי לניקוי זכוכית ומראות המכיל אלכוהול לייבוש מהיר וללא כתמים.',
    price: 14.5,
    stock_quantity: 40,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'laundry-detergent',
    name: 'פרסיל ג\'ל כביסה - צבעים',
    sku: 'PERSIL-GEL-COLOR',
    description: "ג'ל כביסה מרוכז לשמירה על צבעי הבגדים. מסיר כתמים כבר בכביסה הראשונה, גם במים קרים.",
    price: 44.9,
    stock_quantity: 24,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'laundry-detergent',
    name: 'ניקה אבקת כביסה - לבנים',
    sku: 'NIKA-POWDER-WHITE',
    description: 'אבקת כביסה מיוחדת לבגדים לבנים. מבהירה ומסירה כתמים עקשניים.',
    price: 38.9,
    stock_quantity: 26,
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'fabric-softener',
    name: 'קומפורט מרכך כביסה - בוקר רענן',
    sku: 'COMFORT-MORNING',
    description: 'מרכך כביסה עם ניחוח שנשאר לאורך זמן. מקל על הגיהוץ ומונע הצטברות חשמל סטטי.',
    price: 31.9,
    stock_quantity: 30,
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'wipes',
    name: 'קלינקס מגבוני ניקוי רב-תכליתיים',
    sku: 'KLEENEX-MULTI-60',
    description: 'מגבונים לחים לניקוי משטחים שונים בבית. נוחים לשימוש נייד וללא צורך בשטיפה.',
    price: 17.9,
    stock_quantity: 48,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'bathroom-cleaner',
    name: 'סנו רב-פעולה לאמבטיה - הסרת אבנית',
    sku: 'SANO-BATH-LIME',
    description: 'ספריי רב-פעולה המסיר אבנית וסבון מהברזים, האמבטיה והכיור. משאיר ברק גבוה.',
    price: 23.9,
    stock_quantity: 29,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'bathroom-cleaner',
    name: 'דומסטוס ג\'ל אסלה - כחול',
    sku: 'DOMESTOS-TOILET-BLUE',
    description: "ג'ל מחטא לאסלה שנדבק לדפנות ומחטא לאורך זמן. הורג 99.9% מהחיידקים.",
    price: 15.9,
    stock_quantity: 36,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'kitchen-cleaner',
    name: 'סיף ספריי למטבח - הסרת שומן',
    sku: 'CIF-KITCHEN-GREASE',
    description: 'ספריי רב-עוצמה להסרת שומן מכיריים, תנור ומשטחי עבודה. פועל תוך דקות.',
    price: 20.9,
    stock_quantity: 34,
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'kitchen-cleaner',
    name: 'סודה לשתייה לניקוי - 1 ק"ג',
    sku: 'BAKING-SODA-1KG',
    description: 'סודה לשתייה טבעית לניקוי משטחי מטבח, כיורים ותנורים. חלופה ידידותית לסביבה לחומרי ניקוי כימיים.',
    price: 9.9,
    stock_quantity: 55,
    image: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'cleaning-gloves',
    name: 'כפפות ניקיון לטקס - זוג',
    sku: 'GLOVES-LATEX-M',
    description: 'כפפות ניקיון עמידות מלטקס, מידה M. מגנות על הידיים מחומרי ניקוי וכימיקלים.',
    price: 8.9,
    stock_quantity: 60,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&h=600&fit=crop&auto=format',
  },
  {
    categorySlug: 'trash-bags',
    name: 'שקיות אשפה עבות - 50 יח\' (50 ליטר)',
    sku: 'TRASHBAG-50L-50PK',
    description: 'שקיות אשפה עבות ועמידות בנפח 50 ליטר. מתאימות לשימוש ביתי יומיומי.',
    price: 25.9,
    stock_quantity: 40,
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'cleaning-accessories',
    name: 'מגב רצפות עם ידית טלסקופית',
    sku: 'MOP-TELESCOPIC',
    description: 'מגב רצפות עם ידית מתארכת ומיקרופייבר נשלף וניתן לכביסה. מתאים לכל סוגי הרצפות.',
    price: 49.9,
    stock_quantity: 15,
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'cleaning-accessories',
    name: 'מטלית מיקרופייבר - חבילת 5',
    sku: 'MICROFIBER-5PK',
    description: 'מטליות מיקרופייבר סופגות ורב-פעמיות לניקוי משטחים ללא שריטות. ניתנות לכביסה חוזרת.',
    price: 22.9,
    stock_quantity: 37,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'multi-purpose-cleaner',
    name: 'סנו 5 ליטר רב-תכליתי',
    sku: 'SANO-MULTI-5L',
    description: 'חומר ניקוי רב-תכליתי בריכוז גבוה, מתאים לכל משטחי הבית. מדלל במים לפי הצורך.',
    price: 32.9,
    stock_quantity: 20,
    image: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=600&h=600&fit=crop&auto=format&flip=h',
  },
  {
    categorySlug: 'multi-purpose-cleaner',
    name: 'מיסטר פרופר ספריי רב-תכליתי - לימון',
    sku: 'MRPROPER-MULTI-LEMON',
    description: 'ספריי רב-תכליתי בריח לימון לניקוי מהיר של משטחים שונים בבית ללא צורך בשטיפה.',
    price: 18.5,
    stock_quantity: 41,
    image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=600&h=600&fit=crop&auto=format&flip=h',
  },
]

async function upsertCategory(cat) {
  const existing = await getDocs(query(collection(db, 'categories'), where('slug', '==', cat.slug)))
  if (!existing.empty) return existing.docs[0].id

  const docRef = await addDoc(collection(db, 'categories'), {
    name: cat.name,
    slug: cat.slug,
    icon_name: cat.icon_name,
    description: null,
    sort_order: cat.sort_order,
    is_active: true,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  })
  return docRef.id
}

async function linkCategoryToShop(categoryId) {
  const existing = await getDocs(
    query(collection(db, 'category_shop_links'), where('category_id', '==', categoryId), where('shop_id', '==', SHOP_ID))
  )
  if (!existing.empty) return
  await addDoc(collection(db, 'category_shop_links'), {
    category_id: categoryId,
    shop_id: SHOP_ID,
    is_active: true,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  })
}

async function upsertItem(item) {
  const existing = await getDocs(query(collection(db, 'items'), where('sku', '==', item.sku)))
  if (!existing.empty) {
    const existingDoc = existing.docs[0]
    if (existingDoc.data().image_web !== item.image) {
      await updateDoc(existingDoc.ref, { image_web: item.image, image_mobile: item.image, updated_at: serverTimestamp() })
    }
    return existingDoc.id
  }

  const docRef = await addDoc(collection(db, 'items'), {
    name: item.name,
    description: item.description,
    sku: item.sku,
    image_mobile: item.image,
    image_web: item.image,
    is_active: true,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  })
  return docRef.id
}

async function linkItemToShop(itemId, item) {
  const existing = await getDocs(
    query(collection(db, 'item_shop_links'), where('item_id', '==', itemId), where('shop_id', '==', SHOP_ID))
  )
  if (!existing.empty) return
  await addDoc(collection(db, 'item_shop_links'), {
    item_id: itemId,
    shop_id: SHOP_ID,
    linked_via: 'manual',
    price: item.price,
    stock_quantity: item.stock_quantity,
    low_stock_threshold: 5,
    is_active: true,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  })
}

async function linkItemToCategory(itemId, categoryId) {
  const existing = await getDocs(
    query(collection(db, 'item_category_links'), where('item_id', '==', itemId), where('category_id', '==', categoryId))
  )
  if (!existing.empty) return
  await addDoc(collection(db, 'item_category_links'), {
    item_id: itemId,
    category_id: categoryId,
    is_active: true,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  })
}

async function main() {
  console.log(`Seeding catalog for shop ${SHOP_ID}...`)

  const categoryIdBySlug = {}
  for (const cat of CATEGORIES) {
    const id = await upsertCategory(cat)
    categoryIdBySlug[cat.slug] = id
    await linkCategoryToShop(id)
    console.log(`category: ${cat.name} (${id})`)
  }

  for (const item of ITEMS) {
    const categoryId = categoryIdBySlug[item.categorySlug]
    const itemId = await upsertItem(item)
    await linkItemToShop(itemId, item)
    await linkItemToCategory(itemId, categoryId)
    console.log(`item: ${item.name} (${itemId}) -> ₪${item.price}`)
  }

  console.log('Done.')
  process.exit(0)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
