import { Icon } from './Icon'
import { cn } from '../../lib/cn'

/** Section title with an optional "See all" style link on the same line. */
export function SectionHeading({ title, link, id, className, children }) {
  return (
    <div className={cn('flex items-end justify-between gap-6', className)}>
      <div>
        <h2 id={id} className="title">
          {title}
        </h2>
        {children}
      </div>
      {link && (
        <a href={link.href} className="group mb-1 flex shrink-0 items-center gap-1 text-[14px] font-semibold">
          <span className="link-line">{link.label}</span>
          <Icon
            name="arrow"
            size={15}
            className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
          />
        </a>
      )}
    </div>
  )
}
