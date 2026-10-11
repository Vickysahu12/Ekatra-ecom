import { useState } from 'react'
import { useWishlist } from './WishlistContext'
import { useToast } from '../toast/Toast'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

/** Wishlist toggle. Fills rose and pops when saved, confirms with a toast. */
export function HeartButton({ product, className, size = 'md' }) {
  const wishlist = useWishlist()
  const { show } = useToast()
  const saved = wishlist.has(product.id)
  const [popKey, setPopKey] = useState(0)

  const onClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const added = wishlist.toggle(product.id)
    if (added) {
      setPopKey((k) => k + 1)
      show({
        title: 'Saved to wishlist',
        body: product.name,
        image: product.images[0],
        action: { label: 'View', onClick: () => wishlist.setOpen(true) },
      })
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      className={cn(
        'press grid place-items-center rounded-full bg-bg/90 shadow-[0_4px_14px_-6px_rgb(23_20_26/0.3)] backdrop-blur-sm transition-colors duration-200 hover:bg-bg',
        size === 'md' ? 'size-9' : 'size-11',
        className,
      )}
    >
      <Icon
        key={popKey}
        name="heart"
        size={size === 'md' ? 17 : 20}
        weight={saved ? 'fill' : 'regular'}
        className={cn(saved ? 'text-rose' : 'text-ink', popKey > 0 && 'anim-pop')}
      />
    </button>
  )
}
