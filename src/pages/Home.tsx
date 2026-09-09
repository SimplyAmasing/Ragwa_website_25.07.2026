import { useMemo } from 'react'
import { useI18n } from '../i18n'
import { useCatalog } from '../lib/catalogStore'
import { pickFeatured, pickFeaturedSection } from '../lib/featured'
import { useNav } from '../lib/router'
import { BenefitsRow } from '../components/BenefitsRow'
import { CategoryCards } from '../components/CategoryCards'
import { HeroCarousel } from '../components/HeroCarousel'
import { HomeAtmosphere } from '../components/HomeAtmosphere'
import { ProductRail } from '../components/ProductRail'
import { ErrorBlock, LoadingBlock } from '../components/StateBlock'

export function HomePage() {
  const { t } = useI18n()
  const { status, products, categories } = useCatalog()
  const navigate = useNav()

  const heroProducts = useMemo(() => pickFeatured(products), [products])
  const onSale = useMemo(() => products.filter(p => p.isDiscounted), [products])
  const featuredSection = useMemo(
    () => pickFeaturedSection(products, new Set(onSale.map(p => p.linkId)), 12),
    [products, onSale],
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

      <ProductRail
        title={t.sections.featuredTitle}
        subtitle={t.sections.featuredSub}
        viewAllLabel={t.sections.featuredViewAll}
        onViewAll={() => navigate({ name: 'catalog' })}
        products={featuredSection}
      />
    </div>
  )
}
