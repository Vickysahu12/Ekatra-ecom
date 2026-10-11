import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { AnimatePresence, motion, useDragControls, useReducedMotion } from 'motion/react'
import { getProductSync } from '../../services/catalog'
import { useCart } from '../cart/CartContext'
import { useToast } from '../toast/Toast'
import { useOverlay } from '../../hooks/useOverlay'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { formatPrice, discountOf } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { HeartButton } from '../wishlist/HeartButton'
import { cn } from '../../lib/cn'

// Quick view: a bottom sheet on phones (drag down to close), a centred modal on desktop.
// Any card can open it through useQuickView().openProduct(id).

const QuickViewContext = createContext(null)

export function QuickViewProvider({ children }) {
  const [productId, setProductId] = useState(null)
  const openProduct = useCallback((id) => setProductId(id), [])
  const close = useCallback(() => setProductId(null), [])
  const value = useMemo(() => ({ openProduct, close }), [openProduct, close])

  return (
    <QuickViewContext.Provider value={value}>
      {children}
      <QuickViewPanel productId={productId} onClose={close} />
    </QuickViewContext.Provider>
  )
}

// eslint-disable-next-line react/only-export-components
export function useQuickView() {
  const ctx = useContext(QuickViewContext)
  if (!ctx) throw new Error('useQuickView must be used inside <QuickViewProvider>')
  return ctx
}

function QuickViewPanel({ productId, onClose }) {
  const product = productId ? getProductSync(productId) : null
  const open = Boolean(product)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const reduce = useReducedMotion()
  const focusRef = useOverlay(open, onClose)
  const dragControls = useDragControls()

  const sheet = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : isDesktop
      ? {
          initial: { opacity: 0, scale: 0.96, y: 12 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.98, y: 6, transition: { duration: 0.18 } },
        }
      : { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%', transition: { duration: 0.25 } } }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-label={product.name}>
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close"
            className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-[3px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            {...sheet}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.12 }}
            drag={!isDesktop && !reduce ? 'y' : false}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => (info.offset.y > 110 || info.velocity.y > 600) && onClose()}
            className="relative max-h-[92dvh] w-full overflow-hidden rounded-t-[28px] bg-bg shadow-lift md:max-w-[920px] md:rounded-card"
          >
            {/* Drag handle (phones): pull down to close */}
            <div
              className="absolute inset-x-0 top-0 z-10 flex h-8 touch-none justify-center pt-2.5 md:hidden"
              onPointerDown={(e) => dragControls.start(e)}
              aria-hidden="true"
            >
              <span className="h-1 w-10 rounded-full bg-ink/25" />
            </div>
            <button
              ref={focusRef}
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="press absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full bg-bg/90 shadow-float backdrop-blur-sm"
            >
              <Icon name="close" size={18} />
            </button>

            <QuickViewBody key={product.id} product={product} onClose={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function QuickViewBody({ product, onClose }) {
  const { add, setOpen: openBag } = useCart()
  const { show } = useToast()
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [needSize, setNeedSize] = useState(false)
  const [slide, setSlide] = useState(0)
  const discount = discountOf(product)

  const addToBag = () => {
    if (!size) return setNeedSize(true)
    add(product.id, size, qty)
    onClose()
    show({
      title: 'Added to bag',
      body: `${product.name}, size ${size}`,
      image: product.images[0],
      action: { label: 'View bag', onClick: () => openBag(true) },
    })
  }

  return (
    <div className="grid max-h-[92dvh] grid-cols-1 overflow-y-auto overscroll-contain md:grid-cols-2 md:overflow-hidden">
      {/* Images: swipe on phones */}
      <div className="relative bg-soft md:h-full">
        <div
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:h-full"
          onScroll={(e) => setSlide(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        >
          {product.images.map((id) => (
            <Img
              key={id}
              id={id}
              alt={product.name}
              sizes="(min-width: 768px) 460px, 100vw"
              priority
              className="aspect-4/5 max-h-[52dvh] w-full shrink-0 snap-start md:aspect-auto md:h-full md:max-h-none md:min-h-[560px]"
              imgClassName="object-top"
            />
          ))}
        </div>
        {product.images.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5" aria-hidden="true">
            {product.images.map((id, i) => (
              <span
                key={id}
                className={cn('h-1.5 rounded-full bg-bg transition-all duration-300', i === slide ? 'w-5' : 'w-1.5 opacity-60')}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-7 md:max-h-[92dvh] md:overflow-y-auto">
        <div className="flex items-center gap-1.5 text-[13px] text-ink-soft">
          <Icon name="star" size={14} weight="fill" className="text-rose" />
          <span className="font-semibold text-ink">{product.rating}</span>
          <span>({product.reviews} reviews)</span>
        </div>
        <h2 className="mt-2 text-[24px] leading-tight font-bold sm:text-[28px]">{product.name}</h2>
        <p className="mt-1 text-[14px] text-ink-soft">{product.wash}</p>

        <p className="mt-4 flex items-baseline gap-2.5">
          <span className="text-[22px] font-bold tabular-nums">{formatPrice(product.price)}</span>
          {product.compareAt && (
            <>
              <span className="text-[15px] text-ink-soft tabular-nums line-through">{formatPrice(product.compareAt)}</span>
              <span className="rounded-full bg-rose-soft px-2 py-0.5 text-[12px] font-semibold text-rose">-{discount}%</span>
            </>
          )}
        </p>

        <fieldset className="mt-6">
          <legend className="flex w-full items-center justify-between text-[14px] font-semibold">
            <span>Select size</span>
            <a href="#" className="link-line text-[13px] font-medium text-ink-soft">
              Size guide
            </a>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => {
                  setSize(s)
                  setNeedSize(false)
                }}
                className={cn(
                  'press h-11 min-w-12 rounded-full border px-4 text-[14px] font-semibold transition-colors duration-150',
                  size === s ? 'border-ink bg-ink text-bg' : 'border-line-strong hover:border-ink',
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <p role="status" className={cn('mt-2 h-5 text-[13px] text-rose transition-opacity', needSize ? 'opacity-100' : 'opacity-0')}>
            {needSize ? 'Please pick a size' : ''}
          </p>
        </fieldset>

        <div className="mt-3 flex items-center gap-2.5">
          <div className="flex h-12 items-center rounded-full border border-line-strong">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="grid size-12 place-items-center rounded-full disabled:opacity-40"
              disabled={qty === 1}
            >
              <Icon name="minus" size={15} />
            </button>
            <span className="w-6 text-center text-[15px] font-semibold tabular-nums" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(9, q + 1))}
              aria-label="Increase quantity"
              className="grid size-12 place-items-center rounded-full"
            >
              <Icon name="plus" size={15} />
            </button>
          </div>
          <Button onClick={addToBag} className="flex-1">
            <Icon name="bag" size={18} />
            Add to bag
          </Button>
          <HeartButton product={product} size="lg" className="border border-line-strong shadow-none" />
        </div>

        <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-[13px] text-ink-soft">
          <li className="flex items-center gap-2.5">
            <Icon name="truck" size={17} className="text-ink" />
            Free shipping over ₹2,499. Delivered in 2 to 5 days.
          </li>
          <li className="flex items-center gap-2.5">
            <Icon name="returns" size={17} className="text-ink" />
            Easy 15-day returns with free pickup.
          </li>
        </ul>
      </div>
    </div>
  )
}
