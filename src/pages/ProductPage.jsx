import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getProductBySlug, getRelated, getSiblings } from '../services/catalog'
import { categoryLabels, occasionLabels } from '../data/content'
import { site } from '../config/site'
import { useCart, unitPrice } from '../features/cart/CartContext'
import { useToast } from '../features/toast/Toast'
import { HeartButton } from '../features/wishlist/HeartButton'
import { Gallery } from '../features/product/Gallery'
import { PincodeCheck } from '../features/product/PincodeCheck'
import { ProductReviews } from '../features/product/ProductReviews'
import { ProductRail } from '../features/product/ProductRail'
import { QtyStepper } from '../features/cart/QtyStepper'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice, discountOf } from '../lib/format'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Accordion } from '../components/ui/Accordion'
import { Modal } from '../components/ui/Modal'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { CopyCode } from '../components/ui/CopyCode'
import { NotFoundPage } from './NotFoundPage'
import { cn } from '../lib/cn'

const BLOUSE_SIZES = ['32', '34', '36', '38', '40', '42', '44']
const SUIT_CHART = [
  ['XS', '32', '26', '36'],
  ['S', '34', '28', '38'],
  ['M', '36', '30', '40'],
  ['L', '38', '32', '42'],
  ['XL', '40', '34', '44'],
  ['XXL', '42', '36', '46'],
]

