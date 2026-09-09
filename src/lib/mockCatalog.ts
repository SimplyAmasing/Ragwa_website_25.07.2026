// AUTO-GENERATED mock catalog from Chekchak_cleaning_products_READY_WITH_PRICES.xlsx.
// Local UI-review only, while VITE_WORKER_URL is unset (see catalog.ts).
// Product photos served from public/mock-images/ (gitignored).
//
// NOTE: `effective_price` below carries DEV-ONLY fake discounts on a handful
// of products so the "Products on Sale" section can be reviewed. This is mock
// data — it never touches the real catalog. Real discounts come from
// item_shop_links.is_app_discounted via the Worker.
import type { WorkerCatalog } from './api'

export const MOCK_CATALOG: WorkerCatalog = {
  "shop": {
    "id": "f25fb6a4a30d4018abae",
    "name": {
      "he": "רגוה",
      "ar": "رغوة",
      "en": "Ragwa"
    },
    "logo_key": null,
    "delivery_fee": 29.9,
    "currency": "ILS"
  },
  "products": [
    {
      "link_id": "mock-1",
      "item_id": "item-1",
      "name": {
        "he": "פאלמוליב קלאסי",
        "ar": "بالموليف كلاسيك",
        "en": "Palmolive Classic"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/1.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 9.68,
      "stock": 99,
      "category_id": "dish-kitchen-cleaning"
    },
    {
      "link_id": "mock-2",
      "item_id": "item-2",
      "name": {
        "he": "צמד מטליות הפלא לרצפה",
        "ar": "عبوتان من أقمشة مايكروفايبر للأرضيات",
        "en": "2 Microfiber Floor Cloths"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/2.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-3",
      "item_id": "item-3",
      "name": {
        "he": "שלישיית מטליות הפלא לניקוי כללי",
        "ar": "عبوة 3 أقمشة مايكروفايبر للتنظيف العام",
        "en": "3 Microfiber General Cleaning Cloths"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/3.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-4",
      "item_id": "item-4",
      "name": {
        "he": "כפפות אלוורה לארג",
        "ar": "قفازات ألوفيرا كبير",
        "en": "Aloe Vera Cleaning Gloves Large"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/4.jpg",
      "image_mobile": null,
      "price": 8.9,
      "effective_price": 8.9,
      "stock": 99,
      "category_id": "cleaning-gloves"
    },
    {
      "link_id": "mock-5",
      "item_id": "item-5",
      "name": {
        "he": "כפפות אלוורה מידיום",
        "ar": "قفازات ألوفيرا متوسط",
        "en": "Aloe Vera Cleaning Gloves Medium"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/5.jpg",
      "image_mobile": null,
      "price": 8.9,
      "effective_price": 8.9,
      "stock": 99,
      "category_id": "cleaning-gloves"
    },
    {
      "link_id": "mock-6",
      "item_id": "item-6",
      "name": {
        "he": "כפפות אלוורה סמול",
        "ar": "قفازات ألوفيرا صغير",
        "en": "Aloe Vera Cleaning Gloves Small"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/6.jpg",
      "image_mobile": null,
      "price": 8.9,
      "effective_price": 8.9,
      "stock": 99,
      "category_id": "cleaning-gloves"
    },
    {
      "link_id": "mock-7",
      "item_id": "item-7",
      "name": {
        "he": "ריצפז מטליות לחות לניקוי הרצפה",
        "ar": "ريتسباز مناديل مبللة لتنظيف الأرضيات",
        "en": "Ritzpaz Wet Floor Cleaning Wipes"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/7.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-8",
      "item_id": "item-8",
      "name": {
        "he": "ריצפז פרש הום מטליות לחות לניקוי הרצפה",
        "ar": "ريتسباز فريش هوم مناديل مبللة لتنظيف الأرضيات",
        "en": "Ritzpaz Fresh Home Wet Floor Cleaning Wipes"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/8.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-9",
      "item_id": "item-9",
      "name": {
        "he": "ריצפז פרש הום מטליות לחות לניקוי הרצפה",
        "ar": "ريتسباز فريش هوم مناديل مبللة لتنظيف الأرضيات",
        "en": "Ritzpaz Fresh Home Wet Floor Cleaning Wipes"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/9.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-10",
      "item_id": "item-10",
      "name": {
        "he": "ריצפז פרש מטליות לחות לניקוי הרצפה",
        "ar": "ريتسباز فريش مناديل مبللة لتنظيف الأرضيات",
        "en": "Ritzpaz Fresh Wet Floor Cleaning Wipes"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/10.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-11",
      "item_id": "item-11",
      "name": {
        "he": "ריצפז פרש הום מטליות לחות לניקוי הרצפה",
        "ar": "ريتسباز فريش هوم مناديل مبللة لتنظيف الأرضيات",
        "en": "Ritzpaz Fresh Home Wet Floor Cleaning Wipes"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/11.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-12",
      "item_id": "item-12",
      "name": {
        "he": "ריצפז פרש מטליות לחות לניקוי הרצפה בניחוח מאסק",
        "ar": "ريتسباز فريش مناديل مبللة لتنظيف الأرضيات برائحة المسك",
        "en": "Ritzpaz Fresh Wet Floor Cleaning Wipes - Musk"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/12.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-13",
      "item_id": "item-13",
      "name": {
        "he": "כרית קרצוף עם סיבי נירוסטה",
        "ar": "ليفة فرك بألياف ستانلس ستيل",
        "en": "Stainless Steel Fiber Scouring Pad"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/13.jpg",
      "image_mobile": null,
      "price": 6.9,
      "effective_price": 6.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-14",
      "item_id": "item-14",
      "name": {
        "he": "מטלית הפלא לרצפה",
        "ar": "قطعة مايكروفايبر للأرضيات",
        "en": "Microfiber Floor Cloth"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/14.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 12.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-15",
      "item_id": "item-15",
      "name": {
        "he": "מטלית חלומית לניקוי כללי",
        "ar": "قطعة مايكروفايبر للتنظيف العام",
        "en": "Microfiber General Cleaning Cloth"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/15.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-16",
      "item_id": "item-16",
      "name": {
        "he": "מטלית חלומית לרצפה",
        "ar": "قطعة مايكروفايبر للأرضيات",
        "en": "Microfiber Floor Cloth"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/16.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-17",
      "item_id": "item-17",
      "name": {
        "he": "איירוויק לייף סנטס מקלות ריחניים",
        "ar": "إير ويك لايف سنتس أعواد معطرة",
        "en": "Air Wick Life Scents Scented Reed Sticks"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/17.jpg",
      "image_mobile": null,
      "price": 20.9,
      "effective_price": 20.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-18",
      "item_id": "item-18",
      "name": {
        "he": "איירוויק לייף סנטס מקלות ריחניים",
        "ar": "إير ويك لايف سنتس أعواد معطرة",
        "en": "Air Wick Life Scents Scented Reed Sticks"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/18.jpg",
      "image_mobile": null,
      "price": 20.9,
      "effective_price": 20.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-19",
      "item_id": "item-19",
      "name": {
        "he": "איירוויק לייף סנטס מקלות ריחניים סוויט לבנדר דייז",
        "ar": "إير ويك لايف سنتس أعواد معطرة سويت لافندر دايز",
        "en": "Air Wick Life Scents Scented Reed Sticks Sweet Lavender Days"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/19.jpg",
      "image_mobile": null,
      "price": 20.9,
      "effective_price": 20.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-20",
      "item_id": "item-20",
      "name": {
        "he": "איירוויק לייף סנטס שמן ריחני",
        "ar": "إير ويك لايف سنتس زيت عطري",
        "en": "Air Wick Life Scents Fragrance Oil"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/20.jpg",
      "image_mobile": null,
      "price": 25.9,
      "effective_price": 25.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-21",
      "item_id": "item-21",
      "name": {
        "he": "איירוויק מפיץ ריח חשמלי",
        "ar": "إير ويك معطر كهربائي",
        "en": "Air Wick Electric Air Freshener"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/21.jpg",
      "image_mobile": null,
      "price": 32.2,
      "effective_price": 25.76,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-22",
      "item_id": "item-22",
      "name": {
        "he": "סנו מים מזוקקים",
        "ar": "سانو ماء مقطر",
        "en": "Sano Distilled Water"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/22.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "home-accessories"
    },
    {
      "link_id": "mock-23",
      "item_id": "item-23",
      "name": {
        "he": "סנו נייר אפייה 50 יחידות",
        "ar": "سانو ورق خبز 50 وحدة",
        "en": "Sano Baking Paper 50 Units"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/23.jpg",
      "image_mobile": null,
      "price": 10.9,
      "effective_price": 10.9,
      "stock": 99,
      "category_id": "disposable-kitchen-accessories"
    },
    {
      "link_id": "mock-24",
      "item_id": "item-24",
      "name": {
        "he": "סנו תבניות אלומיניום עם מכסה 10 יחידות",
        "ar": "سانو قوالب ألمنيوم مع غطاء 10 وحدات",
        "en": "Sano Aluminum Trays with Lid 10 Units"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/24.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "disposable-kitchen-accessories"
    },
    {
      "link_id": "mock-25",
      "item_id": "item-25",
      "name": {
        "he": "סנו תבניות אלומיניום לארג' 4 יחידות",
        "ar": "سانو قوالب ألمنيوم كبير 4 وحدات",
        "en": "Sano Aluminum Trays Large 4 Units"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/25.jpg",
      "image_mobile": null,
      "price": 9.9,
      "effective_price": 9.9,
      "stock": 99,
      "category_id": "disposable-kitchen-accessories"
    },
    {
      "link_id": "mock-26",
      "item_id": "item-26",
      "name": {
        "he": "סנו נייר אפייה 100 יחידות",
        "ar": "سانو ورق خبز 100 وحدة",
        "en": "Sano Baking Paper 100 Units"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/26.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "disposable-kitchen-accessories"
    },
    {
      "link_id": "mock-27",
      "item_id": "item-27",
      "name": {
        "he": "סנו תבניות אלומיניום עגולות 6 יחידות",
        "ar": "سانو قوالب ألمنيوم دائرية 6 وحدات",
        "en": "Sano Aluminum Trays Round 6 Units"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/27.jpg",
      "image_mobile": null,
      "price": 9.9,
      "effective_price": 9.9,
      "stock": 99,
      "category_id": "disposable-kitchen-accessories"
    },
    {
      "link_id": "mock-28",
      "item_id": "item-28",
      "name": {
        "he": "סנו אוקסיג'ן פאוור מסיר כתמים 3 ליטר",
        "ar": "سانو أوكسيجين باور مزيل بقع 3 لتر",
        "en": "Sano Oxygen Power Stain Remover 3 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/28.jpg",
      "image_mobile": null,
      "price": 29.9,
      "effective_price": 20.93,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-29",
      "item_id": "item-29",
      "name": {
        "he": "וניש אוקסי אקשן מסיר כתמים",
        "ar": "فانيش أوكسي أكشن مزيل بقع",
        "en": "Vanish Oxi Action Stain Remover"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/29.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 18.92,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-30",
      "item_id": "item-30",
      "name": {
        "he": "סנו אוקסיג'ן פאוור מסיר כתמים קשים 3 ליטר",
        "ar": "سانو أوكسيجين باور مزيل بقع صعبة 3 لتر",
        "en": "Sano Oxygen Power Tough Stain Remover 3 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/30.jpg",
      "image_mobile": null,
      "price": 29.9,
      "effective_price": 29.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-31",
      "item_id": "item-31",
      "name": {
        "he": "סנו אוקסיג'ן פאוור מסיר כתמים ושומר צבע",
        "ar": "سانو أوكسيجين باور مزيل بقع وحافظ للألوان",
        "en": "Sano Oxygen Power Stain Remover & Color Protector"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/31.jpg",
      "image_mobile": null,
      "price": 21.9,
      "effective_price": 21.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-32",
      "item_id": "item-32",
      "name": {
        "he": "מקסימה מבשם למייבש כביסה",
        "ar": "ماكسيما معطر لمجفف الملابس",
        "en": "Maxima Dryer Fragrance"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/32.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-33",
      "item_id": "item-33",
      "name": {
        "he": "מקסימה מרכך כביסה 40 כביסות",
        "ar": "ماكسيما منعم أقمشة 40 غسلة",
        "en": "Maxima Fabric Softener 40 Washes"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/33.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 10.32,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-34",
      "item_id": "item-34",
      "name": {
        "he": "כיף שמפו + מרכך אל-דמע לילדים",
        "ar": "كيف شامبو وبلسم للأطفال بدون دموع",
        "en": "Kif Kids Tear-Free Shampoo & Conditioner"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/34.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-35",
      "item_id": "item-35",
      "name": {
        "he": "כיף שמפו אל-דמע לילדים",
        "ar": "كيف شامبو للأطفال بدون دموع",
        "en": "Kif Kids Tear-Free Shampoo"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/35.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-36",
      "item_id": "item-36",
      "name": {
        "he": "פינוק לילדים שמפו ללא דמעות לסירוק קל",
        "ar": "بينوك شامبو أطفال بدون دموع لتسريح سهل",
        "en": "Pinuk Kids Tear-Free Detangling Shampoo"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/36.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-37",
      "item_id": "item-37",
      "name": {
        "he": "סופט מפיות 2 שכבות 500 יחידות",
        "ar": "سوفت مناديل طبقتان 500 وحدة",
        "en": "Soft Napkins 2 Ply 500 Units"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/37.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "paper-paper-products"
    },
    {
      "link_id": "mock-38",
      "item_id": "item-38",
      "name": {
        "he": "סנו סושי מגבות הפלא",
        "ar": "سانو سوشي مناشف متعددة الاستخدام",
        "en": "Sano Sushi Multipurpose Towels"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/38.jpg",
      "image_mobile": null,
      "price": 22.9,
      "effective_price": 22.9,
      "stock": 99,
      "category_id": "paper-paper-products"
    },
    {
      "link_id": "mock-39",
      "item_id": "item-39",
      "name": {
        "he": "סופט רכות מפנקת 32 גלילים",
        "ar": "سوفت نعومة فائقة 32 لفة",
        "en": "Soft Pampering Softness 32 Rolls"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/39.jpg",
      "image_mobile": null,
      "price": 29.9,
      "effective_price": 25.41,
      "stock": 99,
      "category_id": "paper-paper-products"
    },
    {
      "link_id": "mock-40",
      "item_id": "item-40",
      "name": {
        "he": "סופט רכות מפנקת 18 גלילים כפולים",
        "ar": "سوفت نعومة فائقة 18 لفة مزدوجة",
        "en": "Soft Pampering Softness 18 Rolls Double"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/40.jpg",
      "image_mobile": null,
      "price": 42.9,
      "effective_price": 42.9,
      "stock": 99,
      "category_id": "paper-paper-products"
    },
    {
      "link_id": "mock-41",
      "item_id": "item-41",
      "name": {
        "he": "כביסכל מבשם פרוביוטי רב תכליתי ארומטי",
        "ar": "كفيسكول معطر بروبيوتيك متعدد الاستخدامات أروماتيك",
        "en": "Kviskol Multipurpose Probiotic Fragrance Aromatic"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/41.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-42",
      "item_id": "item-42",
      "name": {
        "he": "כביסכל מבשם פרוביוטי רב תכליתי אלגנס",
        "ar": "كفيسكول معطر بروبيوتيك متعدد الاستخدامات إليغانس",
        "en": "Kviskol Multipurpose Probiotic Fragrance Elegance"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/42.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-43",
      "item_id": "item-43",
      "name": {
        "he": "כביסכל מבשם פרוביוטי רב תכליתי בייבי",
        "ar": "كفيسكول معطر بروبيوتيك متعدد الاستخدامات بيبي",
        "en": "Kviskol Multipurpose Probiotic Fragrance Baby"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/43.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-44",
      "item_id": "item-44",
      "name": {
        "he": "כביסכל נוזל כביסה פרוביוטי בניחוח פרידום 2 ליטר",
        "ar": "كفيسكول سائل غسيل بروبيوتيك برائحة فريدوم 2 لتر",
        "en": "Kviskol Probiotic Laundry Liquid Scent Freedom 2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/44.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-45",
      "item_id": "item-45",
      "name": {
        "he": "כביסכל נוזל כביסה פרוביוטי בניחוח אלגנס 2 ליטר",
        "ar": "كفيسكول سائل غسيل بروبيوتيك برائحة إليغانس 2 لتر",
        "en": "Kviskol Probiotic Laundry Liquid Scent Elegance 2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/45.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-46",
      "item_id": "item-46",
      "name": {
        "he": "כביסכל נוזל כביסה פרוביוטי בניחוח בייבי 2 ליטר",
        "ar": "كفيسكول سائل غسيل بروبيوتيك برائحة بيبي 2 لتر",
        "en": "Kviskol Probiotic Laundry Liquid Scent Baby 2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/46.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-47",
      "item_id": "item-47",
      "name": {
        "he": "כביסכל נוזל כביסה פרוביוטי ספורט 2 ליטר",
        "ar": "كفيسكول سائل غسيل بروبيوتيك سبورت 2 لتر",
        "en": "Kviskol Probiotic Laundry Liquid Sport 2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/47.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-48",
      "item_id": "item-48",
      "name": {
        "he": "כביסכל נוזל כביסה פרוביוטי בניחוח ארומטי 2 ליטר",
        "ar": "كفيسكول سائل غسيل بروبيوتيك برائحة أروماتيك 2 لتر",
        "en": "Kviskol Probiotic Laundry Liquid Scent Aromatic 2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/48.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-49",
      "item_id": "item-49",
      "name": {
        "he": "כביסכל נוזל כביסה פרוביוטי בניחוח סופט קייר 2 ליטר",
        "ar": "كفيسكول سائل غسيل بروبيوتيك برائحة سوفت كير 2 لتر",
        "en": "Kviskol Probiotic Laundry Liquid Scent Soft Care 2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/49.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-50",
      "item_id": "item-50",
      "name": {
        "he": "כביסכל נוזל כביסה פרוביוטי בניחוח מאסק פלאוורס 2 ליטר",
        "ar": "كفيسكول سائل غسيل بروبيوتيك برائحة ماسك فلاورز 2 لتر",
        "en": "Kviskol Probiotic Laundry Liquid Scent Musk Flowers 2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/50.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-51",
      "item_id": "item-51",
      "name": {
        "he": "כביסכל נוזל כביסה פרוביוטי בניחוח רוז 2 ליטר",
        "ar": "كفيسكول سائل غسيل بروبيوتيك برائحة روز 2 لتر",
        "en": "Kviskol Probiotic Laundry Liquid Scent Rose 2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/51.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-52",
      "item_id": "item-52",
      "name": {
        "he": "כביסכל נוזל כביסה פרוביוטי בניחוח ספא 2 ליטר",
        "ar": "كفيسكول سائل غسيل بروبيوتيك برائحة سبا 2 لتر",
        "en": "Kviskol Probiotic Laundry Liquid Scent Spa 2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/52.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-53",
      "item_id": "item-53",
      "name": {
        "he": "לנור אנסטופבלס בניחוח אריאל",
        "ar": "لينور أنستوبابلز برائحة أريال",
        "en": "Lenor Unstoppables Scent Ariel"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/53.jpg",
      "image_mobile": null,
      "price": 29.9,
      "effective_price": 29.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-54",
      "item_id": "item-54",
      "name": {
        "he": "לנור אנסטופבלס פרש",
        "ar": "لينور أنستوبابلز فريش",
        "en": "Lenor Unstoppables Fresh"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/54.jpg",
      "image_mobile": null,
      "price": 29.9,
      "effective_price": 29.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-55",
      "item_id": "item-55",
      "name": {
        "he": "ויולט סופט טאץ' נייר טואלט 32 גלילים",
        "ar": "فيوليت سوفت تاتش ورق تواليت 32 لفة",
        "en": "Violet Soft Touch Toilet Paper 32 Rolls"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/55.jpg",
      "image_mobile": null,
      "price": 29.9,
      "effective_price": 26.91,
      "stock": 99,
      "category_id": "paper-paper-products"
    },
    {
      "link_id": "mock-56",
      "item_id": "item-56",
      "name": {
        "he": "מקסימה מרכך כביסה מרוכז סופר בייבי",
        "ar": "ماكسيما منعم أقمشة مركز سوبر بيبي",
        "en": "Maxima Fabric Softener Concentrated Super Baby"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/56.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-57",
      "item_id": "item-57",
      "name": {
        "he": "קלין טופ פרו CS-777 נוזל לניקוי ובישום רצפות 5 ליטר",
        "ar": "كلين توب برو CS-777 سائل تنظيف وتعطير الأرضيات 5 لتر",
        "en": "Clean Top Pro CS-777 Floor Cleaning & Fragrance Liquid 5 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/57.jpg",
      "image_mobile": null,
      "price": 39.9,
      "effective_price": 39.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-58",
      "item_id": "item-58",
      "name": {
        "he": "דפינול נוזל לניקוי רצפות",
        "ar": "ديفينول سائل تنظيف الأرضيات",
        "en": "Definol Floor Cleaning Liquid"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/58.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-59",
      "item_id": "item-59",
      "name": {
        "he": "סנסס שקיות אשפה ריחניות ווטרפול 75×90 ס״מ",
        "ar": "سينسز أكياس نفايات معطرة ووترفول 75×90 سم",
        "en": "Senses Scented Trash Bags Waterfall 75×90 cm"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/59.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "trash-bags"
    },
    {
      "link_id": "mock-60",
      "item_id": "item-60",
      "name": {
        "he": "סנסס שקיות אשפה ריחניות פרידום 75×90 ס״מ",
        "ar": "سينسز أكياس نفايات معطرة فريدوم 75×90 سم",
        "en": "Senses Scented Trash Bags Freedom 75×90 cm"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/60.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "trash-bags"
    },
    {
      "link_id": "mock-61",
      "item_id": "item-61",
      "name": {
        "he": "סנסס שקיות אשפה ריחניות דיימונד 75×90 ס״מ",
        "ar": "سينسز أكياس نفايات معطرة دايموند 75×90 سم",
        "en": "Senses Scented Trash Bags Diamond 75×90 cm"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/61.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "trash-bags"
    },
    {
      "link_id": "mock-62",
      "item_id": "item-62",
      "name": {
        "he": "פינל נוזל כביסה קומפקטי הכחול 2.2 ליטר",
        "ar": "فينال سائل غسيل مركز الأزرق 2.2 لتر",
        "en": "Final Concentrated Laundry Liquid Blue 2.2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/62.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 20.42,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-63",
      "item_id": "item-63",
      "name": {
        "he": "פינל מרכך כביסה קומפקטי הכחול",
        "ar": "فينال منعم أقمشة مركز الأزرق",
        "en": "Final Concentrated Fabric Softener Blue"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/63.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-64",
      "item_id": "item-64",
      "name": {
        "he": "פינל מבשם כביסה הכחול",
        "ar": "فينال معطر غسيل الأزرق",
        "en": "Final Laundry Fragrance Blue"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/64.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-65",
      "item_id": "item-65",
      "name": {
        "he": "בישומית לכביסה בריח מרכך כביסה הכחול",
        "ar": "معطر للغسيل برائحة منعم أقمشة الأزرق",
        "en": "Laundry Fragrance Scent Fabric Softener Blue"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/65.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-66",
      "item_id": "item-66",
      "name": {
        "he": "פינל שמפו רצפות קומפקטי הכחול 2.3 ליטר",
        "ar": "فينال منظف أرضيات مركز الأزرق 2.3 لتر",
        "en": "Final Concentrated Floor Cleaner Blue 2.3 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/66.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-67",
      "item_id": "item-67",
      "name": {
        "he": "בישומית לרצפות בריח מרכך כביסה הכחול",
        "ar": "معطر للأرضيات برائحة منعم أقمشة الأزرق",
        "en": "Floor Fragrance Scent Fabric Softener Blue"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/67.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-68",
      "item_id": "item-68",
      "name": {
        "he": "פינל נוזל כביסה קומפקטי בניחוח פינל שואו 2.2 ליטר",
        "ar": "فينال سائل غسيل مركز برائحة فينال شو 2.2 لتر",
        "en": "Final Concentrated Laundry Liquid Scent Final Show 2.2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/68.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-69",
      "item_id": "item-69",
      "name": {
        "he": "פינל מרכך כביסה קומפקטי בניחוח פינל שואו",
        "ar": "فينال منعم أقمشة مركز برائحة فينال شو",
        "en": "Final Concentrated Fabric Softener Scent Final Show"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/69.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-70",
      "item_id": "item-70",
      "name": {
        "he": "בישומית לכביסה בריח מרכך פינל שואו",
        "ar": "معطر للغسيل برائحة منعم فينال شو",
        "en": "Laundry Fragrance - Final Show Fabric Softener Scent"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/70.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-71",
      "item_id": "item-71",
      "name": {
        "he": "בישומית לרצפות בריח פינל שואו",
        "ar": "معطر للأرضيات برائحة فينال شو",
        "en": "Floor Fragrance Scent Final Show"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/71.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-72",
      "item_id": "item-72",
      "name": {
        "he": "פינל מבשם כביסה בניחוח פינל שואו 750 מ״ל",
        "ar": "فينال معطر غسيل برائحة فينال شو 750 مل",
        "en": "Final Laundry Fragrance Scent Final Show 750 ml"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/72.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-73",
      "item_id": "item-73",
      "name": {
        "he": "פינל שמפו רצפות קומפקטי בניחוח פינל שואו",
        "ar": "فينال منظف أرضيات مركز برائحة فينال شو",
        "en": "Final Concentrated Floor Cleaner Scent Final Show"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/73.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-74",
      "item_id": "item-74",
      "name": {
        "he": "פינל נוזל כביסה קומפקטי בניחוח חלומות 2.2 ליטר",
        "ar": "فينال سائل غسيل مركز برائحة دريمز 2.2 لتر",
        "en": "Final Concentrated Laundry Liquid Scent Dreams 2.2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/74.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-75",
      "item_id": "item-75",
      "name": {
        "he": "פינל מרכך כביסה קומפקטי בניחוח חלומות",
        "ar": "فينال منعم أقمشة مركز برائحة دريمز",
        "en": "Final Concentrated Fabric Softener Scent Dreams"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/75.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-76",
      "item_id": "item-76",
      "name": {
        "he": "פינל מבשם כביסה בניחוח חלומות",
        "ar": "فينال معطر غسيل برائحة دريمز",
        "en": "Final Laundry Fragrance Scent Dreams"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/76.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-77",
      "item_id": "item-77",
      "name": {
        "he": "בישומית לכביסה בריח מרכך כביסה חלומות",
        "ar": "معطر للغسيل برائحة منعم أقمشة دريمز",
        "en": "Laundry Fragrance Scent Fabric Softener Dreams"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/77.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-78",
      "item_id": "item-78",
      "name": {
        "he": "בישומית לרצפות בריח מרכך כביסה חלומות",
        "ar": "معطر للأرضيات برائحة منعم أقمشة دريمز",
        "en": "Floor Fragrance Scent Fabric Softener Dreams"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/78.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-79",
      "item_id": "item-79",
      "name": {
        "he": "פינל שמפו רצפות קומפקטי בניחוח חלומות",
        "ar": "فينال منظف أرضيات مركز برائحة دريمز",
        "en": "Final Concentrated Floor Cleaner Scent Dreams"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/79.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-80",
      "item_id": "item-80",
      "name": {
        "he": "פינל נוזל כביסה קומפקטי בניחוח VIP 2.2 ליטר",
        "ar": "فينال سائل غسيل مركز برائحة VIP 2.2 لتر",
        "en": "Final Concentrated Laundry Liquid Scent VIP 2.2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/80.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-81",
      "item_id": "item-81",
      "name": {
        "he": "בישומית לכביסה בריח מרכך כביסה VIP",
        "ar": "معطر للغسيل برائحة منعم أقمشة VIP",
        "en": "Laundry Fragrance Scent Fabric Softener VIP"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/81.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-82",
      "item_id": "item-82",
      "name": {
        "he": "פינל מבשם כביסה בניחוח VIP 750 מ״ל",
        "ar": "فينال معطر غسيل برائحة VIP 750 مل",
        "en": "Final Laundry Fragrance Scent VIP 750 ml"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/82.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-83",
      "item_id": "item-83",
      "name": {
        "he": "פינל מרכך כביסה קומפקטי בניחוח VIP",
        "ar": "فينال منعم أقمشة مركز برائحة VIP",
        "en": "Final Concentrated Fabric Softener Scent VIP"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/83.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-84",
      "item_id": "item-84",
      "name": {
        "he": "בישומית לרצפות בריח מרכך כביסה VIP",
        "ar": "معطر للأرضيات برائحة منعم أقمشة VIP",
        "en": "Floor Fragrance Scent Fabric Softener VIP"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/84.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-85",
      "item_id": "item-85",
      "name": {
        "he": "פינל שמפו רצפות קומפקטי בניחוח VIP",
        "ar": "فينال منظف أرضيات مركز برائحة VIP",
        "en": "Final Concentrated Floor Cleaner Scent VIP"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/85.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-86",
      "item_id": "item-86",
      "name": {
        "he": "פינל נוזל כביסה קומפקטי הוורוד 2.2 ליטר",
        "ar": "فينال سائل غسيل مركز الوردي 2.2 لتر",
        "en": "Final Concentrated Laundry Liquid Pink 2.2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/86.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-87",
      "item_id": "item-87",
      "name": {
        "he": "מרכך כביסה קומפקטי הוורוד",
        "ar": "منعم أقمشة مركز الوردي",
        "en": "Concentrated Fabric Softener Pink"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/87.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-88",
      "item_id": "item-88",
      "name": {
        "he": "בישומית לכביסה בריח מרכך כביסה הוורוד",
        "ar": "معطر للغسيل برائحة منعم أقمشة الوردي",
        "en": "Laundry Fragrance Scent Fabric Softener Pink"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/88.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-89",
      "item_id": "item-89",
      "name": {
        "he": "בישומית לרצפות בריח מרכך כביסה הוורוד",
        "ar": "معطر للأرضيات برائحة منعم أقمشة الوردي",
        "en": "Floor Fragrance Scent Fabric Softener Pink"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/89.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-90",
      "item_id": "item-90",
      "name": {
        "he": "פינל מבשם כביסה הוורוד 750 מ״ל",
        "ar": "فينال معطر غسيل الوردي 750 مل",
        "en": "Final Laundry Fragrance Pink 750 ml"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/90.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-91",
      "item_id": "item-91",
      "name": {
        "he": "שמפו רצפות קומפקטי הוורוד",
        "ar": "منظف أرضيات مركز الوردي",
        "en": "Concentrated Floor Cleaner Pink"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/91.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-92",
      "item_id": "item-92",
      "name": {
        "he": "פינל נוזל כביסה קומפקטי בניחוח בית מלון 2.2 ליטר",
        "ar": "فينال سائل غسيل مركز برائحة فندق 2.2 لتر",
        "en": "Final Concentrated Laundry Liquid Scent Hotel 2.2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/92.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-93",
      "item_id": "item-93",
      "name": {
        "he": "פינל מרכך כביסה קומפקטי בניחוח בית מלון",
        "ar": "فينال منعم أقمشة مركز برائحة فندق",
        "en": "Final Concentrated Fabric Softener Scent Hotel"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/93.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-94",
      "item_id": "item-94",
      "name": {
        "he": "בישומית לכביסה בריח מרכך כביסה בית מלון",
        "ar": "معطر للغسيل برائحة منعم أقمشة فندق",
        "en": "Laundry Fragrance Scent Fabric Softener Hotel"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/94.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-95",
      "item_id": "item-95",
      "name": {
        "he": "פינל מבשם כביסה בניחוח בית מלון 750 מ״ל",
        "ar": "فينال معطر غسيل برائحة فندق 750 مل",
        "en": "Final Laundry Fragrance Scent Hotel 750 ml"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/95.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-96",
      "item_id": "item-96",
      "name": {
        "he": "פינל שמפו רצפות קומפקטי בניחוח בית מלון",
        "ar": "فينال منظف أرضيات مركز برائحة فندق",
        "en": "Final Concentrated Floor Cleaner Scent Hotel"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/96.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-97",
      "item_id": "item-97",
      "name": {
        "he": "בישומית לרצפות בריח בית מלון",
        "ar": "معطر للأرضيات برائحة فندق",
        "en": "Floor Fragrance Scent Hotel"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/97.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-98",
      "item_id": "item-98",
      "name": {
        "he": "פינל נוזל כביסה קומפקטי בניחוח ניחוחות 2.2 ליטר",
        "ar": "فينال سائل غسيل مركز برائحة نيحوخوت 2.2 لتر",
        "en": "Final Concentrated Laundry Liquid Scent Fragrances 2.2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/98.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-99",
      "item_id": "item-99",
      "name": {
        "he": "פינל מרכך כביסה קומפקטי בניחוח ניחוחות",
        "ar": "فينال منعم أقمشة مركز برائحة نيحوخوت",
        "en": "Final Concentrated Fabric Softener Scent Fragrances"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/99.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-100",
      "item_id": "item-100",
      "name": {
        "he": "בישומית לכביסה בריח מרכך כביסה ניחוחות",
        "ar": "معطر للغسيل برائحة منعم أقمشة نيحوخوت",
        "en": "Laundry Fragrance Scent Fabric Softener Fragrances"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/100.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-101",
      "item_id": "item-101",
      "name": {
        "he": "פינל מבשם כביסה בניחוח ניחוחות 750 מ״ל",
        "ar": "فينال معطر غسيل برائحة نيحوخوت 750 مل",
        "en": "Final Laundry Fragrance Scent Fragrances 750 ml"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/101.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-102",
      "item_id": "item-102",
      "name": {
        "he": "בישומית לרצפות בריח מרכך כביסה ניחוחות",
        "ar": "معطر للأرضيات برائحة منعم أقمشة نيحوخوت",
        "en": "Floor Fragrance Scent Fabric Softener Fragrances"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/102.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-103",
      "item_id": "item-103",
      "name": {
        "he": "פינל שמפו רצפות קומפקטי בניחוח ניחוחות",
        "ar": "فينال منظف أرضيات مركز برائحة نيحوخوت",
        "en": "Final Concentrated Floor Cleaner Scent Fragrances"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/103.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-104",
      "item_id": "item-104",
      "name": {
        "he": "פינל נוזל כביסה קומפקטי בניחוח פינל פיור 2.2 ליטר",
        "ar": "فينال سائل غسيل مركز برائحة فينال بيور 2.2 لتر",
        "en": "Final Concentrated Laundry Liquid Scent Final Pure 2.2 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/104.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-105",
      "item_id": "item-105",
      "name": {
        "he": "בישומית לרצפות פינל פיור",
        "ar": "معطر للأرضيات فينال بيور",
        "en": "Floor Fragrance Final Pure"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/105.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-106",
      "item_id": "item-106",
      "name": {
        "he": "פינל מבשם כביסה בניחוח פינל פיור 750 מ״ל",
        "ar": "فينال معطر غسيل برائحة فينال بيور 750 مل",
        "en": "Final Laundry Fragrance Scent Final Pure 750 ml"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/106.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-107",
      "item_id": "item-107",
      "name": {
        "he": "בישומית לכביסה בריח מרכך פינל פיור",
        "ar": "معطر للغسيل برائحة منعم فينال بيور",
        "en": "Laundry Fragrance - Final Pure Fabric Softener Scent"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/107.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-108",
      "item_id": "item-108",
      "name": {
        "he": "פינל מרכך כביסה קומפקטי בניחוח פינל פיור",
        "ar": "فينال منعم أقمشة مركز برائحة فينال بيور",
        "en": "Final Concentrated Fabric Softener Scent Final Pure"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/108.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-109",
      "item_id": "item-109",
      "name": {
        "he": "פינל שמפו רצפות קומפקטי בניחוח פינל פיור",
        "ar": "فينال منظف أرضيات مركز برائحة فينال بيور",
        "en": "Final Concentrated Floor Cleaner Scent Final Pure"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/109.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-110",
      "item_id": "item-110",
      "name": {
        "he": "תעזבוה מבשם חדרים מסייע בהרחקת זבובים",
        "ar": "تاعزفوها معطر غرف يساعد على إبعاد الذباب",
        "en": "Taazvuha Room Freshener - Helps Repel Flies"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/110.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-111",
      "item_id": "item-111",
      "name": {
        "he": "סנסס שקיות אשפה מבושמות 75×90 ס״מ",
        "ar": "سينسز أكياس نفايات معطرة 75×90 سم",
        "en": "Senses Scented Trash Bags 75×90 cm"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/111.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "trash-bags"
    },
    {
      "link_id": "mock-112",
      "item_id": "item-112",
      "name": {
        "he": "פרסטיז' שקיות אשפה מבושמות 75×90 ס״מ 25 יחידות",
        "ar": "بريستيج أكياس نفايات معطرة 75×90 سم 25 وحدة",
        "en": "Prestige Scented Trash Bags 75×90 cm 25 Units"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/112.jpg",
      "image_mobile": null,
      "price": 17.9,
      "effective_price": 17.9,
      "stock": 99,
      "category_id": "trash-bags"
    },
    {
      "link_id": "mock-113",
      "item_id": "item-113",
      "name": {
        "he": "דורגול פורטה מסיר אבנית",
        "ar": "دورغول فورتي مزيل تكلس",
        "en": "Durgol Forte Limescale Remover"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/113.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 19.42,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-114",
      "item_id": "item-114",
      "name": {
        "he": "מלרוד תרסיס לניקוי וטיפול במזגן",
        "ar": "ميلرود بخاخ تنظيف وصيانة المكيف",
        "en": "Mellerud Air Conditioner Cleaning & Care Spray"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/114.jpg",
      "image_mobile": null,
      "price": 29.9,
      "effective_price": 29.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-115",
      "item_id": "item-115",
      "name": {
        "he": "שמן בישום אלגנט",
        "ar": "زيت عطري إليغانت",
        "en": "Elegant Fragrance Oil"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/115.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-116",
      "item_id": "item-116",
      "name": {
        "he": "שמן בישום קוקו גבריאל",
        "ar": "زيت عطري كوكو غابرييل",
        "en": "Coco Gabrielle Fragrance Oil"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/116.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-117",
      "item_id": "item-117",
      "name": {
        "he": "שמן בישום בדין בלו",
        "ar": "زيت عطري بدين بلو",
        "en": "Badin Blue Fragrance Oil"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/117.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-118",
      "item_id": "item-118",
      "name": {
        "he": "שמן בישום דרימס",
        "ar": "زيت عطري دريمز",
        "en": "Dreams Fragrance Oil"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/118.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-119",
      "item_id": "item-119",
      "name": {
        "he": "שמן בישום אמברקומב",
        "ar": "زيت عطري أمبركومب",
        "en": "Ambercomb Fragrance Oil"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/119.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-120",
      "item_id": "item-120",
      "name": {
        "he": "Quick פרש דאודורייזר לימון",
        "ar": "كويك فريش مزيل روائح بالليمون",
        "en": "Quick Fresh Lemon Deodorizer"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/120.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 12.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-121",
      "item_id": "item-121",
      "name": {
        "he": "Quick פרש דאודורייזר אפרסק",
        "ar": "كويك فريش مزيل روائح بالخوخ",
        "en": "Quick Fresh Peach Deodorizer"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/121.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 12.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-122",
      "item_id": "item-122",
      "name": {
        "he": "פום קלינר קצף לניקוי",
        "ar": "فوم كلينر رغوة تنظيف",
        "en": "Foam Cleaner Cleaning Foam"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/122.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-123",
      "item_id": "item-123",
      "name": {
        "he": "תרסיס לניקוי גלגלים וחישוקים ספריי לניקוי גלגלים וחישוקים",
        "ar": "بخاخ تنظيف العجلات والجنوط",
        "en": "Wheel & Rim Cleaning Spray"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/123.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-124",
      "item_id": "item-124",
      "name": {
        "he": "גלילי נייר 6 יחידות",
        "ar": "لفائف ورق 6 وحدات",
        "en": "Paper Rolls 6 Units"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/124.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "paper-paper-products"
    },
    {
      "link_id": "mock-125",
      "item_id": "item-125",
      "name": {
        "he": "פרוגלס סופר מרוכז",
        "ar": "بروغلاس فائق التركيز",
        "en": "Proglass Super Concentrated"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/125.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-126",
      "item_id": "item-126",
      "name": {
        "he": "פרוגלס שמפו טופ",
        "ar": "بروغلاس شامبو توب",
        "en": "Proglass Top Shampoo"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/126.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-127",
      "item_id": "item-127",
      "name": {
        "he": "מטלית מיקרופייבר לרכב",
        "ar": "قطعة مايكروفايبر للسيارة",
        "en": "Microfiber Cloth for Car"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/127.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 12.9,
      "stock": 99,
      "category_id": "car-care-cleaning"
    },
    {
      "link_id": "mock-128",
      "item_id": "item-128",
      "name": {
        "he": "קלין שאם מטלית ניקוי",
        "ar": "كلين شام قطعة تنظيف",
        "en": "Clean Sham Cleaning Cloth"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/128.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 12.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-129",
      "item_id": "item-129",
      "name": {
        "he": "כפפה דו-צדדית לקרצוף והברקה",
        "ar": "قفاز مزدوج للفرك والتلميع",
        "en": "Double-Sided Scrubbing & Polishing Glove"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/129.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-130",
      "item_id": "item-130",
      "name": {
        "he": "Lavender פרש מבשם בניחוח לבנדר",
        "ar": "لافندر فريش معطر برائحة اللافندر",
        "en": "Lavender Fresh Lavender Air Freshener"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/130.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 12.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-131",
      "item_id": "item-131",
      "name": {
        "he": "צלחות חד-פעמיות אובליות",
        "ar": "صحون للاستعمال مرة واحدة بيضاوية",
        "en": "Disposable Plates Oval"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/131.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 12.9,
      "stock": 99,
      "category_id": "disposable-kitchen-accessories"
    },
    {
      "link_id": "mock-132",
      "item_id": "item-132",
      "name": {
        "he": "צלחות חד-פעמיות מחולקות",
        "ar": "صحون للاستعمال مرة واحدة مقسمة",
        "en": "Disposable Plates Compartment"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/132.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 12.9,
      "stock": 99,
      "category_id": "disposable-kitchen-accessories"
    },
    {
      "link_id": "mock-133",
      "item_id": "item-133",
      "name": {
        "he": "סנו סושי שקיות אשפה חזקות 100 ליטר",
        "ar": "سانو سوشي أكياس نفايات قوية 100 لتر",
        "en": "Sano Sushi Heavy-Duty Trash Bags 100 L"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/133.jpg",
      "image_mobile": null,
      "price": 22.9,
      "effective_price": 22.9,
      "stock": 99,
      "category_id": "trash-bags"
    },
    {
      "link_id": "mock-134",
      "item_id": "item-134",
      "name": {
        "he": "דזיטול מחטא בגדים",
        "ar": "ديتول مطهر للملابس",
        "en": "Dettol Laundry Disinfectant"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/134.jpg",
      "image_mobile": null,
      "price": 22.9,
      "effective_price": 22.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-135",
      "item_id": "item-135",
      "name": {
        "he": "איירוויק שמנים אתריים מילוי בניחוח הדרים",
        "ar": "إير ويك عبوة زيوت عطرية برائحة الحمضيات",
        "en": "Air Wick Essential Oil Refill - Citrus"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/135.jpg",
      "image_mobile": null,
      "price": 20.9,
      "effective_price": 20.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-136",
      "item_id": "item-136",
      "name": {
        "he": "מלרוד תרסיס ניקוי",
        "ar": "ميلرود بخاخ تنظيف",
        "en": "Mellerud Cleaning Spray"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/136.jpg",
      "image_mobile": null,
      "price": 29.9,
      "effective_price": 29.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-137",
      "item_id": "item-137",
      "name": {
        "he": "פרפיום רוז III מבשם",
        "ar": "برفيوم روز III معطر",
        "en": "Perfume Rose III Air Freshener"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/137.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-138",
      "item_id": "item-138",
      "name": {
        "he": "פניני ריח רוז גארדן",
        "ar": "حبيبات معطرة روز غاردن",
        "en": "Fragrance Beads Rose Garden"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/138.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-139",
      "item_id": "item-139",
      "name": {
        "he": "מגב רצפה צבעוני",
        "ar": "ممسحة أرضيات ملونة",
        "en": "Floor Squeegee Colored"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/139.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-140",
      "item_id": "item-140",
      "name": {
        "he": "מגב רצפה לבן",
        "ar": "ممسحة أرضيات بيضاء",
        "en": "Floor Squeegee White"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/140.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-141",
      "item_id": "item-141",
      "name": {
        "he": "קרבונה מסיר כתמים עם מברשת",
        "ar": "كاربونا مزيل بقع مع فرشاة",
        "en": "Carbona Stain Remover with Brush"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/141.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-142",
      "item_id": "item-142",
      "name": {
        "he": "פוליבוי מנקה לרהיטי עץ",
        "ar": "بولي بوي منظف أثاث خشبي",
        "en": "Poliboy Wood Furniture Cleaner"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/142.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-143",
      "item_id": "item-143",
      "name": {
        "he": "דזיטול מחטא ומשמיד חיידקים",
        "ar": "ديتول مطهر وقاتل للبكتيريا",
        "en": "Dettol Disinfectant & Bacteria Killer"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/143.jpg",
      "image_mobile": null,
      "price": 22.9,
      "effective_price": 22.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-144",
      "item_id": "item-144",
      "name": {
        "he": "מולד אאוט מסיר עובש",
        "ar": "مولد آوت مزيل عفن",
        "en": "Mold Out Mold Remover"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/144.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-145",
      "item_id": "item-145",
      "name": {
        "he": "כביסכל בניחוח אוריינטל",
        "ar": "كفيسكول برائحة أورينتال",
        "en": "Kviskol Oriental Scent"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/145.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-146",
      "item_id": "item-146",
      "name": {
        "he": "כביסכל בניחוח מאסק פלאוור",
        "ar": "كفيسكول برائحة مسك فلاور",
        "en": "Kviskol Musk Flower Scent"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/146.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-147",
      "item_id": "item-147",
      "name": {
        "he": "סל כביסה",
        "ar": "سلة غسيل",
        "en": "Laundry Basket"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/147.jpg",
      "image_mobile": null,
      "price": 34.9,
      "effective_price": 28.97,
      "stock": 99,
      "category_id": "home-accessories"
    },
    {
      "link_id": "mock-148",
      "item_id": "item-148",
      "name": {
        "he": "סל כביסה עם מכסה",
        "ar": "سلة غسيل بغطاء",
        "en": "Laundry Basket with Lid"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/148.jpg",
      "image_mobile": null,
      "price": 49.9,
      "effective_price": 49.9,
      "stock": 99,
      "category_id": "home-accessories"
    },
    {
      "link_id": "mock-149",
      "item_id": "item-149",
      "name": {
        "he": "בקבוק תרסיס ריק",
        "ar": "عبوة رش فارغة",
        "en": "Empty Spray Bottle"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/149.jpg",
      "image_mobile": null,
      "price": 7.9,
      "effective_price": 7.9,
      "stock": 99,
      "category_id": "home-accessories"
    },
    {
      "link_id": "mock-150",
      "item_id": "item-150",
      "name": {
        "he": "TNX מרכך ומבשם כביסה פרש Softener",
        "ar": "TNX منعم ومعطر غسيل فريش Softener",
        "en": "TNX Fabric Softener & Laundry Fragrance Fresh Softener"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/150.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-151",
      "item_id": "item-151",
      "name": {
        "he": "TNX ג׳ל כביסה וייט פלאוור",
        "ar": "TNX جل غسيل وايت فلاور",
        "en": "TNX Laundry Gel White Flower"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/151.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-152",
      "item_id": "item-152",
      "name": {
        "he": "TNX ג׳ל כביסה בייבי לאב",
        "ar": "TNX جل غسيل بيبي لاف",
        "en": "TNX Laundry Gel Baby Love"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/152.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-153",
      "item_id": "item-153",
      "name": {
        "he": "TNX מרכך ומבשם כביסה",
        "ar": "TNX منعم ومعطر غسيل",
        "en": "TNX Fabric Softener & Laundry Fragrance"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/153.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-154",
      "item_id": "item-154",
      "name": {
        "he": "וניש אוקסי אקשן פאוור ג׳ל מסיר כתמים",
        "ar": "فانيش أوكسي أكشن باور جل مزيل بقع",
        "en": "Vanish Oxi Action Power Gel Stain Remover"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/154.jpg",
      "image_mobile": null,
      "price": 29.9,
      "effective_price": 29.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-155",
      "item_id": "item-155",
      "name": {
        "he": "וניש אוקסי אקשן להסרת כתמים בכביסה לבנה",
        "ar": "فانيش أوكسي أكشن لإزالة البقع من الغسيل الأبيض",
        "en": "Vanish Oxi Action White Laundry Stain Remover"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/155.jpg",
      "image_mobile": null,
      "price": 27.9,
      "effective_price": 27.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-156",
      "item_id": "item-156",
      "name": {
        "he": "סנו סושי תבניות אלומיניום XL 2 יחידות",
        "ar": "سانو سوشي قوالب ألمنيوم XL وحدتان",
        "en": "Sano Sushi Aluminum Trays XL 2 Units"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/156.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 12.9,
      "stock": 99,
      "category_id": "disposable-kitchen-accessories"
    },
    {
      "link_id": "mock-157",
      "item_id": "item-157",
      "name": {
        "he": "כיף סבון לחות לילדים",
        "ar": "كيف صابون مرطب للأطفال",
        "en": "Kif Kids Moisturizing Soap"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/157.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-158",
      "item_id": "item-158",
      "name": {
        "he": "כיף שמפו דיטוקס אצות ים ומלפפון",
        "ar": "كيف شامبو ديتوكس بالأعشاب البحرية والخيار",
        "en": "Kif Detox Shampoo with Seaweed & Cucumber"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/158.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-159",
      "item_id": "item-159",
      "name": {
        "he": "כיף שמפו קליר יור מיינד",
        "ar": "كيف شامبو كلير يور مايند",
        "en": "Kif Clear Your Mind Shampoo"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/159.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-160",
      "item_id": "item-160",
      "name": {
        "he": "קרמה קרם גוף",
        "ar": "كريما كريم جسم",
        "en": "Crema Body Cream"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/160.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-161",
      "item_id": "item-161",
      "name": {
        "he": "Baby כיף אל-סבון",
        "ar": "بيبي كيف غسول بدون صابون",
        "en": "Baby Kif Soap-Free Wash"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/161.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-162",
      "item_id": "item-162",
      "name": {
        "he": "סנו אוקסיג'ן פאוור מסיר כתמים בתרסיס",
        "ar": "سانو أوكسيجين باور بخاخ مزيل بقع",
        "en": "Sano Oxygen Power Stain Remover Spray"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/162.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-163",
      "item_id": "item-163",
      "name": {
        "he": "סנו אוקסיג'ן פאוור אבקה להסרת כתמים 540 גרם",
        "ar": "سانو أوكسيجين باور مسحوق لإزالة البقع 540 غرام",
        "en": "Sano Oxygen Power Stain Remover Powder 540 g"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/163.jpg",
      "image_mobile": null,
      "price": 22.9,
      "effective_price": 22.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-164",
      "item_id": "item-164",
      "name": {
        "he": "סנו פרש White Blossom מבשם אוויר",
        "ar": "سانو فريش وايت بلوسوم معطر جو",
        "en": "Sano Fresh White Blossom Air Freshener"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/164.jpg",
      "image_mobile": null,
      "price": 13.9,
      "effective_price": 13.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-165",
      "item_id": "item-165",
      "name": {
        "he": "מקסימה אולטרה פרש דפי בישום לכביסה 20 יחידות",
        "ar": "ماكسيما ألترا فريش أوراق تعطير للغسيل 20 وحدة",
        "en": "Maxima Ultra Fresh Laundry Fragrance Sheets 20 Units"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/165.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-166",
      "item_id": "item-166",
      "name": {
        "he": "מקסימה ג׳ל מרכך כביסה",
        "ar": "ماكسيما جل منعم أقمشة",
        "en": "Maxima Fabric Softener Gel"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/166.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-167",
      "item_id": "item-167",
      "name": {
        "he": "מקסימה ג׳ל מרכך כביסה בניחוח סחלב",
        "ar": "ماكسيما جل منعم أقمشة برائحة الأوركيد",
        "en": "Maxima Fabric Softener Gel - Orchid"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/167.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-168",
      "item_id": "item-168",
      "name": {
        "he": "מקסימה מרכך כביסה פיור לאב 40 כביסות",
        "ar": "ماكسيما منعم أقمشة بيور لاف 40 غسلة",
        "en": "Maxima Fabric Softener Pure Love 40 Washes"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/168.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 12.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-169",
      "item_id": "item-169",
      "name": {
        "he": "סנו סושי מפת ניילון בגליל 50 מטר",
        "ar": "سانو سوشي مفرش نايلون رول 50 متر",
        "en": "Sano Sushi Plastic Tablecloth Roll 50 m"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/169.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 12.9,
      "stock": 99,
      "category_id": "disposable-kitchen-accessories"
    },
    {
      "link_id": "mock-170",
      "item_id": "item-170",
      "name": {
        "he": "Baby כיף קרם גוף",
        "ar": "بيبي كيف كريم جسم",
        "en": "Baby Kif Body Cream"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/170.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-171",
      "item_id": "item-171",
      "name": {
        "he": "Baby כיף שמן גוף",
        "ar": "بيبي كيف زيت جسم",
        "en": "Baby Kif Body Oil"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/171.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-172",
      "item_id": "item-172",
      "name": {
        "he": "Baby כיף תחליב גוף",
        "ar": "بيبي كيف لوشن جسم",
        "en": "Baby Kif Body Lotion"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/172.jpg",
      "image_mobile": null,
      "price": 14.9,
      "effective_price": 14.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-173",
      "item_id": "item-173",
      "name": {
        "he": "אסטוניש מסיר אבנית",
        "ar": "أستونش مزيل تكلس",
        "en": "Astonish Limescale Remover"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/173.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-174",
      "item_id": "item-174",
      "name": {
        "he": "דורגול WC מנקה אסלות",
        "ar": "دورغول WC منظف مراحيض",
        "en": "Durgol WC Toilet Cleaner"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/174.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-175",
      "item_id": "item-175",
      "name": {
        "he": "דורגול מסיר אבנית",
        "ar": "دورغول مزيل تكلس",
        "en": "Durgol Limescale Remover"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/175.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-176",
      "item_id": "item-176",
      "name": {
        "he": "דזיטול מנקה ומחטא כללי",
        "ar": "ديتول منظف ومطهر عام",
        "en": "Dettol General Cleaner & Disinfectant"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/176.jpg",
      "image_mobile": null,
      "price": 22.9,
      "effective_price": 22.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-177",
      "item_id": "item-177",
      "name": {
        "he": "דורגול מנקה למדיח כלים",
        "ar": "دورغول منظف غسالة صحون",
        "en": "Durgol Dishwasher Cleaner"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/177.jpg",
      "image_mobile": null,
      "price": 22.9,
      "effective_price": 22.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-178",
      "item_id": "item-178",
      "name": {
        "he": "דזיטול מנקה ומחטא רב-תכליתי",
        "ar": "ديتول منظف ومطهر متعدد الاستخدامات",
        "en": "Dettol Multipurpose Cleaner & Disinfectant"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/178.jpg",
      "image_mobile": null,
      "price": 22.9,
      "effective_price": 22.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-179",
      "item_id": "item-179",
      "name": {
        "he": "פוליבוי דאסט מאסטר מנקה רהיטים",
        "ar": "بولي بوي داست ماستر منظف أثاث",
        "en": "Poliboy Dust Master Furniture Cleaner"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/179.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-180",
      "item_id": "item-180",
      "name": {
        "he": "דזיטול נוזל לניקוי וחיטוי",
        "ar": "ديتول سائل تنظيف وتعقيم",
        "en": "Dettol Cleaning & Disinfecting Liquid"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/180.jpg",
      "image_mobile": null,
      "price": 22.9,
      "effective_price": 22.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-181",
      "item_id": "item-181",
      "name": {
        "he": "KH7 סופר קלינר מסיר שומנים",
        "ar": "KH7 سوبر كلينر مزيل دهون",
        "en": "KH7 Super Cleaner Degreaser"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/181.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 13.33,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-182",
      "item_id": "item-182",
      "name": {
        "he": "וניש אוקסי אקשן תרסיס טיפול מקדים להסרת כתמים",
        "ar": "فانيش أوكسي أكشن بخاخ معالجة مسبقة لإزالة البقع",
        "en": "Vanish Oxi Action Pre-Treatment Stain Remover Spray"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/182.jpg",
      "image_mobile": null,
      "price": 22.9,
      "effective_price": 22.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-183",
      "item_id": "item-183",
      "name": {
        "he": "איירוויק מילוי למפיץ ריח חשמלי",
        "ar": "إير ويك عبوة لمعطر كهربائي",
        "en": "Air Wick Electric Air Freshener Refill"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/183.jpg",
      "image_mobile": null,
      "price": 32.2,
      "effective_price": 32.2,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-184",
      "item_id": "item-184",
      "name": {
        "he": "פינוק שמפו לשיער רגיל",
        "ar": "بينوك شامبو للشعر العادي",
        "en": "Pinuk Shampoo for Normal Hair"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/184.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-185",
      "item_id": "item-185",
      "name": {
        "he": "פינוק 2 ב-1 שמפו ומרכך לשיער רגיל",
        "ar": "بينوك شامبو وبلسم 2 في 1 للشعر العادي",
        "en": "Pinuk 2-in-1 Shampoo & Conditioner for Normal Hair"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/185.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-186",
      "item_id": "item-186",
      "name": {
        "he": "פינוק Men Sport 3 ב-1 לגבר",
        "ar": "بينوك مين سبورت 3 في 1 للرجال",
        "en": "Pinuk Men Sport 3-in-1"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/186.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-187",
      "item_id": "item-187",
      "name": {
        "he": "כביסכל מרכך כביסה סופר בייבי",
        "ar": "كفيسكول منعم أقمشة سوبر بيبي",
        "en": "Kviskol Fabric Softener Super Baby"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/187.jpg",
      "image_mobile": null,
      "price": 15.9,
      "effective_price": 15.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-188",
      "item_id": "item-188",
      "name": {
        "he": "פינוק 2 ב-1 שמפו ומרכך לשיער פגום",
        "ar": "بينوك شامبو وبلسم 2 في 1 للشعر التالف",
        "en": "Pinuk 2-in-1 Shampoo & Conditioner for Damaged Hair"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/188.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-189",
      "item_id": "item-189",
      "name": {
        "he": "פינוק שמפו לשיער פגום",
        "ar": "بينوك شامبو للشعر التالف",
        "en": "Pinuk Shampoo for Damaged Hair"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/189.jpg",
      "image_mobile": null,
      "price": 16.9,
      "effective_price": 16.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-190",
      "item_id": "item-190",
      "name": {
        "he": "פינוק Men 3 ב-1 לגבר",
        "ar": "بينوك مين 3 في 1 للرجال",
        "en": "Pinuk Men 3-in-1"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/190.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-191",
      "item_id": "item-191",
      "name": {
        "he": "ריצפז פרש בייבי מטליות לחות לניקוי הרצפה",
        "ar": "ريتسباز فريش بيبي مناديل مبللة لتنظيف الأرضيات",
        "en": "Ritzpaz Fresh Baby Wet Floor Cleaning Wipes"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/191.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "cleaning-cleaning-tools"
    },
    {
      "link_id": "mock-192",
      "item_id": "item-192",
      "name": {
        "he": "לנור פרגרנס תרפי פרש",
        "ar": "لينور فراغرانس ثيرابي فريش",
        "en": "Lenor Fragrance Therapy Fresh"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/192.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 16.63,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-193",
      "item_id": "item-193",
      "name": {
        "he": "לנור מרכך כביסה סנסיטיב",
        "ar": "لينور منعم أقمشة للبشرة الحساسة",
        "en": "Lenor Sensitive Fabric Softener"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/193.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-194",
      "item_id": "item-194",
      "name": {
        "he": "לנור פרגרנס תרפי רילקס",
        "ar": "لينور فراغرانس ثيرابي ريلاكس",
        "en": "Lenor Fragrance Therapy Relax"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/194.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-195",
      "item_id": "item-195",
      "name": {
        "he": "לנור פרגרנס תרפי אנג'וי",
        "ar": "لينور فراغرانس ثيرابي إنجوي",
        "en": "Lenor Fragrance Therapy Enjoy"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/195.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-196",
      "item_id": "item-196",
      "name": {
        "he": "לנור פרגרנס תרפי אסקייפ",
        "ar": "لينور فراغرانس ثيرابي إسكيب",
        "en": "Lenor Fragrance Therapy Escape"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/196.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-197",
      "item_id": "item-197",
      "name": {
        "he": "לנור מרכך כביסה בניחוח רענן",
        "ar": "لينور منعم أقمشة برائحة منعشة",
        "en": "Lenor Fresh Scent Fabric Softener"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/197.jpg",
      "image_mobile": null,
      "price": 18.9,
      "effective_price": 18.9,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    },
    {
      "link_id": "mock-198",
      "item_id": "item-198",
      "name": {
        "he": "הד אנד שולדרס שמפו מנטול XXL",
        "ar": "هيد آند شولدرز شامبو بالمنثول XXL",
        "en": "Head & Shoulders Menthol Shampoo XXL"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/198.jpg",
      "image_mobile": null,
      "price": 27.9,
      "effective_price": 23.71,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-199",
      "item_id": "item-199",
      "name": {
        "he": "KH7 סופר קלינר מסיר שומנים",
        "ar": "KH7 سوبر كلينر مزيل دهون",
        "en": "KH7 Super Cleaner Degreaser"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/199.jpg",
      "image_mobile": null,
      "price": 19.9,
      "effective_price": 19.9,
      "stock": 99,
      "category_id": "household-cleaners"
    },
    {
      "link_id": "mock-200",
      "item_id": "item-200",
      "name": {
        "he": "חבל כביסה 20 מטר",
        "ar": "حبل غسيل 20 متر",
        "en": "Clothesline 20 m"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/200.jpg",
      "image_mobile": null,
      "price": 12.9,
      "effective_price": 12.9,
      "stock": 99,
      "category_id": "home-accessories"
    },
    {
      "link_id": "mock-201",
      "item_id": "item-201",
      "name": {
        "he": "סנו פרש Secret Garden מבשם אוויר",
        "ar": "سانو فريش سيكريت غاردن معطر جو",
        "en": "Sano Fresh Secret Garden Air Freshener"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/201.jpg",
      "image_mobile": null,
      "price": 13.9,
      "effective_price": 13.9,
      "stock": 99,
      "category_id": "air-fresheners-home-fragrance"
    },
    {
      "link_id": "mock-202",
      "item_id": "item-202",
      "name": {
        "he": "הד אנד שולדרס שמפו מנטול",
        "ar": "هيد آند شولدرز شامبو بالمنثول",
        "en": "Head & Shoulders Menthol Shampoo"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/202.jpg",
      "image_mobile": null,
      "price": 22.9,
      "effective_price": 22.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-203",
      "item_id": "item-203",
      "name": {
        "he": "פנטן שמפו לתלתלים מוגדרים",
        "ar": "بانتين شامبو لتحديد تجعيدات الشعر",
        "en": "Pantene Defined Curls Shampoo"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/203.jpg",
      "image_mobile": null,
      "price": 24.9,
      "effective_price": 24.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-204",
      "item_id": "item-204",
      "name": {
        "he": "הד אנד שולדרס קלריפיי אנד שיין שמפו",
        "ar": "هيد آند شولدرز شامبو كلاريفاي آند شاين",
        "en": "Head & Shoulders Clarify & Shine Shampoo"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/204.jpg",
      "image_mobile": null,
      "price": 22.9,
      "effective_price": 22.9,
      "stock": 99,
      "category_id": "personal-care"
    },
    {
      "link_id": "mock-205",
      "item_id": "item-205",
      "name": {
        "he": "אריאל אקסטרה קלין פאוור ג׳ל כביסה",
        "ar": "أريال إكسترا كلين باور جل غسيل",
        "en": "Ariel Extra Clean Power Laundry Gel"
      },
      "description": {
        "he": "",
        "ar": "",
        "en": ""
      },
      "brand": "",
      "barcode": "",
      "weight_grams": null,
      "image_key": null,
      "image_web": "/mock-images/205.jpg",
      "image_mobile": null,
      "price": 29.9,
      "effective_price": 21.53,
      "stock": 99,
      "category_id": "laundry-fabric-care"
    }
  ],
  "categories": [
    {
      "id": "dish-kitchen-cleaning",
      "name": {
        "he": "ניקוי כלים ומטבח",
        "ar": "تنظيف الأواني والمطبخ",
        "en": "Dish & Kitchen Cleaning"
      },
      "icon_name": "beaker"
    },
    {
      "id": "cleaning-cleaning-tools",
      "name": {
        "he": "ניקיון וכלי ניקוי",
        "ar": "التنظيف وأدوات التنظيف",
        "en": "Cleaning & Cleaning Tools"
      },
      "icon_name": "squares-2x2"
    },
    {
      "id": "cleaning-gloves",
      "name": {
        "he": "כפפות ניקוי",
        "ar": "قفازات تنظيف",
        "en": "Cleaning Gloves"
      },
      "icon_name": "hand-raised"
    },
    {
      "id": "air-fresheners-home-fragrance",
      "name": {
        "he": "מטהרי אוויר ובישום הבית",
        "ar": "معطرات الجو وتعطير المنزل",
        "en": "Air Fresheners & Home Fragrance"
      },
      "icon_name": "cloud"
    },
    {
      "id": "home-accessories",
      "name": {
        "he": "אביזרי בית",
        "ar": "مستلزمات منزلية",
        "en": "Home Accessories"
      },
      "icon_name": "home"
    },
    {
      "id": "disposable-kitchen-accessories",
      "name": {
        "he": "חד-פעמי ואביזרי מטבח",
        "ar": "مستلزمات للاستعمال مرة واحدة وأدوات مطبخ",
        "en": "Disposable & Kitchen Accessories"
      },
      "icon_name": "square-3-stack-3d"
    },
    {
      "id": "laundry-fabric-care",
      "name": {
        "he": "כביסה וטיפוח הבגד",
        "ar": "الغسيل والعناية بالملابس",
        "en": "Laundry & Fabric Care"
      },
      "icon_name": "shirt"
    },
    {
      "id": "personal-care",
      "name": {
        "he": "טיפוח אישי",
        "ar": "العناية الشخصية",
        "en": "Personal Care"
      },
      "icon_name": "sparkles"
    },
    {
      "id": "paper-paper-products",
      "name": {
        "he": "נייר ומוצרי נייר",
        "ar": "الورقيات ومنتجات الورق",
        "en": "Paper & Paper Products"
      },
      "icon_name": "square-3-stack-3d"
    },
    {
      "id": "trash-bags",
      "name": {
        "he": "שקיות אשפה",
        "ar": "أكياس نفايات",
        "en": "Trash Bags"
      },
      "icon_name": "trash"
    },
    {
      "id": "household-cleaners",
      "name": {
        "he": "חומרי ניקוי לבית",
        "ar": "منظفات منزلية",
        "en": "Household Cleaners"
      },
      "icon_name": "sparkles"
    },
    {
      "id": "car-care-cleaning",
      "name": {
        "he": "טיפוח וניקוי לרכב",
        "ar": "العناية بالسيارة وتنظيفها",
        "en": "Car Care & Cleaning"
      },
      "icon_name": "wrench"
    }
  ]
}
