import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Locales. `he` and `ar` render right-to-left; `en` left-to-right.
// ─────────────────────────────────────────────────────────────────────────────
export const LOCALES = ['he', 'ar', 'en'] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_DIR: Record<Locale, 'rtl' | 'ltr'> = { he: 'rtl', ar: 'rtl', en: 'ltr' }
export const LOCALE_LABEL: Record<Locale, string> = { he: 'עברית', ar: 'العربية', en: 'English' }
export const LOCALE_SHORT: Record<Locale, string> = { he: 'HE', ar: 'AR', en: 'EN' }

const DEFAULT_LOCALE: Locale = (() => {
  const fromEnv = import.meta.env.VITE_DEFAULT_LOCALE as string | undefined
  return (LOCALES as readonly string[]).includes(fromEnv ?? '') ? (fromEnv as Locale) : 'he'
})()

// The fallback chain when a Firestore i18n map or a string is missing the
// active locale: active → he → en → ar → first non-empty value present.
const FALLBACK_ORDER: Locale[] = ['he', 'en', 'ar']

// ─────────────────────────────────────────────────────────────────────────────
// UI strings. `he` is the source of truth for the shape; `ar` and `en` must
// match it (TypeScript enforces this via the `Strings` type below).
// ─────────────────────────────────────────────────────────────────────────────
const he = {
  brand: 'ראגוה',
  nav: {
    home: 'דף הבית',
    catalog: 'קטלוג מוצרים',
    allProducts: 'כל המוצרים',
    categories: 'קטגוריות',
    offers: 'מבצעים',
    about: 'אודות',
    contact: 'צור קשר',
    cart: 'עגלה',
  },
  header: {
    searchPlaceholder: 'חיפוש מוצרים...',
    freeShipping: 'משלוח חינם בהזמנה מעל ₪300',
    wishlist: 'מועדפים',
    support: 'תמיכה ועזרה',
    genuine100: 'מוצרים מקוריים 100%',
    fastDelivery: 'משלוח מהיר לכל האזורים',
    contactUs: 'צרו קשר',
    openNow: 'פתוח עכשיו',
    closed: 'סגור',
    opensAt: (time: string) => `נפתח ב-${time}`,
    untilClose: (time: string) => `עד ${time}`,
  },
  hero: {
    badge: 'משלוחים מהירים לכל הארץ',
    titleTop: 'כל מה שצריך',
    titleBottom: 'לבית נקי ומטופח',
    subtitle: 'מגוון רחב של מוצרי ניקיון וטיפוח לבית, במחירים משתלמים ובמשלוח עד הבית.',
    ctaShop: 'לרכישה',
    shopNow: 'קנו עכשיו',
    ctaBrowse: 'לכל המוצרים',
    trust1: 'מוצרים מקוריים',
    trust2: 'משלוח עד הבית',
    trust3: 'תשלום מאובטח',
    featured: 'מוצר נבחר',
    prev: 'שקופית קודמת',
    next: 'שקופית הבאה',
    goToSlide: (n: number) => `מעבר לשקופית ${n}`,
    marketingLabel: 'ראגוה',
    eyebrow: 'ניקיון · טיפוח · יום־יום',
    campaigns: [
      {
        lead: 'כל מה שהבית שלך צריך...',
        emph: 'במקום אחד',
        subtitle: 'ניקיון, טיפוח ומוצרים ליום־יום במחירים שמתאימים לך.',
        cta: 'קנו עכשיו',
      },
      {
        lead: 'בית נקי יותר...',
        emph: 'חיים יפים יותר',
        subtitle: 'מוצרים נבחרים שיעזרו לכם לשמור על בית נקי ומסודר בכל יום.',
        cta: 'גלו את המוצרים',
      },
      {
        lead: 'כל מה שהבית צריך,',
        emph: 'קרוב אליכם',
        subtitle: 'מניקיון וכביסה ועד טיפוח אישי ומוצרים לשימוש יומיומי.',
        cta: 'התחילו לקנות',
      },
    ],
  },
  benefits: {
    fastTitle: 'משלוח מהיר',
    fastSub: 'לכל האזורים',
    genuineTitle: 'מוצרים מקוריים',
    genuineSub: 'מהמותגים המובילים',
    payTitle: 'תשלום מאובטח',
    paySub: 'אמצעי תשלום מגוונים',
  },
  categories: {
    heading: 'הקטגוריות הראשיות',
    subheading: 'קנו לפי הצורך שלכם',
    viewAll: 'כל הקטגוריות',
    all: 'כל הקטגוריות',
    countProducts: (n: number) => `${n} מוצרים`,
  },
  sections: {
    saleTitle: 'מוצרים במבצע',
    saleSub: 'המבצעים הטובים ביותר לזמן מוגבל',
    saleViewAll: 'כל המבצעים',
    featuredTitle: 'מוצרים מובחרים',
    featuredSub: 'מוצרים שנבחרו בקפידה',
    featuredViewAll: 'כל המוצרים',
  },
  products: {
    heading: 'המוצרים שלנו',
    subheading: 'כל מה שהחנות מציעה',
    featured: 'מוצרים נבחרים',
    inStock: 'במלאי',
    outOfStock: 'אזל מהמלאי',
    addToCart: 'הוסף לעגלה',
    added: 'נוסף!',
    found: (n: number) => `${n} מוצרים`,
    empty: 'לא נמצאו מוצרים',
    emptyHint: 'נסו לשנות את הסינון',
    sort: 'מיון',
    sortRelevance: 'ברירת מחדל',
    sortPriceAsc: 'מחיר: מהנמוך לגבוה',
    sortPriceDesc: 'מחיר: מהגבוה לנמוך',
    sortName: 'שם',
    filters: 'סינון',
    priceRange: (min: number, max: number) => `טווח מחיר: ₪${min} – ₪${max}`,
    discountOff: (pct: number) => `הנחה ${pct}%`,
    wasPrice: 'מחיר קודם',
  },
  product: {
    quantity: 'כמות',
    buyNow: 'קנה עכשיו',
    tabDescription: 'תיאור',
    tabDetails: 'פרטים',
    related: 'מוצרים דומים',
    noDescription: 'אין תיאור זמין למוצר זה.',
    fieldCategory: 'קטגוריה',
    fieldBrand: 'מותג',
    fieldBarcode: 'ברקוד',
    fieldWeight: 'משקל',
    grams: 'גרם',
  },
  cart: {
    title: 'עגלת הקניות',
    empty: 'העגלה ריקה',
    emptyHint: 'הוסיפו מוצרים כדי להמשיך',
    browse: 'למוצרים',
    perUnit: 'ליחידה',
    remove: 'הסר',
    subtotal: 'סכום ביניים',
    shipping: 'משלוח',
    free: 'חינם',
    total: 'סה"כ',
    checkout: 'מעבר לתשלום',
    continue: 'המשך בקנייה',
    addMore: (amount: string) => `הוסיפו עוד ₪${amount} למשלוח חינם`,
  },
  checkout: {
    title: 'סיום הזמנה',
    step1: 'פרטים',
    step2: 'משלוח',
    step3: 'אישור',
    contactHeading: 'פרטי לקוח',
    name: 'שם מלא',
    phone: 'טלפון',
    email: 'אימייל',
    address: 'כתובת',
    city: 'עיר',
    zip: 'מיקוד',
    note: 'הערה להזמנה',
    noteOptional: 'הערה (רשות)',
    fulfilmentHeading: 'אופן קבלת ההזמנה',
    delivery: 'משלוח עד הבית',
    pickup: 'איסוף עצמי',
    paymentHeading: 'תשלום',
    cod: 'תשלום במזומן בעת הקבלה',
    next: 'המשך',
    back: 'חזרה',
    review: 'סקירת ההזמנה',
    place: (total: string) => `בצע הזמנה — ₪${total}`,
    placing: 'שולח הזמנה...',
    successTitle: 'ההזמנה התקבלה!',
    successBody: 'החנות קיבלה את ההזמנה ותיצור איתכם קשר בהקדם.',
    error: 'שליחת ההזמנה נכשלה. נסו שוב.',
    required: 'שדה חובה',
  },
  wishlist: {
    title: 'המועדפים שלי',
    empty: 'אין עדיין מוצרים במועדפים',
    emptyHint: 'סמנו מוצרים בלב כדי לשמור אותם כאן',
    browse: 'למוצרים',
  },
  footer: {
    tagline: 'מוצרי ניקיון וטיפוח לבית, עם משלוח עד הבית.',
    categories: 'קטגוריות',
    service: 'שירות לקוחות',
    contact: 'יצירת קשר',
    rights: (year: number) => `© ${year} ראגוה. כל הזכויות שמורות.`,
    faq: 'שאלות נפוצות',
    returns: 'מדיניות החזרות',
    track: 'מעקב הזמנה',
    terms: 'תנאי שימוש',
    privacy: 'מדיניות פרטיות',
  },
  common: {
    loading: 'טוען...',
    catalogError: 'טעינת הקטלוג נכשלה. רעננו את הדף.',
    currency: '₪',
    close: 'סגור',
    menu: 'תפריט',
  },
}

