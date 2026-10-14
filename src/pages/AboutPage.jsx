import { artisan } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Img } from '../components/ui/Img'
import { Button } from '../components/ui/Button'
import { Ornament, SectionHeading } from '../components/ui/SectionHeading'

const CLUSTERS = [
  { name: 'Varanasi', craft: 'Banarasi brocade', image: 'p31-1' },
  { name: 'Kanchipuram', craft: 'Kanjivaram silk', image: 'p28-1' },
  { name: 'Paithan', craft: 'Paithani weaving', image: 'p33-2' },
  { name: 'Jaipur', craft: 'Leheriya & block print', image: 'p04-1' },
]

export function AboutPage() {
  useDocumentTitle('Our Story')
  return (
    <>
      <section className="bg-cream">
        <div className="shell grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="caps text-[11px] text-gold">Our Story</p>
            <h1 className="serif mt-3 text-[44px] leading-[1.05] text-maroon sm:text-[56px]">Ekatra means together</h1>
            <Ornament className="mt-5 justify-start" />
            <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-ink-soft">
              We started Ekatra to bring weavers and wearers closer. Every saree is sourced directly from artisan families, checked by hand, and
              finished for the way women dress today.
            </p>
            <Button to="/shop/sarees" className="mt-8">
              Shop the Collection
            </Button>
          </div>
          <Img id="p01-2" alt="A navy patola silk saree on display" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-4/5 rounded-soft lg:aspect-[4/4.2]" position="50% 25%" />
        </div>
      </section>

      <section id="artisans" className="shell scroll-mt-32 pt-16 lg:pt-24">
        <SectionHeading title="Our Craft Clusters" sub={artisan.body} />
        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {CLUSTERS.map((c) => (
            <li key={c.name} className="group">
              <div className="overflow-hidden rounded-soft">
                <Img id={c.image} alt="" sizes="(min-width: 1024px) 23vw, 50vw" className="aspect-4/5" position="50% 15%" imgClassName="transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <p className="serif mt-3 text-[22px] text-maroon">{c.name}</p>
              <p className="text-[13px] text-ink-soft">{c.craft}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-14 grid grid-cols-3 gap-4 rounded-soft bg-maroon p-6 text-center text-ivory sm:p-10">
          {artisan.stats.map((s) => (
            <div key={s.label}>
              <dd className="serif text-[34px] text-gold-soft sm:text-[44px]">{s.value}</dd>
              <dt className="text-[13px] text-ivory/70">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
