import { useEffect, useRef, useState } from 'react'
import { site } from '../../config/site'
import { useCart } from '../../features/cart/CartContext'
import { useWishlist } from '../../features/wishlist/WishlistContext'
import { useSearch } from '../../features/search/SearchOverlay'
import { Icon } from '../ui/Icon'
import { Wordmark } from './Wordmark'
import { IconButton } from './IconButton'
import { MobileMenu } from './MobileMenu'
import { cn } from '../../lib/cn'

export function Header() {
  const cart = useCart()
  const wishlist = useWishlist()
  const { openSearch } = useSearch()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sentinel = useRef(null)

  // A 1px sentinel above the header tells us when the page has scrolled, without a scroll listener.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    if (sentinel.current) io.observe(sentinel.current)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="h-px" />
      <header
        className={cn(
          'sticky top-0 z-40 transition-[background-color,box-shadow] duration-300',
          scrolled ? 'bg-bg/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl' : 'bg-bg',
        )}
      >
        <div className="shell grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-[76px]">
          {/* Left: menu on phones, links on desktop */}
          <div className="flex items-center gap-2">
            <IconButton icon="menu" label="Open menu" onClick={() => setMenuOpen(true)} className="lg:hidden" />
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                {site.nav.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={cn('link-line text-[14px] font-semibold', item.accent && 'text-rose')}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Wordmark />

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={openSearch}
              className="hidden h-11 w-[230px] items-center gap-2.5 rounded-full bg-soft px-4 text-[14px] text-ink-soft transition-colors duration-200 hover:bg-line xl:flex"
            >
              <Icon name="search" size={18} className="text-ink" />
              Search jeans, jackets…
            </button>
            <IconButton icon="search" label="Search" onClick={openSearch} className="xl:hidden" />
            <IconButton
              icon="heart"
              label="Wishlist"
              count={wishlist.count}
              onClick={() => wishlist.setOpen(true)}
              className="hidden lg:grid"
            />
            <IconButton icon="user" label="Account" className="hidden lg:grid" />
            <IconButton
              icon="bag"
              label="Bag"
              count={cart.count}
              bumpKey={cart.addedAt}
              onClick={() => cart.setOpen(true)}
            />
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
