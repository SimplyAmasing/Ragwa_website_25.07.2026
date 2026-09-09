import { useEffect } from 'react'
import { I18nProvider } from './i18n'
import { CartProvider } from './lib/cart'
import { loadCatalog } from './lib/catalogStore'
import { NavProvider, useRouter } from './lib/router'
import { WishlistProvider } from './lib/wishlist'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/Home'
import { CatalogPage } from './pages/Catalog'
import { ProductPage } from './pages/Product'
import { CartPage } from './pages/Cart'
import { CheckoutPage } from './pages/Checkout'
import { WishlistPage } from './pages/Wishlist'

function Shell() {
  const { route, navigate } = useRouter()

  useEffect(() => {
    loadCatalog()
  }, [])

  return (
    <NavProvider navigate={navigate}>
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1">
          {route.name === 'home' && <HomePage />}
          {route.name === 'catalog' && <CatalogPage route={route} />}
          {route.name === 'product' && <ProductPage linkId={route.id} />}
          {route.name === 'cart' && <CartPage />}
          {route.name === 'checkout' && <CheckoutPage />}
          {route.name === 'wishlist' && <WishlistPage />}
        </main>
        {route.name !== 'checkout' && <Footer />}
      </div>
    </NavProvider>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <WishlistProvider>
        <CartProvider>
          <Shell />
        </CartProvider>
      </WishlistProvider>
    </I18nProvider>
  )
}
