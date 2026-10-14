import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { quickChips } from '../../config/navigation'
import { useCart } from '../../features/cart/CartContext'
import { useWishlist } from '../../features/wishlist/WishlistContext'
import { useSearch } from '../../features/search/SearchOverlay'
import { Icon } from '../ui/Icon'
import { Wordmark } from './Wordmark'
import { MobileMenu } from './MobileMenu'
import { MegaNav, useIsActive } from './MegaNav'
import { cn } from '../../lib/cn'

function HeaderIcon({ icon, label, count, bumpKey, onClick, to, className }) {
  const Tag = to ? Link : 'button'
  return (
    <Tag
      {...(to ? { to } : { type: 'button', onClick })}
      aria-label={count ? `${label}, ${count} items` : label}
      className={cn('press relative grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-cream hover:text-maroon', className)}
    >
      <Icon name={icon} size={23} />
      {count > 0 && (
        <span
          key={bumpKey}
          className={cn(
            'absolute top-0.5 right-0 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-maroon px-1 text-[10px] font-semibold text-ivory tabular-nums',
            bumpKey ? 'anim-bump' : '',
          )}
        >
          {count}
        </span>
      )}
    </Tag>
  )
}

export function Header() {
  const cart = useCart()
  const wishlist = useWishlist()
  const { openSearch } = useSearch()
  const isActive = useIsActive()
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
          'sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300',
          scrolled ? 'border-line bg-ivory/90 shadow-[0_8px_24px_-18px_rgb(42_27_25/0.4)] backdrop-blur-xl' : 'border-transparent bg-ivory',
        )}
      >
        <div className="shell grid h-[68px] grid-cols-[1fr_auto_1fr] items-center lg:h-[84px]">
          <div className="flex items-center gap-1">
            <HeaderIcon icon="menu" label="Open menu" onClick={() => setMenuOpen(true)} className="-ml-2 lg:hidden" />
            <button
              type="button"
              onClick={openSearch}
              className="hidden h-10 w-[220px] items-center gap-2.5 rounded-soft border border-line-strong px-3.5 text-[13px] text-ink-soft transition-colors hover:border-maroon lg:flex"
            >
              <Icon name="search" size={17} className="text-ink" />
              Search sarees, silk, colours…
            </button>
          </div>

          <Wordmark />

          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <HeaderIcon icon="search" label="Search" onClick={openSearch} className="lg:hidden" />
            <HeaderIcon icon="user" label="My orders" to="/account" className="hidden sm:grid" />
            <HeaderIcon icon="heart" label="Wishlist" to="/wishlist" count={wishlist.count} />
            <HeaderIcon icon="bag" label="Bag" count={cart.count} bumpKey={cart.addedAt} onClick={() => cart.setOpen(true)} className="-mr-2 sm:mr-0" />
          </div>
        </div>

        <MegaNav />

        {/* Phones: swipeable category chips */}
        <nav aria-label="Categories" className="border-t border-line lg:hidden">
          <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2.5 sm:px-6">
            {quickChips.map((c) => {
              const active = isActive(c.to)
              return (
                <li key={c.label} className="shrink-0">
                  <Link
                    to={c.to}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'press flex h-8 items-center gap-1.5 rounded-full border px-3.5 text-[13px] transition-colors duration-200',
                      active ? 'border-maroon bg-maroon text-ivory' : c.accent ? 'border-danger/30 text-danger' : 'border-line-strong text-ink',
                    )}
                  >
                    {c.accent && !active && <span className="size-1.5 rounded-full bg-danger" aria-hidden="true" />}
                    {c.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