const ar: Strings = {
  brand: 'رغوة',
  nav: {
    home: 'الرئيسية',
    catalog: 'كتالوج المنتجات',
    allProducts: 'جميع المنتجات',
    categories: 'الفئات',
    offers: 'العروض',
    about: 'من نحن',
    contact: 'اتصل بنا',
    cart: 'السلة',
  },
  header: {
    searchPlaceholder: 'ابحث عن منتجات...',
    freeShipping: 'توصيل مجاني للطلبات فوق ₪300',
    wishlist: 'المفضلة',
    support: 'دعم ومساعدة',
    genuine100: 'منتجات أصلية 100%',
    fastDelivery: 'توصيل سريع لجميع المناطق',
    contactUs: 'تواصل معنا',
    openNow: 'مفتوح الآن',
    closed: 'مغلق',
    opensAt: (time: string) => `يفتح الساعة ${time}`,
    untilClose: (time: string) => `حتى ${time}`,
  },
  hero: {
    badge: 'توصيل سريع لكل البلاد',
    titleTop: 'كل ما تحتاجه',
    titleBottom: 'لمنزل نظيف ومرتّب',
    subtitle: 'تشكيلة واسعة من مواد التنظيف والعناية بالمنزل، بأسعار مناسبة ومع توصيل حتى الباب.',
    ctaShop: 'للشراء',
    shopNow: 'تسوّق الآن',
    ctaBrowse: 'كل المنتجات',
    trust1: 'منتجات أصلية',
    trust2: 'توصيل حتى الباب',
    trust3: 'دفع آمن',
    featured: 'منتج مختار',
    prev: 'الشريحة السابقة',
    next: 'الشريحة التالية',
    goToSlide: (n: number) => `الانتقال إلى الشريحة ${n}`,
    marketingLabel: 'رغوة',
    eyebrow: 'نظافة · عناية · كل يوم',
    campaigns: [
      {
        lead: 'كل ما يحتاجه منزلك...',
        emph: 'بمكان واحد',
        subtitle: 'نظافة، عناية ومنتجات يومية بأسعار تناسبك.',
        cta: 'تسوّق الآن',
      },
      {
        lead: 'منزل أنظف...',
        emph: 'حياة أجمل',
        subtitle: 'منتجات مختارة تساعدك تحافظ على بيت نظيف ومرتب كل يوم.',
        cta: 'اكتشف المنتجات',
      },
      {
        lead: 'كل احتياجات البيت',
        emph: 'أقرب إليك',
        subtitle: 'من التنظيف والغسيل إلى العناية الشخصية والمستلزمات اليومية.',
        cta: 'ابدأ التسوق',
      },
    ],
  },
  benefits: {
    fastTitle: 'توصيل سريع',
    fastSub: 'لجميع المناطق',
    genuineTitle: 'منتجات أصلية',
    genuineSub: 'من أشهر الماركات',
    payTitle: 'دفع آمن',
    paySub: 'وسائل دفع متعددة',
  },
  categories: {
    heading: 'الفئات الرئيسية',
    subheading: 'تسوّق حسب احتياجاتك',
    viewAll: 'كل الفئات',
    all: 'كل الفئات',
    countProducts: (n: number) => `${n} منتجات`,
  },
  sections: {
    saleTitle: 'منتجات عليها تخفيضات',
    saleSub: 'أفضل العروض لفترة محدودة',
    saleViewAll: 'كل العروض',
    featuredTitle: 'منتجات مميزة',
    featuredSub: 'منتجات مختارة بعناية',
    featuredViewAll: 'كل المنتجات',
  },
  products: {
    heading: 'منتجاتنا',
    subheading: 'كل ما يقدّمه المتجر',
    featured: 'منتجات مختارة',
    inStock: 'متوفر',
    outOfStock: 'غير متوفر',
    addToCart: 'أضف إلى السلة',
    added: 'تمت الإضافة!',
    found: (n: number) => `${n} منتجات`,
    empty: 'لا توجد منتجات',
    emptyHint: 'جرّب تغيير الفلاتر',
    sort: 'ترتيب',
    sortRelevance: 'افتراضي',
    sortPriceAsc: 'السعر: من الأقل للأعلى',
    sortPriceDesc: 'السعر: من الأعلى للأقل',
    sortName: 'الاسم',
    filters: 'تصفية',
    priceRange: (min: number, max: number) => `نطاق السعر: ₪${min} – ₪${max}`,
    discountOff: (pct: number) => `خصم ${pct}%`,
    wasPrice: 'السعر السابق',
  },
  product: {
    quantity: 'الكمية',
    buyNow: 'اشترِ الآن',
    tabDescription: 'الوصف',
    tabDetails: 'تفاصيل',
    related: 'منتجات مشابهة',
    noDescription: 'لا يوجد وصف لهذا المنتج.',
    fieldCategory: 'الفئة',
    fieldBrand: 'العلامة التجارية',
    fieldBarcode: 'الباركود',
    fieldWeight: 'الوزن',
    grams: 'غرام',
  },
  cart: {
    title: 'سلة التسوّق',
    empty: 'السلة فارغة',
    emptyHint: 'أضف منتجات للمتابعة',
    browse: 'إلى المنتجات',
    perUnit: 'للوحدة',
    remove: 'إزالة',
    subtotal: 'المجموع الفرعي',
    shipping: 'التوصيل',
    free: 'مجاني',
    total: 'الإجمالي',
    checkout: 'إتمام الطلب',
    continue: 'متابعة التسوّق',
    addMore: (amount: string) => `أضف ₪${amount} للحصول على توصيل مجاني`,
  },
  checkout: {
    title: 'إتمام الطلب',
    step1: 'البيانات',
    step2: 'التوصيل',
    step3: 'التأكيد',
    contactHeading: 'بيانات الزبون',
    name: 'الاسم الكامل',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    address: 'العنوان',
    city: 'المدينة',
    zip: 'الرمز البريدي',
    note: 'ملاحظة على الطلب',
    noteOptional: 'ملاحظة (اختياري)',
    fulfilmentHeading: 'طريقة استلام الطلب',
    delivery: 'توصيل حتى الباب',
    pickup: 'استلام ذاتي',
    paymentHeading: 'الدفع',
    cod: 'الدفع نقدًا عند الاستلام',
    next: 'متابعة',
    back: 'رجوع',
    review: 'مراجعة الطلب',
    place: (total: string) => `تأكيد الطلب — ₪${total}`,
    placing: 'جارٍ إرسال الطلب...',
    successTitle: 'تم استلام طلبك!',
    successBody: 'استلم المتجر طلبك وسيتواصل معك قريبًا.',
    error: 'فشل إرسال الطلب. حاول مرة أخرى.',
    required: 'حقل مطلوب',
  },
  wishlist: {
    title: 'المفضلة لديّ',
    empty: 'لا توجد منتجات في المفضلة بعد',
    emptyHint: 'اضغط القلب على أي منتج لحفظه هنا',
    browse: 'إلى المنتجات',
  },
  footer: {
    tagline: 'مواد تنظيف وعناية بالمنزل، مع توصيل حتى الباب.',
    categories: 'الفئات',
    service: 'خدمة الزبائن',
    contact: 'تواصل معنا',
    rights: (year: number) => `© ${year} رغوة. جميع الحقوق محفوظة.`,
    faq: 'أسئلة شائعة',
    returns: 'سياسة الإرجاع',
    track: 'تتبّع الطلب',
    terms: 'شروط الاستخدام',
    privacy: 'سياسة الخصوصية',
  },
  common: {
    loading: 'جارٍ التحميل...',
    catalogError: 'فشل تحميل الكتالوج. حدّث الصفحة.',
    currency: '₪',
    close: 'إغلاق',
    menu: 'القائمة',
  },
}

