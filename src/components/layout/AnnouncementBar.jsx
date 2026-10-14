import { useEffect, useState } from 'react'
import { site } from '../../config/site'

const INTERVAL = 4500

// One announcement at a time, gently cycling. Pauses on hover.
export function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const items = site.announcements

  useEffect(() => {
    if (paused || items.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), INTERVAL)
    return () => clearInterval(id)
  }, [paused, items.length])

  return (
    <div
      className="bg-maroon text-ivory"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Store announcements"
    >
      <div className="shell flex h-9 items-center justify-between gap-4 text-[12px] tracking-wide">
        <span className="hidden text-ivory/75 lg:block">Celebrating handloom. Empowering artisans.</span>
        <p key={index} className="anim-fade-up flex-1 text-center lg:flex-none">
          {items[index]}
        </p>
        <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hidden text-ivory/75 hover:text-ivory lg:block">
          Need help? {site.phone}
        </a>
      </div>
    </div>
  )
}
