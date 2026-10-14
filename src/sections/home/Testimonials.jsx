import { Link } from 'react-router'
import { testimonials } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { SectionHeading } from '../../components/ui/SectionHeading'

// Customer words, each card linked to the saree she bought.
export function Testimonials() {
  const ref = useReveal()

  return (
    <section ref={ref} className="pt-16 lg:pt-24" aria-labelledby="love-title">
      <SectionHeading id="love-title" title="Loved Across India" sub="4.8 out of 5 from over 3,000 verified buyers" />
      <ul className="no-scrollbar mx-auto mt-9 flex max-w-[1320px] snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:grid lg:grid-cols-4 lg:px-10">
        {testimonials.map((t, i) => {
          const p = getProductSync(t.productId)
          return (
            <li
              key={t.name}
              className="flex w-[82vw] shrink-0 snap-start flex-col rounded-soft border border-line bg-white/60 p-6 sm:w-[46vw] lg:w-auto"
              data-reveal
              style={{ '--reveal-delay': `${i * 70}ms` }}
            >
              <span className="flex gap-0.5 text-gold" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }, (_, k) => (
                  <Icon key={k} name="star" size={14} weight="fill" />
                ))}
              </span>
              <p className="serif mt-4 flex-1 text-[19px] leading-snug text-ink italic">“{t.text}”</p>
              <p className="mt-5 text-[14px] font-medium">{t.name}</p>
              <p className="flex items-center gap-1 text-[12px] text-ink-soft">
                <Icon name="seal" size={13} weight="fill" className="text-success" /> Verified buyer, {t.city}
              </p>
              {p && (
                <Link to={`/product/${p.slug}`} className="group mt-4 flex items-center gap-3 border-t border-line pt-4">
                  <Img id={p.images[0]} alt="" sizes="48px" className="h-14 w-11 shrink-0 rounded-[2px]" position="50% 15%" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] text-ink-soft">She bought</span>
                    <span className="block truncate text-[13px] group-hover:text-maroon">{p.name}</span>
                  </span>
                  <Icon name="arrow" size={15} className="text-maroon transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