const en: Strings = {
  brand: 'Ragwa',
  nav: {
    home: 'Home',
    catalog: 'Catalog',
    allProducts: 'All products',
    categories: 'Categories',
    offers: 'Offers',
    about: 'About',
    contact: 'Contact',
    cart: 'Cart',
  },
  header: {
    searchPlaceholder: 'Search products...',
    freeShipping: 'Free delivery on orders over ₪300',
    wishlist: 'Wishlist',
    support: 'Help & support',
    genuine100: '100% genuine products',
    fastDelivery: 'Fast delivery everywhere',
    contactUs: 'Contact us',
    openNow: 'Open now',
    closed: 'Closed',
    opensAt: (time: string) => `Opens at ${time}`,
    untilClose: (time: string) => `until ${time}`,
  },
  hero: {
    badge: 'Fast delivery nationwide',
    titleTop: 'Everything you need',
    titleBottom: 'for a clean, cared-for home',
    subtitle: 'A wide range of cleaning and household-care products at fair prices, delivered to your door.',
    ctaShop: 'Shop now',
    shopNow: 'Shop now',
    ctaBrowse: 'Browse all',
    trust1: 'Genuine products',
    trust2: 'Door-to-door delivery',
    trust3: 'Secure payment',
    featured: 'Featured',
    prev: 'Previous slide',
    next: 'Next slide',
    goToSlide: (n: number) => `Go to slide ${n}`,
    marketingLabel: 'Ragwa',
    eyebrow: 'Cleaning · Care · Everyday',
    campaigns: [
      {
        lead: 'Everything your home needs...',
        emph: 'in one place',
        subtitle: 'Cleaning, care and everyday essentials at prices that fit you.',
        cta: 'Shop Now',
      },
      {
        lead: 'A cleaner home...',
        emph: 'a better life',
        subtitle: 'Carefully selected products to keep your home clean and organized every day.',
        cta: 'Discover Products',
      },
      {
        lead: 'Everything for your home,',
        emph: 'closer to you',
        subtitle: 'From cleaning and laundry to personal care and everyday essentials.',
        cta: 'Start Shopping',
      },
    ],
  },
  benefits: {
    fastTitle: 'Fast delivery',
    fastSub: 'to all areas',
    genuineTitle: 'Genuine products',
    genuineSub: 'from top brands',
    payTitle: 'Secure payment',
    paySub: 'multiple payment methods',
  },
  categories: {
    heading: 'Main categories',
    subheading: 'Shop by what you need',
    viewAll: 'All categories',
    all: 'All categories',
    countProducts: (n: number) => `${n} products`,
  },
  sections: {
    saleTitle: 'Products on sale',
    saleSub: 'Best deals, for a limited time',
    saleViewAll: 'All offers',
    featuredTitle: 'Featured products',
    featuredSub: 'Hand-picked for you',
    featuredViewAll: 'All products',
  },
  products: {
    heading: 'Our products',
    subheading: 'Everything the shop stocks',
    featured: 'Featured products',
    inStock: 'In stock',
    outOfStock: 'Out of stock',
    addToCart: 'Add to cart',
    added: 'Added!',
    found: (n: number) => `${n} products`,
    empty: 'No products found',
    emptyHint: 'Try changing the filters',
    sort: 'Sort',
    sortRelevance: 'Default',
    sortPriceAsc: 'Price: low to high',
    sortPriceDesc: 'Price: high to low',
    sortName: 'Name',
    filters: 'Filters',
    priceRange: (min: number, max: number) => `Price range: ₪${min} – ₪${max}`,
    discountOff: (pct: number) => `${pct}% off`,
    wasPrice: 'Was',
  },
  product: {
    quantity: 'Quantity',
    buyNow: 'Buy now',
    tabDescription: 'Description',
    tabDetails: 'Details',
    related: 'Related products',
    noDescription: 'No description available for this product.',
    fieldCategory: 'Category',
    fieldBrand: 'Brand',
    fieldBarcode: 'Barcode',
    fieldWeight: 'Weight',
    grams: 'g',
  },
  cart: {
    title: 'Shopping cart',
    empty: 'Your cart is empty',
    emptyHint: 'Add products to continue',
    browse: 'Browse products',
    perUnit: 'per unit',
    remove: 'Remove',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    total: 'Total',
    checkout: 'Checkout',
    continue: 'Continue shopping',
    addMore: (amount: string) => `Add ₪${amount} more for free delivery`,
  },
  checkout: {
    title: 'Checkout',
    step1: 'Details',
    step2: 'Delivery',
    step3: 'Confirm',
    contactHeading: 'Customer details',
    name: 'Full name',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    city: 'City',
    zip: 'Postal code',
    note: 'Order note',
    noteOptional: 'Note (optional)',
    fulfilmentHeading: 'How to receive the order',
    delivery: 'Door-to-door delivery',
    pickup: 'Self pickup',
    paymentHeading: 'Payment',
    cod: 'Cash on delivery',
    next: 'Continue',
    back: 'Back',
    review: 'Review your order',
    place: (total: string) => `Place order — ₪${total}`,
    placing: 'Sending order...',
    successTitle: 'Order received!',
    successBody: 'The shop has received your order and will contact you shortly.',
    error: 'Could not send the order. Please try again.',
    required: 'Required field',
  },
  wishlist: {
    title: 'My wishlist',
    empty: 'No products in your wishlist yet',
    emptyHint: 'Tap the heart on any product to save it here',
    browse: 'Browse products',
  },
  footer: {
    tagline: 'Cleaning and household-care products, delivered to your door.',
    categories: 'Categories',
    service: 'Customer service',
    contact: 'Get in touch',
    rights: (year: number) => `© ${year} Ragwa. All rights reserved.`,
    faq: 'FAQ',
    returns: 'Returns policy',
    track: 'Track order',
    terms: 'Terms of use',
    privacy: 'Privacy policy',
  },
  common: {
    loading: 'Loading...',
    catalogError: 'Failed to load the catalog. Refresh the page.',
    currency: '₪',
    close: 'Close',
    menu: 'Menu',
  },
}

