import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

/** − qty + control. Going below 1 is left to the caller (it removes the line in the cart). */
export function QtyStepper({ value, onChange, label, min = 0, max = 10, small }) {
  const btn = cn('grid place-items-center transition-colors hover:bg-cream disabled:opacity-35', small ? 'size-8' : 'size-11')
  return (
    <div className={cn('inline-flex items-center rounded-soft border border-line-strong', small ? 'h-8' : 'h-11')}>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${label}`}
      >
        <Icon name="minus" size={small ? 13 : 15} />
      </button>
      <span key={value} className={cn('anim-fade-in text-center font-medium tabular-nums', small ? 'w-6 text-[13px]' : 'w-8 text-[15px]')} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase quantity of ${label}`}
      >
        <Icon name="plus" size={small ? 13 : 15} />
      </button>
    </div>
  )
}
