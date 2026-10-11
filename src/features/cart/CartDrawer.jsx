import { useCallback } from 'react'
import { useCart } from './CartContext'
import { site } from '../../config/site'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { SideDrawer, DrawerEmpty } from '../../components/ui/SideDrawer'

// Bag panel: free-shipping progress, line items with steppers, checkout.
export function CartDrawer() {
  const { items, count, subtotal, open, setOpen, setQty } = useCart()
  const close = useCallback(() => setOpen(false), [setOpen])
  const remaining = Math.max(0, site.freeShippingOver - subtotal)
  const progress = Math.min(1, subtotal / site.freeShippingOver)

  return (
    <SideDrawer
      open={open}
      onClose={close}
      title="Your bag"
      count={count}
      footer={
        items.length > 0 && (
          <footer className="border-t border-line px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="mb-4 flex items-baseline justify-between">
              <p className="text-[14px] text-ink-soft">Subtotal</p>
              <p className="text-[20px] font-bold tabular-nums">{formatPrice(subtotal)}</p>
            </div>
            <Button size="lg" className="w-full">
              Checkout
              <Icon name="arrow" size={17} />
            </Button>
            <p className="mt-3 text-center text-[12px] text-ink-soft">Taxes included. UPI, cards and COD at checkout.</p>
          </footer>
        )
      }
    >
      {items.length === 0 ? (
        <DrawerEmpty
          icon="bag"
          title="Your bag is empty"
          body="Find something you love and it will wait for you here."
          action={
            <Button href="#trending" onClick={close} className="mt-6">
              Start shopping
            </Button>
          }
        />
      ) : (
        <>
          <div className="mx-5 rounded-[16px] bg-blush px-4 py-3">
            <p className="text-[13px]">
              {remaining > 0 ? (
                <>
                  You&apos;re <strong className="font-bold">{formatPrice(remaining)}</strong> away from free shipping
                </>
              ) : (
                <strong className="font-bold">Yay, your order ships free</strong>
              )}
            </p>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-bg">
              <div
                className="h-full origin-left rounded-full bg-rose transition-transform duration-500 ease-out"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
          </div>

          <ul className="mt-2 flex-1 divide-y divide-line overflow-y-auto overscroll-contain px-5">
            {items.map((line, index) => (
              <li key={`${line.productId}-${line.size}`} className="flex gap-3.5 py-4">
                <Img id={line.product.images[0]} sizes="88px" className="h-28 w-22 shrink-0 rounded-[14px]" alt="" />
                <div className="flex min-w-0 flex-1 flex-col py-0.5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[14px] leading-snug font-semibold">{line.product.name}</p>
                    <p className="text-[14px] font-bold tabular-nums">{formatPrice(line.product.price * line.qty)}</p>
                  </div>
                  <p className="mt-1 text-[13px] text-ink-soft">
                    {line.product.wash} / Size {line.size}
                  </p>
                  <div className="mt-auto flex items-center self-start rounded-full border border-line-strong">
                    <button
                      type="button"
                      className="grid size-9 place-items-center rounded-full"
                      onClick={() => setQty(index, line.qty - 1)}
                      aria-label={line.qty === 1 ? `Remove ${line.product.name}` : `Remove one ${line.product.name}`}
                    >
                      <Icon name={line.qty === 1 ? 'close' : 'minus'} size={13} />
                    </button>
                    <span className="w-6 text-center text-[13px] font-semibold tabular-nums" aria-live="polite">
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      className="grid size-9 place-items-center rounded-full"
                      onClick={() => setQty(index, line.qty + 1)}
                      aria-label={`Add one more ${line.product.name}`}
                    >
                      <Icon name="plus" size={13} />
                    </button>
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
