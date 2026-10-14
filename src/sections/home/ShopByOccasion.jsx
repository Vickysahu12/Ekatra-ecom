import { Link } from 'react-router'
import { occasions } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { SectionHeading } from '../../components/ui/SectionHeading'

// Gold-ringed occasion circles. The ring tightens and the photo lifts on hover.
export function ShopByOccasion() {
  const ref = useReveal()

  return (
    <section ref={ref} className="pt-16 lg:pt-20" aria-labelledby="occasion-title">
      <SectionHeading id="occasion-title" title="Shop by Occasion" />
      <ul className="no-scrollbar mx-auto mt-9 flex max-w-[1320px] snap-x gap-5 overflow-x-auto px-4 pb-2 sm:px-6 lg:justify-between lg:px-10">
        {occasions.map((o, i) => (
          <li key={o.id} className="w-[100px] shrink-0 snap-start sm:w-[130px] lg:w-[160px]" data-reveal style={{ '--reveal-delay': `${i * 60}ms` }}>
            <Link to={o.to} className="group block text-center">
              <span className="block rounded-full border border-gold/60 p-1.5 transition-[padding,border-color] duration-500 ease-out group-hover:border-maroon group-hover:p-1">
                <Img
                  id={o.image}
                  alt=""
                  sizes="160px"
                  className="aspect-square rounded-full"
                  position="50% 10%"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </span>
              <span className="caps mt-3 block text-[11px] text-ink transition-colors group-hover:text-maroon sm:text-[12px]">{o.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
