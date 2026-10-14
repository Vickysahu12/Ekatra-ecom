import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { megaMenus, navLinks } from '../../config/navigation'
import { Img } from '../ui/Img'
import { Icon } from '../ui/Icon'
import { cn } from '../../lib/cn'

const OPEN_DELAY = 90
const CLOSE_DELAY = 160

/** True when `to` (with its query string) matches the current URL. */
export function useIsActive() {
  const { pathname, search } = useLocation()
  return (to) => {
    const [path, query] = to.split('?')
    if (query) return pathname === path && search.replace('?', '') === query
    return pathname === path && !search
  }
}

function MenuItem({ item, index, onNavigate }) {
  return (
    <li className="anim-fade-up" style={{ '--delay': `${index * 30}ms` }}>
      <Link to={item.to} onClick={onNavigate} className="group flex items-center gap-3.5 rounded-soft p-2 transition-colors duration-200 hover:bg-cream">
        <span className="relative size-14 shrink-0 overflow-hidden rounded-[6px] border border-line bg-cream">
          <Img id={item.image} alt="" sizes="56px" className="absolute! inset-0" position="50% 18%" imgClassName="transition-transform duration-500 ease-out group-hover:scale-110" />
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1.5 text-[15px] text-ink transition-colors group-hover:text-maroon">
            {item.label}
            <Icon name="arrow" size={13} className="-translate-x-1 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
          <span className="block truncate text-[13px] text-ink-soft">{item.desc}</span>
        </span>
      </Link>
    </li>
  )
}

/**
 * Desktop navigation. A soft pill follows the hovered item; dropdown triggers open one
 * shared panel that morphs its size and slides its content left / right as she moves
 * between menus. Opens on hover (with intent delay), click or keyboard; closes on leave,
 * Escape, outside click or navigation.
 */
