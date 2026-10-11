import { useCallback } from 'react'
import { useWishlist } from './WishlistContext'
import { useQuickView } from '../quickview/QuickView'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { SideDrawer, DrawerEmpty } from '../../components/ui/SideDrawer'

// Saved items. "Add to bag" opens quick view so she can pick a size.
export function WishlistDrawer() {
  const { items, count, open, setOpen, toggle } = useWishlist()
  const { openProduct } = useQuickView()
  const close = useCallback(() => setOpen(false), [setOpen])

  return (
    <SideDrawer open={open} onClose={close} title="Wishlist" count={count}>
      {items.length === 0 ? (
        <DrawerEmpty
          icon="heart"
          title="Nothing saved yet"
          body="Tap the heart on any piece to keep it here for later."
          action={
            <Button href="#trending" onClick={close} className="mt-6">
              Browse trending
            </Button>
          }
        />
      ) : (
        <ul className="grid flex-1 grid-cols-2 content-start gap-x-3 gap-y-6 overflow-y-auto overscroll-contain px-5 pt-1 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          {items.map((p) => (
            <li key={p.id}>
              <div className="relative">
                <Img id={p.images[0]} alt={p.name} sizes="200px" className="aspect-3/4 rounded-[16px]" />
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  aria-label={`Remove ${p.name} from wishlist`}
                  className="press absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-bg/90 backdrop-blur-sm"
                >
                  <Icon name="close" size={14} />
                </button>
              </div>
              <p className="mt-2 text-[13px] leading-snug font-medium">{p.name}</p>
              <p className="text-[13px] font-bold tabular-nums">{formatPrice(p.price)}</p>
              <button
                type="button"
                onClick={() => {
                  close()
                  openProduct(p.id)
                }}
                className="press mt-2 h-9 w-full rounded-full border border-line-strong text-[12px] font-semibold hover:border-ink"
              >
                Add to bag
              </button>
            </li>
          ))}
        </ul>
      )}
    </SideDrawer>
  )
}
