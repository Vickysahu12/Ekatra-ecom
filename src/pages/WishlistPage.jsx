import { Link } from 'react-router'
import { useWishlist } from '../features/wishlist/WishlistContext'
import { useCart } from '../features/cart/CartContext'
import { useToast } from '../features/toast/Toast'
import { DEFAULT_SAREE_VARIANT } from '../features/product/ProductCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice, discountOf } from '../lib/format'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { Ornament } from '../components/ui/SectionHeading'

export function WishlistPage() {
  const wishlist = useWishlist()
  const cart = useCart()
  const { show } = useToast()
  useDocumentTitle('Wishlist')

  const moveToBag = (p) => {
    cart.add(p.id, DEFAULT_SAREE_VARIANT)
    wishlist.remove(p.id)
    show({ title: 'Moved to bag', body: `${p.name}, unstitched blouse`, image: p.images[0], action: { label: 'View bag', onClick: () => cart.setOpen(true) } })
  }

  return (
    <div className="shell py-10 lg:py-14">
      <div className="text-center">
        <h1 className="serif text-[40px] text-maroon">My Wishlist</h1>
        <Ornament className="mt-3" />
        <p className="mt-3 text-[14px] text-ink-soft">{wishlist.count ? `${wishlist.count} saved pieces` : 'Pieces you love, kept in one place.'}</p>
      </div>

      {wishlist.count === 0 ? (
        <div className="mt-14 flex flex-col items-center text-center">
          <span className="grid size-20 place-items-center rounded-full bg-cream text-maroon">
            <Icon name="heart" size={34} />
          </span>
          <p className="serif mt-6 text-[26px] text-maroon">Nothing saved yet</p>
          <p className="mt-2 max-w-[34ch] text-[14px] text-ink-soft">Tap the heart on any saree to save it here for later.</p>
          <Button to="/shop/sarees" className="mt-7">
            Explore Sarees
          </Button>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
          {wishlist.items.map((p, i) => (
            <li key={p.id} className="anim-fade-up group" style={{ '--delay': `${i * 40}ms` }}>
              <div className="relative overflow-hidden rounded-soft">
                <Link to={`/product/${p.slug}`}>
                  <Img id={p.images[0]} alt={p.name} sizes="(min-width: 1024px) 23vw, 50vw" className="aspect-4/5" position="50% 15%" imgClassName="transition-transform duration-1000 group-hover:scale-105" />
                </Link>
                <button
                  type="button"
                  onClick={() => wishlist.remove(p.id)}
                  aria-label={`Remove ${p.name} from wishlist`}
                  className="press absolute top-2 right-2 grid size-9 place-items-center rounded-full bg-ivory/90 shadow-float backdrop-blur-sm hover:text-danger"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
              <Link to={`/product/${p.slug}`} className="mt-3 block">
                <p className="line-clamp-1 text-[14px] hover:text-maroon">{p.name}</p>
                <p className="mt-1 text-[14px]">
                  <span className="font-semibold tabular-nums">{formatPrice(p.price)}</span>
                  {p.compareAt && <span className="ml-2 text-[12px] text-success">{discountOf(p)}% off</span>}
                </p>
              </Link>
              {p.sizes ? (
                <Button to={`/product/${p.slug}`} variant="outline" size="sm" className="mt-3 w-full">
                  Select Size
                </Button>
              ) : (
                <Button onClick={() => moveToBag(p)} variant="outline" size="sm" className="mt-3 w-full">
                  Move to Bag
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
