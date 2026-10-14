import { useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../cart/CartContext'
import { useToast } from '../toast/Toast'
import { formatPrice, discountOf } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { HeartButton } from '../wishlist/HeartButton'
import { cn } from '../../lib/cn'

export const DEFAULT_SAREE_VARIANT = 'Unstitched blouse'

/**
 * Product tile. The second photo crossfades in on hover (desktop), the heart saves to
 * wishlist, and a quick-add bar slides up: one tap for sarees, a size row for suit sets.
 */
export function ProductCard({ product, sizes = '(min-width: 1024px) 23vw, 50vw', priority, className }) {
  const { add, setOpen } = useCart()
  const { show } = useToast()
  const [picking, setPicking] = useState(false)
  const discount = discountOf(product)
  const href = `/product/${product.slug}`

  const quickAdd = (variant) => {
    add(product.id, variant)
    setPicking(false)
    show({
      title: 'Added to bag',
      body: `${product.name}${product.sizes ? `, size ${variant}` : ''}`,
      image: product.images[0],
      action: { label: 'View bag', onClick: () => setOpen(true) },
    })
  }

  return (
    <article className={cn('group relative', className)} onMouseLeave={() => setPicking(false)}>
      <div className="relative overflow-hidden rounded-soft bg-cream">
        <Link to={href} className="block" aria-label={product.name}>
          <Img
            id={product.images[0]}
            alt={`${product.name}, ${product.fabric.toLowerCase()} in ${product.color.toLowerCase()}`}
            sizes={sizes}
            priority={priority}
            className="aspect-4/5"
            position="50% 15%"
            imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
          <Img
            id={product.images[1]}
            alt=""
            sizes={sizes}
            className="absolute! inset-0 opacity-0 transition-opacity duration-500 hover-device:group-hover:opacity-100"
            position="50% 15%"
          />
        </Link>

        {(product.badge || discount > 0) && (
          <span
            className={cn(
              'caps pointer-events-none absolute top-2.5 left-2.5 rounded-[2px] px-2 py-1 text-[10px]',
              product.badge ? 'bg-maroon text-ivory' : 'bg-gold text-white',
            )}
          >
            {product.badge ?? `${discount}% off`}
          </span>
        )}

        <HeartButton product={product} className="absolute top-2 right-2" />

        {/* Desktop quick add */}
        <div
          className={cn(
            'absolute inset-x-2 bottom-2 hidden translate-y-2 opacity-0 transition-[opacity,transform] duration-300 ease-out hover-device:block',
            'group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100',
          )}
        >
          {picking && product.sizes ? (
            <div className="rounded-soft bg-ivory/95 p-2 shadow-float backdrop-blur-sm">
              <p className="caps px-1 pb-1.5 text-[10px] text-ink-soft">Select size</p>
              <div className="grid grid-cols-6 gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => quickAdd(s)}
                    className="press h-8 rounded-[2px] border border-line text-[12px] font-medium transition-colors hover:border-maroon hover:bg-maroon hover:text-ivory"
                    aria-label={`Add ${product.name}, size ${s}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => (product.sizes ? setPicking(true) : quickAdd(DEFAULT_SAREE_VARIANT))}
              className="press caps flex h-10 w-full items-center justify-center gap-2 rounded-soft bg-ivory/95 text-[11px] text-maroon shadow-float backdrop-blur-sm transition-colors hover:bg-maroon hover:text-ivory"
            >
              <Icon name="bag" size={16} />
              {product.sizes ? 'Quick add' : 'Add to bag'}
            </button>
          )}
        </div>
      </div>

      <Link to={href} className="block pt-3">
        <p className="text-[11px] tracking-wide text-ink-soft uppercase">{product.fabric}</p>
        <h3 className="mt-0.5 line-clamp-1 text-[14px] leading-snug text-ink group-hover:text-maroon">{product.name}</h3>
        <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 text-[14px]">
          <span className="font-semibold tabular-nums">{formatPrice(product.price)}</span>
          {product.compareAt && (
            <>
              <span className="text-[12px] text-ink-soft tabular-nums line-through">{formatPrice(product.compareAt)}</span>
              <span className="text-[12px] font-medium text-success">{discount}% off</span>
            </>
          )}
        </p>
        <p className="mt-1 flex items-center gap-1 text-[12px] text-ink-soft">
          <Icon name="star" size={12} weight="fill" className="text-gold" />
          {product.rating.toFixed(1)}
          <span>({product.reviews})</span>
        </p>
      </Link>
    </article>
  )
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-4/5 animate-pulse rounded-soft bg-cream" />
      <div className="mt-3 h-3 w-1/3 rounded bg-cream" />
      <div className="mt-2 h-3.5 w-3/4 rounded bg-cream" />
      <div className="mt-2 h-3.5 w-1/2 rounded bg-cream" />
    </div>
  )
}
