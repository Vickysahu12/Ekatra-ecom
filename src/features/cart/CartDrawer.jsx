import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router'
import { useCart } from './CartContext'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { SideDrawer } from '../../components/ui/SideDrawer'
import { FreeShippingBar } from './FreeShippingBar'
import { QtyStepper } from './QtyStepper'

// Mini bag: opens after "Add to bag" so she can keep shopping or check out.
export function CartDrawer() {
  const { items, count, subtotal, open, setOpen, setQty, remove } = useCart()
  const navigate = useNavigate()
  const close = useCallback(() => setOpen(false), [setOpen])
  const go = (to) => {
    close()
    navigate(to)
  }

  return (
    <SideDrawer
      open={open}
      onClose={close}
      title="Your Bag"
      count={count}
      footer={
        items.length > 0 && (
          <footer className="border-t border-line bg-cream/60 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="mb-4 flex items-baseline justify-between">
              <p className="text-[14px] text-ink-soft">Subtotal</p>
              <p className="text-[18px] font-semibold tabular-nums">{formatPrice(subtotal)}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => go('/cart')}>
                View Bag
              </Button>
              <Button onClick={() => go('/checkout')}>Checkout</Button>
            </div>
            <p className="mt-3 text-center text-[12px] text-ink-soft">Shipping and coupons applied at checkout.</p>
          </footer>
        )
      }
    >
      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-10 pb-16 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-cream text-maroon">
            <Icon name="bag" size={28} />
          </span>
          <p className="serif mt-5 text-[24px] text-maroon">Your bag is empty</p>
          <p className="mt-2 text-[14px] text-ink-soft">Find a saree you love and it will wait here.</p>
          <Button className="mt-6" onClick={() => go('/shop/sarees')}>
            Shop Sarees
          </Button>
        </div>
      ) : (
        <>
          <div className="px-5 pt-4">
            <FreeShippingBar subtotal={subtotal} />
          </div>
          <ul className="flex-1 divide-y divide-line overflow-y-auto overscroll-contain px-5">
            {items.map((line) => (
              <li key={line.key} className="flex gap-3.5 py-4">
                <Link to={`/product/${line.product.slug}`} onClick={close} className="shrink-0">
                  <Img id={line.product.images[0]} sizes="80px" className="h-[100px] w-20 rounded-[2px]" position="50% 15%" alt="" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      to={`/product/${line.product.slug}`}
                      onClick={close}
                      className="line-clamp-2 text-[14px] leading-snug hover:text-maroon"
                    >
                      {line.product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(line.key)}
                      className="press -mt-1 -mr-1 grid size-8 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-cream hover:text-danger"
                      aria-label={`Remove ${line.product.name}`}
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </div>
                  <p className="mt-0.5 text-[12px] text-ink-soft">{line.variant}</p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <QtyStepper value={line.qty} onChange={(q) => setQty(line.key, q)} label={line.product.name} small />
                    <p className="text-[14px] font-semibold tabular-nums">{formatPrice(line.lineTotal)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </SideDrawer>
  )
}
