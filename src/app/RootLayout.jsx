import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Providers } from './Providers'
import { AnnouncementBar } from '../components/layout/AnnouncementBar'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { CartDrawer } from '../features/cart/CartDrawer'

/**
 * Scroll to the top on page change, or to #hash targets when present.
 * Query-string changes (shop filters) are left to the page, so filtering doesn't jump.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        // Don't return this: newer browsers return a Promise, and React would call it as a cleanup.
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export function RootLayout() {
  const { pathname } = useLocation()
  const minimal = pathname === '/checkout'

  return (
    <Providers>
      <ScrollManager />
      <a
        href="#main"
        className="sr-only z-[70] bg-maroon px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      {!minimal && <AnnouncementBar />}
      <Header />
      <main id="main" key={pathname} className="page-enter min-h-[60vh]">
        <Outlet />
      </main>
      {!minimal && <Footer />}
      <CartDrawer />
    </Providers>
  )
}
