import { promo } from '../data/content'
import { getProductSync } from '../services/catalog'
import { useQuickView } from '../features/quickview/QuickView'
import { useReveal } from '../hooks/useReveal'
import { formatPrice, discountOf } from '../lib/format'
import { Img } from '../components/ui/Img'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { HeartButton } from '../features/wishlist/HeartButton'

// Campaign card next to a single spotlight product, after the khy two-up row.
export function PromoPair() {
  const ref = useReveal()
  const { openProduct } = useQuickView()
  const product = getProductSync(promo.spotlightId)
  const discount = product ? discountOf(product) : 0

  return (
    <section ref={ref} className="shell pt-16 lg:pt-24" aria-label={promo.label}>
      <div className="grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-[1.55fr_1fr]">
        {/* Campaign */}
        <a href={promo.cta.href} className="group relative block overflow-hidden rounded-card" data-reveal>
          <Img
            id={promo.image}
            alt="Model in a denim jacket over a grey hoodie against a blue wall"
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="aspect-4/5 sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[560px]"
            imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
            position="50% 30%"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-bg sm:p-10">
            <span className="rounded-full bg-bg/20 px-3.5 py-1.5 text-[12px] font-semibold backdrop-blur-md">{promo.label}</span>
            <h2 className="mt-4 max-w-[14ch] text-[32px] leading-[1.04] font-extrabold tracking-[-0.035em] sm:text-[44px]">
              {promo.title}
            </h2>
            <span className="press mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-bg px-6 text-[14px] font-semibold text-ink">
              {promo.cta.label}
              <Icon name="arrow" size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </a>

        {/* Spotlight product */}
        {product && (
          <article className="group flex flex-col rounded-card bg-soft p-3 sm:p-4" data-reveal style={{ '--reveal-delay': '100ms' }}>
            <div className="relative overflow-hidden rounded-media">
              <button type="button" onClick={() => openProduct(product.id)} className="block w-full" aria-label={`Quick view ${product.name}`}>
                <Img
                  id={product.images[0]}
                  alt={product.name}
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="aspect-4/5"
                  imgClassName="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                />
              </button>
              {discount > 0 && (
                <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-rose px-3 py-1 text-[12px] font-semibold text-bg">
                  Sale -{discount}%
                </span>
              )}
              <HeartButton product={product} className="absolute top-3 right-3" />
            </div>
            <div className="flex flex-1 flex-col px-1 pt-4">
              <p className="text-[12px] font-semibold text-rose">Limited quantity</p>
              <h3 className="mt-1 text-[18px] font-bold">{product.name}</h3>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="text-[17px] font-bold tabular-nums">{formatPrice(product.price)}</span>
                {product.compareAt && <span className="text-[14px] text-ink-soft tabular-nums line-through">{formatPrice(product.compareAt)}</span>}
              </p>
              <Button onClick={() => openProduct(product.id)} className="mt-5 w-full lg:mt-auto">
                Choose size
              </Button>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