// `he` fixes the shape; `ar` and `en` are checked against it.
export type Strings = typeof he
const DICTS: Record<Locale, Strings> = { he, ar, en }

// ─────────────────────────────────────────────────────────────────────────────
// i18n value helpers — for Firestore documents that hold either an
// { en, ar, he } map or a legacy plain string.
// ─────────────────────────────────────────────────────────────────────────────
export type I18nValue = string | { en?: string; ar?: string; he?: string } | null | undefined

export function pickI18n(value: I18nValue, locale: Locale): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (typeof value !== 'object') return ''
  const map = value as Record<string, unknown>
  const tryKey = (k: string) => (typeof map[k] === 'string' && (map[k] as string).trim() ? (map[k] as string) : '')
  const direct = tryKey(locale)
  if (direct) return direct
  for (const fb of FALLBACK_ORDER) {
    const v = tryKey(fb)
    if (v) return v
  }
  for (const k of Object.keys(map)) {
    const v = tryKey(k)
    if (v) return v
  }
  return ''
}

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'ragwa.locale'

interface I18nContextValue {
  locale: Locale
  dir: 'rtl' | 'ltr'
  setLocale: (l: Locale) => void
  t: Strings
  tr: (value: I18nValue) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readStoredLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && (LOCALES as readonly string[]).includes(saved)) return saved as Locale
  } catch {
    // localStorage unavailable (private mode, blocked cookies) — fall through.
  }
  return DEFAULT_LOCALE
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  const dir = LOCALE_DIR[locale]

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = dir
  }, [locale, dir])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      // Non-fatal — the choice just won't persist across reloads.
    }
  }, [])

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dir,
      setLocale,
      t: DICTS[locale],
      tr: (v: I18nValue) => pickI18n(v, locale),
    }),
    [locale, dir, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>')
  return ctx
}
