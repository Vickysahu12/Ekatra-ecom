import { useState } from 'react'
import { Link } from 'react-router'
import { listOrders } from '../services/orders'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice } from '../lib/format'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { Ornament } from '../components/ui/SectionHeading'

const STAGES = ['Confirmed', 'Packed', 'Shipped', 'Delivered']

/** Demo order history: orders placed in this browser, with a simple tracking line. */
export function AccountPage() {
  const orders = listOrders()
  const [now] = useState(() => Date.now())
  useDocumentTitle('My Orders')

  return (
    <div className="shell max-w-[900px] py-10 lg:py-14">
      <div className="text-center">
        <h1 className="serif text-[40px] text-maroon">My Orders</h1>
        <Ornament className="mt-3" />
      </div>

      {orders.length === 0 ? (
        <div className="mt-14 flex flex-col items-center text-center">
          <span className="grid size-20 place-items-center rounded-full bg-cream text-maroon">
            <Icon name="package" size={34} />
          </span>
          <p className="serif mt-6 text-[26px] text-maroon">No orders yet</p>
          <p className="mt-2 text-[14px] text-ink-soft">When you place an order it will show up here with live tracking.</p>
          <Button to="/shop" className="mt-7">
            Start Shopping
          </Button>
        </div>
      ) : (
        <ul className="mt-10 space-y-5">
          {orders.map((o) => {
            // Demo progress: one stage per day since the order was placed.
            const stage = Math.min(STAGES.length - 1, Math.floor((now - new Date(o.placedAt)) / 86400000))
            return (
              <li key={o.id} className="rounded-soft border border-line bg-white/60">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
                  <div>
                    <p className="text-[14px] font-medium">Order #{o.id}</p>
                    <p className="text-[12px] text-ink-soft">
                      Placed on {new Date(o.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <p className="text-[15px] font-semibold tabular-nums">{formatPrice(o.total)}</p>
                </div>
                <div className="px-5 py-4">
                  <ol className="flex items-center" aria-label="Order status">
                    {STAGES.map((s, i) => (
                      <li key={s} className="flex flex-1 items-center last:flex-none">
                        <span className="flex flex-col items-center gap-1.5">
                          <span className={`grid size-6 place-items-center rounded-full ${i <= stage ? 'bg-success text-white' : 'border border-line-strong bg-ivory'}`}>
                            {i <= stage && <Icon name="check" size={12} weight="bold" />}
                          </span>
                          <span className={`text-[11px] ${i <= stage ? 'text-ink' : 'text-ink-soft'}`}>{s}</span>
                        </span>
                        {i < STAGES.length - 1 && <span className={`mx-1 mb-5 h-0.5 flex-1 ${i < stage ? 'bg-success' : 'bg-line'}`} />}
                      </li>
                    ))}
                  </ol>
                  <ul className="mt-4 flex gap-2">
                    {o.items.map((it) => (
                      <li key={`${it.productId}-${it.variant}`}>
                        <Img id={it.image} alt={it.name} sizes="56px" className="h-[70px] w-14 rounded-[2px]" position="50% 15%" />
                      </li>
                    ))}
                  </ul>
                  <Link to={`/order/${o.id}`} className="caps link-line mt-4 inline-flex items-center gap-1.5 text-[11px] text-maroon">
                    View details <Icon name="arrow" size={13} />
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
