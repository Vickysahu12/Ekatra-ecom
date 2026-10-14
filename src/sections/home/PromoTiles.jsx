import { Link } from 'react-router'
import { promoTiles } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

// Two collection tiles side by side: text panel + photo inside each.
export function PromoTiles() {
  const ref = useReveal()

  return (
    <section ref={ref} className="shell pt-16 lg:pt-24" aria-label="Featured collections">
      <ul className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {promoTiles.map((t, i) => {
          const dark = t.tone === 'maroon'
          return (
            <li key={t.id} data-reveal style={{ '--reveal-delay': `${i * 100}ms` }}>
              <Link
                to={t.cta.to}
                className={cn(
                  'group grid h-full grid-cols-[1.1fr_1fr] overflow-hidden rounded-soft',
                  dark ? 'bg-maroon-deep text-ivory' : 'bg-sand text-ink',
                )}
              >
                <div className="flex flex-col justify-center p-6 sm:p-9">
                  <p className={cn('caps text-[10px] sm:text-[11px]', dark ? 'text-gold-soft' : 'text-maroon')}>{t.eyebrow}</p>
                  <h3 className={cn('serif mt-2 text-[26px] leading-tight sm:text-[34px]', dark ? 'text-ivory' : 'text-maroon')}>{t.title}</h3>
                  <p className={cn('mt-2.5 text-[13px] leading-relaxed sm:text-[14px]', dark ? 'text-ivory/70' : 'text-ink-soft')}>{t.body}</p>
                  <span className={cn('caps mt-6 inline-flex items-center gap-2 text-[11px]', dark ? 'text-gold-soft' : 'text-maroon')}>
                    {t.cta.label}
                    <Icon name="arrow" size={15} className="transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                  </span>
                </div>
                <Img
                  id={t.image}
                  alt=""
                  sizes="(min-width: 1024px) 24vw, 45vw"
                  className="min-h-[280px] sm:min-h-[340px]"
                  position="50% 15%"
                  imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
