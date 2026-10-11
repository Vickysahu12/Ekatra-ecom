import { useRef } from 'react'
import { reviews, reviewSummary } from '../data/content'
import { getProductSync } from '../services/catalog'
import { useQuickView } from '../features/quickview/QuickView'
import { useReveal } from '../hooks/useReveal'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'

function Stars({ size = 14 }) {
  return (
    <span className="flex gap-0.5 text-rose" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={size} weight="fill" />
      ))}
    </span>
  )
}

// Rating summary + a swipeable rail of reviews, each linked to the piece she bought.
export function Reviews() {
  const ref = useReveal()
  const rail = useRef(null)
  const { openProduct } = useQuickView()

  const scrollBy = (dir) => {
    const el = rail.current
    const card = el?.querySelector('li')
    if (card) el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="pt-16 lg:pt-24" aria-labelledby="reviews-title">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10 lg:pl-10">
        <div className="px-4 sm:px-6 lg:px-0 lg:py-2" data-reveal>
          <h2 id="reviews-title" className="title">
            Loved by thousands
          </h2>
          <div className="mt-5 flex items-center gap-4 lg:block">
            <p className="text-[56px] leading-none font-extrabold tracking-[-0.05em] lg:text-[72px]">{reviewSummary.rating}</p>
            <div className="lg:mt-3">
              <Stars size={18} />
              <p className="mt-1.5 text-[14px] text-ink-soft">
                From {reviewSummary.count.toLocaleString('en-IN')} reviews
              </p>
            </div>
          </div>
          <div className="mt-6 hidden gap-2 lg:flex">
            {[
              { dir: -1, icon: 'caret-left', label: 'Previous reviews' },
              { dir: 1, icon: 'caret-right', label: 'Next reviews' },
            ].map((b) => (
              <button
                key={b.dir}
                type="button"
                onClick={() => scrollBy(b.dir)}
                aria-label={b.label}
                className="press grid size-11 place-items-center rounded-full bg-soft transition-colors hover:bg-ink hover:text-bg"
              >
                <Icon name={b.icon} size={18} />
              </button>
            ))}
          </div>
        </div>

        <ul
          ref={rail}
          className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:scroll-px-6 sm:gap-4 sm:px-6 lg:scroll-px-0 lg:pr-10 lg:pl-0"
        >
          {reviews.map((r, i) => {
            const product = getProductSync(r.productId)
            return (
              <li
                key={r.name}
                className="flex w-[82vw] shrink-0 snap-start flex-col rounded-card bg-soft p-5 sm:w-[380px] sm:p-6"
                data-reveal
                style={{ '--reveal-delay': `${i * 70}ms` }}
              >
                <Stars />
                <p className="mt-4 flex-1 text-[16px] leading-relaxed font-medium">“{r.text}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <Img id={r.avatar} alt="" sizes="44px" className="size-11 shrink-0 rounded-full" position="50% 15%" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-bold">{r.name}</p>
                    <p className="flex items-center gap-1 text-[12px] text-ink-soft">
                      <Icon name="verified" size={13} weight="fill" className="text-rose" />
                      Verified buyer, {r.city}
                    </p>
                  </div>
                </div>
                {product && (
                  <button
                    type="button"
                    onClick={() => openProduct(product.id)}
                    className="group mt-4 flex items-center gap-3 rounded-[14px] bg-bg p-2 text-left"
                  >
                    <Img id={product.images[0]} alt="" sizes="40px" className="h-12 w-10 shrink-0 rounded-[10px]" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] text-ink-soft">She bought</span>
                      <span className="block truncate text-[13px] font-semibold">{product.name}</span>
                    </span>
                    <Icon name="arrow" size={15} className="mr-1 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
