import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { heroSlides } from '../../data/content'
import { Img } from '../../components/ui/Img'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { Ornament } from '../../components/ui/SectionHeading'
import { cn } from '../../lib/cn'

const DURATION = 6500

// Campaign banner: the photo sits on the right and melts into warm cream on the left,
// where the serif headline lives. Crossfades between slides; the active dash fills as a
// progress bar. Autoplay pauses on hover, focus and hidden tabs. Swipe on touch.
export function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const reduce = useReducedMotion()
  const startX = useRef(null)
  const slide = heroSlides[index]
  const count = heroSlides.length
  const go = (i) => setIndex((i + count) % count)

  useEffect(() => {
    const onVis = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative isolate overflow-hidden bg-cream"
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
      {/* Photos */}
      <div className="relative aspect-[4/4.2] sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[64%]" aria-hidden="true">
        {heroSlides.map((s, i) => (
          <Img
            key={s.id}
            id={s.image}
            sizes="(min-width: 1024px) 64vw, 100vw"
            priority={i === 0}
            position={s.focus}
            className={cn('absolute! inset-0 transition-opacity duration-1000 ease-out', i === index ? 'opacity-100' : 'opacity-0')}
            imgClassName={cn('transition-transform duration-[7000ms] ease-out', i === index && !reduce ? 'scale-[1.06]' : 'scale-100')}
          />
        ))}
        {/* Fade into cream: bottom on phones, left on desktop */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cream to-transparent lg:inset-y-0 lg:left-0 lg:h-auto lg:w-2/5 lg:bg-gradient-to-r" />
      </div>

      {/* Copy */}
      <div className="shell relative lg:flex lg:min-h-[min(calc(100svh-170px),600px)] lg:items-center">
        <div key={slide.id} className="-mt-10 max-w-[480px] pb-14 lg:mt-0 lg:py-20" aria-live="polite">
          <p className="anim-fade-up caps text-[11px] text-gold">{slide.eyebrow}</p>
          <h1
            className="anim-fade-up serif mt-3 text-[44px] leading-[1.02] text-maroon sm:text-[56px] lg:text-[68px]"
            style={{ '--delay': '80ms' }}
          >
            {slide.title}
          </h1>
          <Ornament className="anim-fade-in mt-5 justify-start" />
          <p className="anim-fade-up mt-5 max-w-[38ch] text-[16px] leading-relaxed text-ink-soft" style={{ '--delay': '160ms' }}>
            {slide.sub}
          </p>
          <div className="anim-fade-up mt-8 flex flex-wrap items-center gap-5" style={{ '--delay': '240ms' }}>
            <Button to={slide.cta.to} size="lg">
              {slide.cta.label}
            </Button>
            <span className="hidden sm:block">
              <Button to="/shop?sort=new" variant="outline" size="lg">
                New Arrivals
              </Button>
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="shell absolute inset-x-0 bottom-5 flex items-center justify-between lg:bottom-8">
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
                'relative h-[3px] overflow-hidden bg-maroon/20 transition-[width] duration-500 ease-out',
                i === index ? 'w-12' : 'w-6 hover:bg-maroon/40',
              )}
            >
              {i === index && (
                <span
                  key={`${s.id}-${index}`}
                  className="hero-progress absolute inset-0 bg-maroon"
                  data-paused={hovered || hidden}
                  style={{ '--duration': `${DURATION}ms`, transform: reduce ? 'scaleX(1)' : undefined }}
                  onAnimationEnd={() => go(index + 1)}
                />
              )}
            </button>
          ))}
        </div>
        <div className="hidden gap-2 lg:flex">
          {[
            { d: -1, icon: 'caret-left', label: 'Previous slide' },
            { d: 1, icon: 'caret-right', label: 'Next slide' },
          ].map((b) => (
            <button
              key={b.d}
              type="button"
              onClick={() => go(index + b.d)}
              aria-label={b.label}
              className="press grid size-11 place-items-center rounded-full bg-ivory/85 text-maroon shadow-float backdrop-blur-sm transition-colors hover:bg-maroon hover:text-ivory"
            >
              <Icon name={b.icon} size={18} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
