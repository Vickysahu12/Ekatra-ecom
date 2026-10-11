import { Providers } from './Providers'
import { AnnouncementBar } from '../components/layout/AnnouncementBar'
import { Header } from '../components/layout/Header'
import { MobileTabBar } from '../components/layout/MobileTabBar'
import { Newsletter } from '../components/layout/Newsletter'
import { Footer } from '../components/layout/Footer'
import { CartDrawer } from '../features/cart/CartDrawer'
import { WishlistDrawer } from '../features/wishlist/WishlistDrawer'
import { HeroSlider } from '../sections/HeroSlider'
import { CategoryCircles } from '../sections/CategoryCircles'
import { Trending } from '../sections/Trending'
import { PromoPair } from '../sections/PromoPair'
import { FitFinder } from '../sections/FitFinder'
import { ShopTheEdit } from '../sections/ShopTheEdit'
import { LookbookWall } from '../sections/LookbookWall'
import { Reviews } from '../sections/Reviews'
import { Perks } from '../sections/Perks'

export default function App() {
  return (
    <Providers>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <HeroSlider />
        <CategoryCircles />
        <Trending />
        <PromoPair />
        <FitFinder />
        <ShopTheEdit />
        <LookbookWall />
        <Reviews />
        <Perks />
        <Newsletter />
      </main>
      <Footer />
      <MobileTabBar />
      <CartDrawer />
      <WishlistDrawer />
    </Providers>
  )
}
