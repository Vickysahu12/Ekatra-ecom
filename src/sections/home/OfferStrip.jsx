import { offers } from '../../data/content'
import { Icon } from '../../components/ui/Icon'
import { CopyCode } from '../../components/ui/CopyCode'

// Maroon band of three offers. Each code copies with one tap.
export function OfferStrip() {
  return (
    <section aria-label="Offers" className="mt-16 bg-maroon text-ivory lg:mt-24">
      <ul className="shell grid divide-y divide-ivory/15 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {offers.map((o) => (
          <li key={o.code} className="flex items-center gap-4 py-6 lg:justify-center lg:px-6 lg:py-8">
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-gold-soft/60 text-gold-soft">
              <Icon name={o.icon} size={22} />
            </span>
            <div className="min-w-0">
              <p className="caps text-[10px] text-gold-soft">{o.eyebrow}</p>
              <p className="serif text-[24px] leading-tight">{o.title}</p>
              <p className="text-[12px] text-ivory/70">{o.body}</p>
            </div>
            <CopyCode code={o.code} light className="ml-auto shrink-0 lg:ml-2" />
          </li>
        ))}
      </ul>
    </section>
  )
}
