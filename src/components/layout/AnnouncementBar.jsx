import { useEffect, useState } from 'react'
import { site } from '../../config/site'

const INTERVAL = 4000

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
      className="bg-ink text-bg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Store announcements"
    >
      <p key={index} className="anim-fade-up shell flex h-9 items-center justify-center text-[12px] font-medium tracking-wide [--delay:0ms]">
        {items[index]}
      </p>
    </div>
  )
}
