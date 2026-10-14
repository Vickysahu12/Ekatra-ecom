import { site } from '../../config/site'
import { formatPrice } from '../../lib/format'
import { Icon } from '../../components/ui/Icon'

/** "You're ₹X away from free shipping" with a filling progress line. */
export function FreeShippingBar({ subtotal }) {
  const remaining = Math.max(0, site.freeShippingOver - subtotal)
  const progress = Math.min(1, subtotal / site.freeShippingOver)

  return (
    <div className="rounded-soft border border-gold-soft bg-cream px-4 py-3">
      <p className="flex items-center gap-2 text-[13px]">
        <Icon name="truck" size={18} className="text-maroon" />
        {remaining > 0 ? (
          <span>
            Add <strong className="font-semibold text-maroon">{formatPrice(remaining)}</strong> more for free shipping
          </span>
        ) : (
          <strong className="font-medium text-success">Your order ships free</strong>
        )}
      </p>
      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-sand">
        <div
          className="h-full origin-left rounded-full bg-gold transition-transform duration-700 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  )
}