function Option({ selected, onClick, children, className, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'press rounded-soft border text-[14px] transition-[border-color,background-color,color] duration-150',
        selected ? 'border-maroon bg-maroon text-ivory' : 'border-line-strong hover:border-maroon',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function ProductPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  if (!product) return <NotFoundPage />
  return <ProductView product={product} />
}

function ProductView({ product }) {
  const navigate = useNavigate()
  const cart = useCart()
  const { show } = useToast()
  useDocumentTitle(product.name)

  const isSaree = product.category === 'sarees'
  const [blouse, setBlouse] = useState('unstitched') // unstitched | stitched
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [error, setError] = useState('')
  const [addState, setAddState] = useState('idle') // idle | adding | added
  const [chartOpen, setChartOpen] = useState(false)
  const buyRef = useRef(null)
  const [showSticky, setShowSticky] = useState(false)

  const siblings = getSiblings(product)
  const related = getRelated(product)
  const recent = useRecentlyViewed(product.id)
  const discount = discountOf(product)

  const variant = isSaree ? (blouse === 'stitched' ? (size ? `Stitched blouse: ${size}` : null) : 'Unstitched blouse') : size
  const price = unitPrice(product, variant ?? '')

  // Sticky mobile bar appears once the main buttons scroll out of view.
  useEffect(() => {
    const el = buyRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const needsChoice = () => {
    if (variant) return false
    setError(isSaree ? 'Please choose your blouse size.' : 'Please select a size.')
    buyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return true
  }

  const addToBag = async () => {
    if (needsChoice() || addState !== 'idle') return
    setAddState('adding')
    await new Promise((r) => setTimeout(r, 450))
    cart.add(product.id, variant, qty)
    setAddState('added')
    cart.setOpen(true)
    setTimeout(() => setAddState('idle'), 1800)
  }

  const buyNow = () => {
    if (needsChoice()) return
    cart.add(product.id, variant, qty)
    navigate('/checkout')
  }

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: product.name, url })
      else {
        await navigator.clipboard.writeText(url)
        show({ title: 'Link copied', body: 'Share it with someone who would love it' })
      }
    } catch {
      // user cancelled the share sheet
    }
  }

  return (
    <>
      <div className="shell pt-4 lg:pt-8">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: categoryLabels[product.category], to: `/shop/${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="shell mt-4 grid gap-8 lg:mt-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Gallery images={product.images} name={product.name} />
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="caps text-[11px] text-gold">
                {product.fabric} {isSaree ? 'Saree' : 'Suit Set'}
              </p>
              <h1 className="serif mt-2 text-[32px] leading-[1.1] text-maroon sm:text-[40px]">{product.name}</h1>
            </div>
            <button
              type="button"
              onClick={share}
              aria-label="Share"
              className="press mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-line-strong transition-colors hover:border-maroon hover:text-maroon"
            >
              <Icon name="share" size={18} />
            </button>
          </div>

          <a href="#reviews" className="mt-3 inline-flex items-center gap-2 text-[13px]">
            <span className="flex items-center gap-1 rounded-[2px] bg-success px-1.5 py-0.5 text-[12px] font-medium text-white">
              {product.rating.toFixed(1)} <Icon name="star" size={11} weight="fill" />
            </span>
            <span className="link-line text-ink-soft">{product.reviews} ratings</span>
          </a>

          <div className="mt-5 border-y border-line py-5">
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span key={price} className="anim-fade-in text-[28px] font-semibold tabular-nums">
                {formatPrice(price)}
              </span>
              {product.compareAt && (
                <>
                  <span className="text-[16px] text-ink-soft tabular-nums line-through">MRP {formatPrice(product.compareAt)}</span>
                  <span className="rounded-[2px] bg-gold-soft px-2 py-0.5 text-[13px] font-medium text-maroon-deep">{discount}% OFF</span>
                </>
              )}
            </p>
            <p className="mt-1 text-[12px] text-ink-soft">Inclusive of all taxes. Free shipping above {formatPrice(site.freeShippingOver)}.</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-soft bg-cream px-4 py-3 text-[13px]">
              <Icon name="tag" size={17} className="text-maroon" />
              <span>Extra 10% off with</span>
              <CopyCode code="FESTIVE10" />
            </div>
          </div>

          {/* Colours of the same design */}
          {siblings.length > 1 && (
            <div className="mt-6">
              <p className="text-[14px]">
                Colour: <span className="font-medium text-maroon">{product.color}</span>
                <span className="ml-2 text-[12px] text-ink-soft">({siblings.length} colours)</span>
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {siblings.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={`/product/${s.slug}`}
                      replace
                      aria-label={`${s.color}${s.id === product.id ? ', selected' : ''}`}
                      aria-current={s.id === product.id}
                      className={cn(
                        'block overflow-hidden rounded-[3px] border-2 p-0.5 transition-colors duration-200',
                        s.id === product.id ? 'border-maroon' : 'border-transparent hover:border-gold',
                      )}
                    >
                      <Img id={s.images[0]} alt="" sizes="56px" className="h-[70px] w-14 rounded-[2px]" position="50% 25%" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Options */}
          <div ref={buyRef} className="mt-7 scroll-mt-40">
            {isSaree ? (
              <fieldset>
                <legend className="text-[14px]">Blouse</legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Option selected={blouse === 'unstitched'} onClick={() => { setBlouse('unstitched'); setError('') }} className="px-3 py-3 text-left">
                    <span className="block font-medium">Unstitched</span>
                    <span className={cn('block text-[12px]', blouse === 'unstitched' ? 'text-ivory/75' : 'text-ink-soft')}>0.8 m blouse piece</span>
                  </Option>
                  <Option selected={blouse === 'stitched'} onClick={() => setBlouse('stitched')} className="px-3 py-3 text-left">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Icon name="scissors" size={15} /> Stitched
                    </span>
                    <span className={cn('block text-[12px]', blouse === 'stitched' ? 'text-ivory/75' : 'text-ink-soft')}>
                      + {formatPrice(site.stitchingFee)}, ready to wear
                    </span>
                  </Option>
                </div>
                <div className={cn('grid transition-[grid-template-rows] duration-300 ease-out', blouse === 'stitched' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                  <div className="overflow-hidden">
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-[14px]">Blouse size (bust, inches)</p>
                      <button type="button" onClick={() => setChartOpen(true)} className="link-line flex items-center gap-1 text-[13px] text-maroon">
                        <Icon name="ruler" size={15} /> Size guide
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {BLOUSE_SIZES.map((s) => (
                        <Option key={s} selected={size === s} onClick={() => { setSize(s); setError('') }} className="h-11 min-w-12 px-3" tabIndex={blouse === 'stitched' ? 0 : -1}>
                          {s}
                        </Option>
                      ))}
                    </div>
                  </div>
                </div>
              </fieldset>
            ) : (
              <fieldset>
                <div className="flex items-center justify-between">
                  <legend className="text-[14px]">Size</legend>
                  <button type="button" onClick={() => setChartOpen(true)} className="link-line flex items-center gap-1 text-[13px] text-maroon">
                    <Icon name="ruler" size={15} /> Size guide
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <Option key={s} selected={size === s} onClick={() => { setSize(s); setError('') }} className="h-11 min-w-13 px-3">
                      {s}
                    </Option>
                  ))}
                </div>
              </fieldset>
            )}
            <p role="alert" className={cn('mt-3 min-h-5 text-[13px] text-danger', error && 'anim-shake')}>
              {error}
            </p>

            <div className="mt-2 flex items-center gap-3">
              <QtyStepper value={qty} onChange={(q) => setQty(Math.max(1, q))} min={1} max={5} label={product.name} />
              <span className="text-[12px] text-ink-soft">Only a few left in this colour</span>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={addToBag}
                className={cn(
                  'press caps relative flex h-14 flex-1 items-center justify-center gap-2.5 overflow-hidden rounded-soft text-[13px] transition-colors duration-300',
                  addState === 'added' ? 'bg-success text-white' : 'bg-maroon text-ivory hover:bg-maroon-deep',
                )}
              >
                {addState === 'adding' && (
                  <span className="anim-fade-in size-4 animate-spin rounded-full border-2 border-ivory/30 border-t-ivory" aria-hidden="true" />
                )}
                {addState === 'added' && <Icon name="check" size={18} weight="bold" className="anim-pop" />}
                {addState === 'idle' && <Icon name="bag" size={18} />}
                <span aria-live="polite">{addState === 'adding' ? 'Adding' : addState === 'added' ? 'Added to bag' : 'Add to bag'}</span>
              </button>
              <HeartButton product={product} size="lg" />
            </div>
            <Button variant="outline" size="lg" onClick={buyNow} className="mt-2 w-full">
              Buy Now
            </Button>
          </div>

          <ul className="mt-6 grid grid-cols-3 gap-2 text-center text-[12px] text-ink-soft">
            {[
              ['seal', 'Handpicked quality'],
              ['returns', '7-day easy returns'],
              ['cash', 'Cash on delivery'],
            ].map(([icon, label]) => (
              <li key={label} className="rounded-soft border border-line px-2 py-3">
                <Icon name={icon} size={22} className="mx-auto text-maroon" />
                <span className="mt-1.5 block leading-tight">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-soft border border-line p-4">
            <PincodeCheck />
          </div>

          <div className="mt-6 border-t border-line">
            <Accordion title="Product details" defaultOpen>
              <p>{product.blurb}</p>
              <dl className="mt-4 grid grid-cols-[120px_1fr] gap-y-2 text-[13px]">
                <dt>Fabric</dt>
                <dd className="text-ink">{product.fabric}</dd>
                <dt>Colour</dt>
                <dd className="text-ink">{product.color}</dd>
                <dt>Includes</dt>
                <dd className="text-ink">{product.length}</dd>
                <dt>Occasion</dt>
                <dd className="text-ink">{product.occasions.map((o) => occasionLabels[o]).join(', ')}</dd>
                <dt>Product code</dt>
                <dd className="text-ink uppercase">EK-{product.id}</dd>
              </dl>
            </Accordion>
            <Accordion title="Fabric & care">
              <ul className="list-disc space-y-1 pl-5">
                {product.care.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="mt-3">Slight variation in colour and weave is natural for handloom and is part of its character.</p>
            </Accordion>
            <Accordion title="Shipping & returns">
              <p>
                Dispatched within 24 hours. Delivered in 2 to 7 days across India. Free shipping above {formatPrice(site.freeShippingOver)}, otherwise{' '}
                {formatPrice(site.shippingFee)}.
              </p>
              <p className="mt-2">Easy returns and exchange within 7 days of delivery. Stitched blouses can be exchanged for size only.</p>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="shell mt-16">
        <ProductReviews product={product} />
      </div>

      <ProductRail id="related-title" title="You May Also Like" products={related} />
      {recent.length > 0 && <ProductRail id="recent-title" title="Recently Viewed" products={recent} />}

      {/* Mobile sticky buy bar */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-line bg-ivory/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-lg transition-transform duration-300 ease-out lg:hidden',
          showSticky ? 'translate-y-0' : 'translate-y-full',
        )}
        aria-hidden={!showSticky}
      >
        <Img id={product.images[0]} alt="" sizes="40px" className="h-12 w-10 shrink-0 rounded-[2px]" position="50% 15%" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px]">{product.name}</p>
          <p className="text-[15px] font-semibold tabular-nums">{formatPrice(price)}</p>
        </div>
        <Button onClick={addToBag} tabIndex={showSticky ? 0 : -1}>
          {addState === 'added' ? 'Added' : 'Add to bag'}
        </Button>
      </div>

      <Modal open={chartOpen} onClose={() => setChartOpen(false)} title="Size Guide">
        <p className="text-[14px] text-ink-soft">All measurements are body measurements in inches.</p>
        <table className="mt-4 w-full text-left text-[14px]">
          <thead>
            <tr className="caps border-b border-line text-[11px] text-ink-soft">
              <th className="py-2 font-medium">Size</th>
              <th className="py-2 font-medium">Bust</th>
              <th className="py-2 font-medium">Waist</th>
              <th className="py-2 font-medium">Hip</th>
            </tr>
          </thead>
          <tbody>
            {SUIT_CHART.map(([s, ...m]) => (
              <tr key={s} className="border-b border-line">
                <td className="py-2.5 font-medium text-maroon">{s}</td>
                {m.map((v, i) => (
                  <td key={i} className="py-2.5 tabular-nums">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-[13px] text-ink-soft">
          For stitched blouses, choose your bust size. Need help? WhatsApp us at {site.phone}.
        </p>
      </Modal>
    </>
  )
}
