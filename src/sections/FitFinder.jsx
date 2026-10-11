import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { fits } from '../data/content'
import { cutout } from '../data/cutouts'
import { useReveal } from '../hooks/useReveal'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { cn } from '../lib/cn'

// Pick a leg shape and see it on a model, with the three details that define it.
export function FitFinder() {
  const ref = useReveal()
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState(fits[0].id)
  const tabRefs = useRef([])
  const active = fits.find((f) => f.id === activeId)

  // Arrow keys move between tabs, as in a native tab list.
  const onKeyDown = (e, index) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    e.preventDefault()
    const next = (index + delta + fits.length) % fits.length
    setActiveId(fits[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="fits" ref={ref} className="shell pt-16 lg:pt-24" aria-labelledby="fits-title">
      <div className="grid grid-cols-1 overflow-hidden rounded-card bg-soft lg:grid-cols-2" data-reveal>
        <div className="flex flex-col p-6 sm:p-10 lg:p-14">
          <p className="text-[13px] font-semibold text-rose">Fit guide</p>
          <h2 id="fits-title" className="title mt-2">
            Find your perfect fit
          </h2>
          <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-ink-soft">
            Not sure which jean is you? Pick a shape and see how it sits.
          </p>

          <div
            role="tablist"
            aria-label="Fits"
            className="no-scrollbar -mx-6 mt-7 flex gap-1 overflow-x-auto px-6 sm:mx-0 sm:self-start sm:rounded-full sm:bg-bg sm:p-1"
          >
            {fits.map((fit, i) => {
              const selected = fit.id === activeId
              return (
                <button
                  key={fit.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`fit-tab-${fit.id}`}
                  aria-selected={selected}
                  aria-controls="fit-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(fit.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    'press relative h-10 shrink-0 rounded-full px-5 text-[14px] font-semibold transition-colors duration-200',
                    selected ? 'text-bg' : 'bg-bg text-ink sm:bg-transparent sm:hover:bg-soft',
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="fit-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0.15 }}
                    />
                  )}
                  <span className="relative">{fit.name}</span>
                </button>
              )
            })}
          </div>

          <div id="fit-panel" role="tabpanel" aria-labelledby={`fit-tab-${active.id}`} className="mt-8 lg:mt-auto">
            <div key={active.id}>
              <p className="anim-fade-up text-[44px] leading-none font-extrabold tracking-[-0.045em] sm:text-[56px]">{active.name}</p>
              <p className="anim-fade-up mt-3 text-[15px]" style={{ '--delay': '60ms' }}>
                {active.line}
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-3 gap-2">
              {Object.entries(active.specs).map(([label, value]) => (
                <div key={label} className="rounded-[16px] bg-bg px-3.5 py-3">
                  <dt className="text-[12px] text-ink-soft">{label}</dt>
                  <dd className="mt-0.5 text-[15px] font-bold">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button href="#trending">
                Shop {active.name.toLowerCase()}
                <Icon name="arrow" size={16} />
              </Button>
              <a href="#" className="link-line text-[14px] font-semibold">
                Size guide
              </a>
            </div>
          </div>
        </div>

        {/* Stage */}
        <div className="relative mx-3 mb-3 min-h-[440px] overflow-hidden rounded-[20px] bg-powder sm:min-h-[520px] lg:m-3 lg:ml-0 lg:min-h-[620px]" aria-hidden="true">
          <div className="absolute bottom-[5%] left-1/2 h-[3%] w-[44%] -translate-x-1/2 rounded-[50%] bg-ink/15 blur-md" />
          {fits.map((fit) => {
            const img = cutout(fit.cutout)
            return (
              <img
                key={fit.id}
                src={img.src}
                width={img.w}
                height={img.h}
                alt=""
                loading="lazy"
                className={cn(
                  'absolute bottom-[6%] left-1/2 h-[86%] w-auto max-w-[88%] -translate-x-1/2 object-contain object-bottom',
                  'transition-[opacity,translate] duration-500 ease-out',
                  fit.id === activeId ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                )}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