export function MegaNav() {
  const reduce = useReducedMotion()
  const isActive = useIsActive()
  const { pathname, search } = useLocation()
  const [open, setOpen] = useState(null) // menu id
  const [hovered, setHovered] = useState(null) // pill target
  const [dir, setDir] = useState(0)
  const timer = useRef(null)
  const triggers = useRef({})

  const menu = megaMenus.find((m) => m.id === open)

  // Mirror of `open` so timers read the latest value.
  const openRef = useRef(null)
  useEffect(() => {
    openRef.current = open
  }, [open])

  const show = useCallback((id, delay = OPEN_DELAY) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const prev = openRef.current
      const ids = megaMenus.map((m) => m.id)
      setDir(prev && prev !== id ? (ids.indexOf(id) > ids.indexOf(prev) ? 1 : -1) : 0)
      setOpen(id)
    }, delay)
  }, [])
  const hide = useCallback((delay = CLOSE_DELAY) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(null), delay)
  }, [])
  const closeNow = useCallback(() => {
    clearTimeout(timer.current)
    setOpen(null)
  }, [])

  // Close on navigation: reset during render when the URL changes.
  const locKey = pathname + search
  const [seenLoc, setSeenLoc] = useState(locKey)
  if (seenLoc !== locKey) {
    setSeenLoc(locKey)
    setOpen(null)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        triggers.current[open]?.focus()
        closeNow()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, closeNow])

  useEffect(() => () => clearTimeout(timer.current), [])

  const pill = (id) =>
    hovered === id && (
      <motion.span
        layoutId="nav-pill"
        className="absolute inset-0 -z-10 rounded-full bg-cream"
        transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.35, bounce: 0.12 }}
      />
    )

  return (
    <>
      {/* Dim the page while a menu is open. Portalled so it sits under the sticky header. */}
      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 z-30 bg-ink/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onMouseEnter={() => hide(60)}
            onClick={closeNow}
          />
        )}
      </AnimatePresence>,
      document.body,
      )}

      <nav aria-label="Primary" className="relative hidden border-t border-line lg:block" onMouseLeave={() => { setHovered(null); hide() }}>
        <ul className="shell flex h-[52px] items-center justify-center gap-1">
          {megaMenus.map((m) => {
            const expanded = open === m.id
            return (
              <li key={m.id} onMouseEnter={() => { setHovered(m.id); show(m.id, open ? 0 : OPEN_DELAY) }}>
                <button
                  ref={(el) => (triggers.current[m.id] = el)}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls="mega-panel"
                  onClick={() => (expanded ? closeNow() : show(m.id, 0))}
                  onKeyDown={(e) => e.key === 'ArrowDown' && show(m.id, 0)}
                  className={cn(
                    'caps relative isolate flex h-9 items-center gap-1.5 rounded-full px-4 text-[12px] transition-colors duration-200',
                    expanded || pathname.startsWith(m.to) && m.to !== '/shop' ? 'text-maroon' : 'text-ink',
                  )}
                >
                  {pill(m.id)}
                  {m.label}
                  <Icon name="caret-down" size={12} weight="bold" className={cn('transition-transform duration-300 ease-out', expanded && 'rotate-180')} />
                </button>
              </li>
            )
          })}
          <li aria-hidden="true" className="mx-2 h-4 w-px bg-line-strong" />
          {navLinks.map((l) => (
            <li key={l.label} onMouseEnter={() => { setHovered(l.label); if (open) hide(60) }}>
              <Link
                to={l.to}
                aria-current={isActive(l.to) ? 'page' : undefined}
                className={cn(
                  'caps relative isolate flex h-9 items-center gap-1.5 rounded-full px-4 text-[12px] transition-colors',
                  l.accent ? 'text-danger' : isActive(l.to) ? 'text-maroon' : 'text-ink',
                )}
              >
                {pill(l.label)}
                {l.accent && <span className="size-1.5 rounded-full bg-danger" aria-hidden="true" />}
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Shared panel */}
        <AnimatePresence>
          {menu && (
            <motion.div
              id="mega-panel"
              role="region"
              aria-label={`${menu.label} menu`}
              onMouseEnter={() => clearTimeout(timer.current)}
              className="absolute top-[calc(100%+8px)] left-1/2 w-[min(1080px,calc(100vw-48px))] -translate-x-1/2"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.08 }}
              style={{ transformOrigin: 'top center' }}
            >
              <motion.div layout transition={{ type: 'spring', duration: 0.45, bounce: 0.1 }} className="overflow-hidden rounded-[14px] border border-line bg-ivory shadow-lift">
                <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                  <motion.div
                    key={menu.id}
                    custom={dir}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40, transition: { duration: 0.15 } }}
                    transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                    className="grid gap-6 p-6"
                    style={{ gridTemplateColumns: `repeat(${menu.columns.length}, minmax(0, 1fr)) 280px` }}
                  >
                    {menu.columns.map((col) => (
                      <div key={col.title}>
                        <p className="caps px-2 text-[11px] text-gold">{col.title}</p>
                        <ul className="mt-3 space-y-1">
                          {col.items.map((item, i) => (
                            <MenuItem key={item.label} item={item} index={i} onNavigate={closeNow} />
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Link to={menu.feature.to} onClick={closeNow} className="group relative block min-h-[300px] overflow-hidden rounded-[10px]">
                      <Img id={menu.feature.image} alt="" sizes="280px" className="absolute! inset-0" position="50% 20%" imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                      <span className="absolute inset-0 bg-gradient-to-t from-maroon-deep/85 via-maroon-deep/10 to-transparent" aria-hidden="true" />
                      <span className="absolute inset-x-4 bottom-4 text-ivory">
                        <span className="caps block text-[10px] text-gold-soft">{menu.feature.eyebrow}</span>
                        <span className="serif mt-1 block text-[22px] leading-tight">{menu.feature.title}</span>
                        <span className="caps mt-3 inline-flex items-center gap-1.5 text-[10px] text-ivory/90">
                          Explore <Icon name="arrow" size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center justify-between border-t border-line bg-cream/70 px-8 py-3 text-[12px] text-ink-soft">
                  <span className="flex items-center gap-2">
                    <Icon name="truck" size={15} className="text-maroon" /> Free shipping above ₹1,999 · COD available
                  </span>
                  <Link to={menu.to} onClick={closeNow} className="caps link-line text-[11px] text-maroon">
                    View all {menu.label}
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
