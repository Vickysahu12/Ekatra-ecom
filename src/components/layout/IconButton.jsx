import { Icon } from '../ui/Icon'
import { cn } from '../../lib/cn'

/** Round header button with an optional count badge that bumps when `bumpKey` changes. */
export function IconButton({ icon, label, count, bumpKey, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={count ? `${label}, ${count} items` : label}
      className={cn('press relative grid size-10 place-items-center rounded-full bg-soft transition-colors duration-200 hover:bg-line lg:size-11', className)}
    >
      <Icon name={icon} size={19} />
      {count > 0 && (
        <span
          key={bumpKey}
          className={cn(
            'absolute -top-0.5 -right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-rose px-1 text-[10px] font-bold text-bg tabular-nums',
            bumpKey ? 'anim-bump' : '',
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}
