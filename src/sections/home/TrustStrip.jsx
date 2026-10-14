import { trustPoints } from '../../data/content'
import { Icon } from '../../components/ui/Icon'

// Four promises right under the hero: COD, shipping, quality, returns.
export function TrustStrip() {
  return (
    <section aria-label="Why shop with us" className="border-b border-line bg-ivory">
      <ul className="shell no-scrollbar flex gap-8 overflow-x-auto py-5 lg:grid lg:grid-cols-4 lg:gap-6">
        {trustPoints.map((t) => (
          <li key={t.title} className="flex shrink-0 items-center gap-3 lg:justify-center">
            <span className="grid size-10 place-items-center rounded-full bg-maroon text-ivory">
              <Icon name={t.icon} size={19} />
            </span>
            <span>
              <span className="block text-[14px] font-medium">{t.title}</span>
              <span className="block text-[12px] text-ink-soft">{t.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
