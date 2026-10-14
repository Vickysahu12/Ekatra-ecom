import { Link, useNavigate } from 'react-router'
import { useCart } from '../features/cart/CartContext'
import { useWishlist } from '../features/wishlist/WishlistContext'
import { useToast } from '../features/toast/Toast'
import { OrderSummary } from '../features/cart/OrderSummary'
import { FreeShippingBar } from '../features/cart/FreeShippingBar'
import { QtyStepper } from '../features/cart/QtyStepper'
import { ProductRail } from '../features/product/ProductRail'
import { queryProducts } from '../services/catalog'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice } from '../lib/format'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { CheckoutSteps } from '../features/checkout/CheckoutSteps'

export function CartPage() {
  const cart = useCart()
  const wishlist = useWishlist()
  const { show } = useToast()
  const navigate = useNavigate()
  useDocumentTitle('Your Bag')

  const moveToWishlist = (line) => {
    wishlist.add(line.productId)
    cart.remove(line.key)
    show({ title: 'Moved to wishlist', body: line.product.name, image: line.product.images[0] })
  }

  const removeLine = (line) => {
    cart.remove(line.key)
    show({
      title: 'Removed from bag',
      body: line.product.name,
      image: line.product.images[0],
      action: { label: 'Undo', onClick: () => cart.add(line.productId, line.variant, line.qty) },
    })
  }

  if (cart.items.length === 0) {
    return (
      <div className="shell flex flex-col items-center py-24 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-cream text-maroon">
          <Icon name="bag" size={34} />
        </span>
        <h1 className="serif mt-6 text-[36px] text-maroon">Your bag is empty</h1>
        <p className="mt-2 max-w-[38ch] text-[15px] text-ink-soft">Looks like you haven&apos;t added anything yet. Our bestsellers are a good place to start.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/shop/sarees">Shop Sarees</Button>
          {wishlist.count > 0 && (
            <Button to="/wishlist" variant="outline">
              View Wishlist ({wishlist.count})
            </Button>
          )}
        </div>
        <div className="w-full text-left">
          <ProductRail id="best-title" title="Our Bestsellers" products={queryProducts({ bestseller: true })} />
        </div>
      </div>
    )
  }

  return (
    <div className="shell pt-6 lg:pt-10">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Bag' }]} />
      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="serif text-[38px] text-maroon">
          Your Bag <span className="font-sans text-[16px] text-ink-soft">({cart.count} items)</span>
        </h1>
        <CheckoutSteps current={0} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
        <div>
          <FreeShippingBar subtotal={cart.subtotal} />
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {cart.items.map((line) => (
              <li key={line.key} className="anim-fade-in flex gap-4 py-5 sm:gap-6">
                <Link to={`/product/${line.product.slug}`} className="group shrink-0 overflow-hidden rounded-soft">
                  <Img id={line.product.images[0]} alt={line.product.name} sizes="140px" className="h-[150px] w-[120px] sm:h-[175px] sm:w-[140px]" position="50% 15%" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="caps text-[10px] text-gold">{line.product.fabric}</p>
                      <Link to={`/product/${line.product.slug}`} className="serif mt-0.5 block text-[20px] leading-tight hover:text-maroon">
                        {line.product.name}
                      </Link>
                      <p className="mt-1 text-[13px] text-ink-soft">{line.variant}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[16px] font-semibold tabular-nums">{formatPrice(line.lineTotal)}</p>
                      {line.lineMrp > line.lineTotal && <p className="text-[12px] text-ink-soft tabular-nums line-through">{formatPrice(line.lineMrp)}</p>}
                    </div>
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-[12px] text-success">
                    <Icon name="truck" size={15} /> Ships in 24 hours
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-4">
                    <QtyStepper value={line.qty} min={1} onChange={(q) => cart.setQty(line.key, q)} label={line.product.name} small />
                    <button type="button" onClick={() => moveToWishlist(line)} className="link-line flex items-center gap-1.5 text-[13px] text-ink-soft hover:text-maroon">
                      <Icon name="heart" size={15} /> Move to wishlist
                    </button>
                    <button type="button" onClick={() => removeLine(line)} className="link-line flex items-center gap-1.5 text-[13px] text-ink-soft hover:text-danger">
                      <Icon name="trash" size={15} /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/shop" className="caps link-line mt-6 inline-flex items-center gap-2 text-[12px] text-maroon">
            <Icon name="arrow-left" size={15} /> Continue shopping
          </Link>
        </div>

        <div className="lg:sticky lg:top-32 lg:self-start">
          <OrderSummary>
            <Button size="lg" className="mt-5 w-full" onClick={() => navigate('/checkout')}>
              <Icon name="lock" size={17} /> Proceed to Checkout
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-ink-soft">
              <Icon name="seal" size={14} /> Safe and secure payments. Easy returns.
            </p>
          </OrderSummary>
        </div>
      </div>
    </div>
  )
}
