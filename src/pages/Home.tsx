import { useMemo } from 'react'
import { useI18n } from '../i18n'
import { useCatalog } from '../lib/catalogStore'
import { pickFeatured } from '../lib/featured'
import { useNav } from '../lib/router'
import { BenefitsRow } from '../components/BenefitsRow'
import { CategoryCards } from '../components/CategoryCards'
import { HeroCarousel } from '../components/HeroCarousel'
import { HomeAtmosphere } from '../components/HomeAtmosphere'
import { ProductRail } from '../components/ProductRail'
import { ErrorBlock, LoadingBlock } from '../components/StateBlock'

export function HomePage() {
  const { t, tr } = useI18n()
  const { status, products, categories } = useCatalog()
  const navigate = useNav()

  const heroProducts = useMemo(() => pickFeatured(products), [products])
  const onSale = useMemo(() => products.filter(p => p.isDiscounted), [products])

  // The shop's first 3 real categories, each shown as its own product rail —
  // replaces "Featured" (a hand-picked matcher list with no real ranking
  // signal to drive it) with something grounded in the shop's own catalog
  // structure. Order is whatever the Worker's categories array returns
  // (insertion order of first appearance across item_shop_links rows; there
  // is no category sort_order yet).
  const firstCategories = useMemo(() => categories.slice(0, 3), [categories])
  const categoryRails = useMemo(
    () =>
      firstCategories.map(cat => ({
        category: cat,
        products: products.filter(p => p.categoryId === cat.id),
      })),
    [firstCategories, products],
  )

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="min-h-screen bg-white">
        <LoadingBlock />
      </div>
    )
  }
  if (status === 'error') {
    return (
      <div className="min-h-screen bg-white">
        <ErrorBlock />
      </div>
    )
  }

  return (
    <div className="relative isolate overflow-x-clip">
      <HomeAtmosphere />

      <HeroCarousel products={heroProducts} />
      <BenefitsRow />

      <div id="categories" className="scroll-mt-24">
        <CategoryCards categories={categories} products={products} />
      </div>

      <div id="on-sale" className="scroll-mt-24">
        <ProductRail
          title={t.sections.saleTitle}
          subtitle={t.sections.saleSub}
          viewAllLabel={t.sections.saleViewAll}
          onViewAll={() => navigate({ name: 'catalog', sale: true })}
          products={onSale}
        />
      </div>

      {categoryRails.map(({ category, products: categoryProducts }) => (
        <ProductRail
          key={category.id}
          title={tr(category.name)}
          subtitle={t.categories.countProducts(categoryProducts.length)}
          viewAllLabel={t.categories.viewAll}
          onViewAll={() => navigate({ name: 'catalog', category: category.id })}
          products={categoryProducts}
        />
      ))}
    </div>
  )
}
