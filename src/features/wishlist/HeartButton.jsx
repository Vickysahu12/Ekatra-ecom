import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useWishlist } from './WishlistContext'
import { useToast } from '../toast/Toast'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

/** Wishlist toggle. Fills maroon and pops when saved, confirms with a toast. */
export function HeartButton({ product, className, size = 'md' }) {
  const wishlist = useWishlist()
  const { show } = useToast()
  const navigate = useNavigate()
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
        action: { label: 'View', onClick: () => navigate('/wishlist') },
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
        'press grid place-items-center rounded-full transition-colors duration-200',
        size === 'md' ? 'size-9 bg-ivory/90 shadow-float backdrop-blur-sm hover:bg-ivory' : 'size-14 border border-line-strong hover:border-maroon',
        className,
      )}
    >
      <Icon
        key={popKey}
        name="heart"
        size={size === 'md' ? 18 : 22}
        weight={saved ? 'fill' : 'regular'}
        className={cn(saved ? 'text-maroon' : 'text-ink', popKey > 0 && 'anim-pop')}
      />
    </button>
  )
}
