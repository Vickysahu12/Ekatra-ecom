import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { heroSlides } from '../data/content'
import { cutout } from '../data/cutouts'
import { getProductSync } from '../services/catalog'
import { useQuickView } from '../features/quickview/QuickView'
import { formatPrice } from '../lib/format'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { Img } from '../components/ui/Img'
import { cn } from '../lib/cn'

const DURATION = 7000

// Full-width campaign hero, after khy: one large model, centred and cropped at the thigh,
// on a soft pastel glow. Slides crossfade; the active dot fills as a progress bar.
// Autoplay pauses on hover, focus and hidden tabs. Swipe on touch.
export function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [tabHidden, setTabHidden] = useState(false)
  const reduce = useReducedMotion()
  const { openProduct } = useQuickView()
  const startX = useRef(null)
  const slide = heroSlides[index]
  const product = getProductSync(slide.productId)
  const count = heroSlides.length

  const go = (i) => setIndex((i + count) % count)
  const paused = hovered || tabHidden

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <section
      id="top"
      className="relative isolate h-[min(calc(100svh-180px),700px)] min-h-[600px] overflow-hidden lg:h-[min(calc(100svh-112px),820px)] lg:min-h-[620px]"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return
        const dx = e.clientX - startX.current
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
        startX.current = null
      }}
    >
      {/* Soft glow behind the model, one layer per slide so the colour crossfades */}
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden="true"
          className={cn('absolute inset-0 -z-10 transition-opacity duration-1000 ease-out', i === index ? 'opacity-100' : 'opacity-0')}
          style={{ background: `radial-gradient(48% 62% at 50% 46%, ${s.tint}, var(--color-bg) 100%)` }}
        />
      ))}

      {/* Models: large, centred, cropped by the section's bottom edge */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {heroSlides.map((s, i) => {
          const img = cutout(s.model)
          return (
            <img
              key={s.id}
              src={img.src}
              width={img.w}
              height={img.h}
              alt=""
              fetchPriority={i === 0 ? 'high' : undefined}
              loading={i === 0 ? 'eager' : 'lazy'}
              className={cn(
                'absolute top-[2%] left-1/2 h-[118%] w-auto max-w-none -translate-x-1/2 object-contain object-top sm:h-[135%] lg:top-[4%] lg:h-[160%]',
                'transition-[opacity,scale] duration-1000 ease-out',
                i === index ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0',
              )}
            />
          )
        })}
        {/* Fade the bottom into the page so the crop feels intentional (stronger on phones under the copy) */}
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-bg from-45% via-bg/85 to-transparent lg:h-[18%] lg:from-0% lg:via-bg/0" />
      </div>

      {/* Copy: bottom on phones, left-centred on desktop */}
      <div className="shell relative flex h-full flex-col justify-end pb-16 lg:justify-center lg:pb-0">
        <div key={slide.id} className="max-w-[440px]" aria-live="polite">
          <p className="anim-fade-up text-[13px] font-semibold text-rose">{slide.label}</p>
          <h1
            className="anim-fade-up mt-2 text-[40px] leading-[1.02] font-extrabold tracking-[-0.045em] sm:text-[54px] lg:text-[72px]"
            style={{ '--delay': '70ms' }}
          >
            {slide.title}
          </h1>
          <p
            className="anim-fade-up mt-3 max-w-[34ch] text-[15px] leading-relaxed text-ink-soft lg:mt-4 lg:text-[16px]"
            style={{ '--delay': '140ms' }}
          >
            {slide.sub}
          </p>
          <div className="anim-fade-up mt-6 flex flex-wrap items-center gap-4 lg:mt-8" style={{ '--delay': '210ms' }}>
            <Button href={slide.cta.href} size="lg">
              {slide.cta.label}
              <Icon name="arrow" size={17} />
            </Button>
            <a href="#lookbook" className="link-line hidden text-[15px] font-semibold sm:inline">
              View lookbook
            </a>
          </div>
        </div>
      </div>

      {/* "In the look" card, desktop */}
      {product && (
        <button
          key={product.id}
          type="button"
          onClick={() => openProduct(product.id)}
          className="anim-fade-up group absolute top-1/2 right-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))] hidden w-[230px] -translate-y-1/2 rounded-[20px] border border-bg/60 bg-bg/70 p-2.5 text-left shadow-lift backdrop-blur-xl transition-transform duration-300 hover:-translate-y-[calc(50%+4px)] lg:block"
          style={{ '--delay': '320ms' }}
          aria-label={`In the look: ${product.name}, ${formatPrice(product.price)}. Open quick view`}
        >
          <Img id={product.images[0]} alt="" sizes="210px" className="aspect-4/3 rounded-[14px]" position="50% 25%" />
          <span className="flex items-end justify-between gap-2 px-1.5 pt-3 pb-1">
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold text-ink-soft">In the look</span>
              <span className="block truncate text-[14px] font-semibold">{product.name}</span>
              <span className="block text-[14px] font-bold tabular-nums">{formatPrice(product.price)}</span>
            </span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-bg transition-transform duration-300 group-hover:rotate-90">
              <Icon name="plus" size={16} />
            </span>
          </span>
        </button>
      )}

      {/* Controls */}
      <div className="shell absolute inset-x-0 bottom-0 flex items-center justify-between pb-6 lg:pb-8">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${s.title}`}
              onClick={() => go(i)}
              className={cn(
                'relative h-1.5 overflow-hidden rounded-full bg-ink/15 transition-[width] duration-500 ease-out',
                i === index ? 'w-12' : 'w-1.5 hover:bg-ink/30',
              )}
            >
              {i === index && (
                <span
                  key={`${s.id}-${index}`}
                  className="hero-progress absolute inset-0 rounded-full bg-ink"
                  data-paused={paused}
                  style={{ '--duration': `${DURATION}ms`, transform: reduce ? 'scaleX(1)' : undefined }}
                  onAnimationEnd={() => go(index + 1)}
                />
              )}
            </button>
          ))}
        </div>
        <div className="hidden gap-2 lg:flex">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="press grid size-11 place-items-center rounded-full bg-bg/80 shadow-float backdrop-blur-sm transition-colors hover:bg-bg"
          >
            <Icon name="caret-left" size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="press grid size-11 place-items-center rounded-full bg-bg/80 shadow-float backdrop-blur-sm transition-colors hover:bg-bg"
          >
            <Icon name="caret-right" size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
