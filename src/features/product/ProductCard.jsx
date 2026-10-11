import { formatPrice, discountOf } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { HeartButton } from '../wishlist/HeartButton'
import { useQuickView } from '../quickview/QuickView'
import { cn } from '../../lib/cn'

/**
 * Product tile. Soft image well with a wishlist heart and an optional badge.
 * Tapping the image opens quick view; on desktop a "Quick add" pill also slides up on hover.
 */
export function ProductCard({ product, sizes = '(min-width: 1024px) 24vw, 50vw', className }) {
  const { openProduct } = useQuickView()
  const [primary, secondary] = product.images
  const discount = discountOf(product)

  return (
    <article className={cn('group relative', className)}>
      <div className="relative overflow-hidden rounded-media bg-soft">
        <button
          type="button"
          onClick={() => openProduct(product.id)}
          className="block w-full"
          aria-label={`Quick view ${product.name}`}
        >
          <Img
            id={primary}
            alt={`${product.name} in ${product.wash.toLowerCase()}`}
            sizes={sizes}
            className="aspect-3/4"
            imgClassName="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
          />
          {secondary && (
            <Img
              id={secondary}
              alt=""
              sizes={sizes}
              className="absolute! inset-0 opacity-0 transition-opacity duration-500 hover-device:group-hover:opacity-100"
            />
          )}
        </button>

        {(product.badge || discount > 0) && (
          <span
            className={cn(
              'pointer-events-none absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[11px] font-semibold',
              discount > 0 ? 'bg-rose text-bg' : 'bg-bg/90 text-ink backdrop-blur-sm',
            )}
          >
            {discount > 0 ? `-${discount}%` : product.badge}
          </span>
        )}

        <HeartButton product={product} className="absolute top-2.5 right-2.5" />

        {/* Desktop: quick add slides up on hover */}
        <button
          type="button"
          onClick={() => openProduct(product.id)}
          className={cn(
            'press absolute inset-x-2.5 bottom-2.5 hidden h-11 items-center justify-center gap-2 rounded-full bg-bg/95 text-[13px] font-semibold shadow-float backdrop-blur-sm hover-device:flex',
            'translate-y-3 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100',
          )}
          tabIndex={-1}
        >
          <Icon name="plus" size={15} />
          Quick add
        </button>
      </div>

      <div className="mt-3 px-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[14px] leading-snug font-medium">
            <button type="button" onClick={() => openProduct(product.id)} className="text-left hover:underline hover:underline-offset-2">
              {product.name}
            </button>
          </h3>
          {product.swatches?.length > 0 && (
            <span className="mt-1 flex shrink-0 -space-x-1" aria-label={`${product.swatches.length} washes`}>
              {product.swatches.map((c) => (
                <span key={c} className="size-3.5 rounded-full border-2 border-bg" style={{ backgroundColor: c }} />
              ))}
            </span>
          )}
        </div>
        <p className="mt-1 flex items-baseline gap-2 text-[14px]">
          <span className="font-bold tabular-nums">{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className="text-[13px] text-ink-soft tabular-nums line-through">{formatPrice(product.compareAt)}</span>
          )}
        </p>
      </div>
    </article>
  )
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-3/4 animate-pulse rounded-media bg-soft" />
      <div className="mt-3 h-3.5 w-3/4 rounded-full bg-soft" />
      <div className="mt-2 h-3.5 w-1/3 rounded-full bg-soft" />
    </div>
  )
}
