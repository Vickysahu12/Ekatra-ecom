import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { megaMenus, navLinks } from '../../config/navigation'
import { site } from '../../config/site'
import { useOverlay } from '../../hooks/useOverlay'
import { useSearch } from '../../features/search/SearchOverlay'
import { Img } from '../ui/Img'
import { Icon } from '../ui/Icon'
import { CopyCode } from '../ui/CopyCode'
import { Wordmark } from './Wordmark'
import { cn } from '../../lib/cn'

const curtain = [0.76, 0, 0.24, 1]

/**
 * Full-screen phone menu, app style.
 * The screen reveals top-down like a curtain; serif tabs with a sliding gold underline
 * switch between Sarees / Suit Sets / Occasions, and each tab shows a featured banner
 * plus a two-column grid of photo tiles. Tab content slides in the direction you moved.
 */
export function MobileMenu({ open, onClose }) {
  const reduce = useReducedMotion()
  const focusRef = useOverlay(open, onClose)
  const { openSearch } = useSearch()
  const [tab, setTab] = useState(megaMenus[0].id)
  const [dir, setDir] = useState(1)
  const index = megaMenus.findIndex((m) => m.id === tab)
  const menu = megaMenus[index]
  const items = menu.columns.flatMap((c) => c.items)

  const pick = (id) => {
    setDir(megaMenus.findIndex((m) => m.id === id) > index ? 1 : -1)
    setTab(id)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-ivory lg:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.45, ease: curtain } }}
          transition={{ duration: 0.6, ease: curtain }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 pt-[max(12px,env(safe-area-inset-top))] pb-2">
            <Wordmark className="items-start" />
            <button
              ref={focusRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="press grid size-11 place-items-center rounded-full bg-maroon text-ivory transition-transform duration-500 ease-out active:rotate-90"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain">
            {/* Search */}
            <div className="anim-fade-up px-5 pt-2" style={{ '--delay': '250ms' }}>
              <button
                type="button"
                onClick={() => {
                  onClose()
                  openSearch()
                }}
                className="flex h-12 w-full items-center gap-3 rounded-full bg-cream px-5 text-left text-[14px] text-ink-soft"
              >
                <Icon name="search" size={19} className="text-maroon" />
                Search sarees, fabrics, colours…
              </button>
            </div>

            {/* Serif tabs with sliding underline */}
            <div role="tablist" aria-label="Menu sections" className="anim-fade-up mt-5 flex gap-6 border-b border-line px-5" style={{ '--delay': '320ms' }}>
              {megaMenus.map((m) => {
                const on = m.id === tab
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => pick(m.id)}
                    className={cn('serif relative pb-3 text-[22px] transition-colors duration-300', on ? 'text-maroon' : 'text-ink-soft/70')}
                  >
                    {m.label}
                    {on && (
                      <motion.span
                        layoutId="mobile-underline"
                        className="absolute inset-x-0 -bottom-px h-[2px] bg-gold"
                        transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.45, bounce: 0.15 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Tab content */}
            <div className="overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.div
                  key={tab}
                  role="tabpanel"
                  custom={dir}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60, transition: { duration: 0.18 } }}
                  transition={{ type: 'spring', duration: 0.45, bounce: 0 }}
                  className="px-5 pt-5"
                >
                  {/* Featured banner */}
                  <Link to={menu.feature.to} onClick={onClose} className="anim-fade-up group relative block h-44 overflow-hidden rounded-[14px]" style={{ '--delay': '380ms' }}>
                    <Img id={menu.feature.image} alt="" sizes="420px" className="absolute! inset-0" position="50% 22%" imgClassName="transition-transform duration-1000 group-active:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-r from-maroon-deep/90 via-maroon-deep/35 to-transparent" aria-hidden="true" />
                    <span className="absolute inset-y-0 left-5 flex max-w-[62%] flex-col justify-center text-ivory">
                      <span className="caps text-[10px] text-gold-soft">{menu.feature.eyebrow}</span>
                      <span className="serif mt-1 text-[24px] leading-[1.1]">{menu.feature.title}</span>
                      <span className="caps mt-3 inline-flex items-center gap-1.5 text-[10px]">
                        Shop now <Icon name="arrow" size={12} />
                      </span>
                    </span>
                  </Link>

                  <div className="mt-6 flex items-baseline justify-between">
                    <p className="caps text-[11px] text-gold">Shop by category</p>
                    <Link to={menu.to} onClick={onClose} className="caps link-line text-[11px] text-maroon">
                      View all
                    </Link>
                  </div>

                  {/* Photo tiles */}
                  <ul className="mt-3 grid grid-cols-2 gap-3">
                    {items.map((item, i) => (
                      <li key={item.label} className="anim-fade-up" style={{ '--delay': `${420 + i * 45}ms` }}>
                        <Link to={item.to} onClick={onClose} className="press group relative block aspect-[4/3.4] overflow-hidden rounded-[12px]">
                          <Img id={item.image} alt="" sizes="200px" className="absolute! inset-0" position="50% 15%" />
                          <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" aria-hidden="true" />
                          <span className="absolute inset-x-3 bottom-2.5 text-ivory">
                            <span className="block text-[15px] leading-tight font-medium">{item.label}</span>
                            <span className="line-clamp-1 block text-[11px] text-ivory/75">{item.desc}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* More links */}
            <ul className="mt-6 flex flex-wrap gap-2 px-5">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    onClick={onClose}
                    className={cn(
                      'press flex h-10 items-center gap-1.5 rounded-full border px-4 text-[13px]',
                      l.accent ? 'border-danger/30 text-danger' : 'border-line-strong text-ink',
                    )}
                  >
                    {l.accent && <span className="size-1.5 rounded-full bg-danger" aria-hidden="true" />}
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Quick actions */}
            <ul className="mt-6 grid grid-cols-4 gap-2 px-5 pb-6">
              {[
                { icon: 'package', label: 'Orders', to: '/account' },
                { icon: 'heart', label: 'Wishlist', to: '/wishlist' },
                { icon: 'chat', label: 'Help', to: '/help' },
                { icon: 'whatsapp', label: 'Call us', href: `tel:${site.phone.replace(/\s/g, '')}` },
              ].map((a) => {
                const inner = (
                  <>
                    <span className="grid size-12 place-items-center rounded-full border border-gold-soft text-maroon">
                      <Icon name={a.icon} size={21} />
                    </span>
                    <span className="mt-1.5 block text-[12px] text-ink-soft">{a.label}</span>
                  </>
                )
                return (
                  <li key={a.label} className="text-center">
                    {a.to ? (
                      <Link to={a.to} onClick={onClose} className="press flex flex-col items-center">
                        {inner}
                      </Link>
                    ) : (
                      <a href={a.href} className="press flex flex-col items-center">
                        {inner}
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Offer strip */}
          <div className="flex items-center justify-between gap-3 bg-maroon px-5 pt-3.5 pb-[max(14px,env(safe-area-inset-bottom))] text-ivory">
            <span className="text-[13px]">
              <span className="block text-[11px] text-gold-soft">Festive offer</span>
              Extra 10% off everything
            </span>
            <CopyCode code="FESTIVE10" light />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
