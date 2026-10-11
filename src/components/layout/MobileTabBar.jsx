import { useCart } from '../../features/cart/CartContext'
import { useWishlist } from '../../features/wishlist/WishlistContext'
import { useSearch } from '../../features/search/SearchOverlay'
import { Icon } from '../ui/Icon'
import { cn } from '../../lib/cn'

// Floating app-style tab bar for phones. Home is the current page; the rest open panels.
export function MobileTabBar() {
  const cart = useCart()
  const wishlist = useWishlist()
  const { openSearch } = useSearch()

  const tabs = [
    { id: 'home', icon: 'home', label: 'Home', href: '#top', active: true },
    { id: 'shop', icon: 'grid', label: 'Shop', href: '#trending' },
    { id: 'search', icon: 'search', label: 'Search', onClick: openSearch },
    { id: 'wishlist', icon: 'heart', label: 'Wishlist', onClick: () => wishlist.setOpen(true), count: wishlist.count },
    { id: 'bag', icon: 'bag', label: 'Bag', onClick: () => cart.setOpen(true), count: cart.count, bump: cart.addedAt },
  ]

  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden"
    >
      <ul className="flex w-full max-w-[400px] items-center justify-between rounded-full border border-line bg-bg/90 p-1.5 shadow-lift backdrop-blur-xl">
        {tabs.map((tab) => {
          const Tag = tab.href ? 'a' : 'button'
          return (
            <li key={tab.id}>
              <Tag
                {...(tab.href ? { href: tab.href } : { type: 'button', onClick: tab.onClick })}
                aria-label={tab.count ? `${tab.label}, ${tab.count} items` : tab.label}
                aria-current={tab.active ? 'page' : undefined}
                className={cn(
                  'press relative grid size-12 place-items-center rounded-full transition-colors duration-200',
                  tab.active ? 'bg-ink text-bg' : 'text-ink',
                )}
              >
                <Icon name={tab.icon} size={21} weight={tab.active ? 'fill' : 'regular'} />
                {tab.count > 0 && (
                  <span
                    key={tab.bump}
                    className={cn(
                      'absolute top-1 right-1 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-rose px-1 text-[10px] font-bold text-bg tabular-nums',
                      tab.bump ? 'anim-bump' : '',
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </Tag>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
