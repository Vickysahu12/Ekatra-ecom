import { perks } from '../data/content'
import { Icon } from '../components/ui/Icon'

// Service promises. Two-by-two on phones, one row on desktop.
export function Perks() {
  return (
    <section aria-label="Why shop with us" className="shell pt-16 lg:pt-24">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-7 lg:grid-cols-4">
        {perks.map((p) => (
          <li key={p.title} className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blush">
              <Icon name={p.icon} size={22} />
            </span>
            <span>
              <span className="block text-[14px] font-bold">{p.title}</span>
              <span className="mt-0.5 block text-[13px] text-ink-soft">{p.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
