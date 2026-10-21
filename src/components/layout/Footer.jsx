import { useId, useState } from 'react'
import { Link } from 'react-router'
import { site } from '../../config/site'
import { serviceRow } from '../../data/content'
import { subscribe } from '../../services/newsletter'
import { Wordmark } from './Wordmark'
import { Icon } from '../ui/Icon'

const YEAR = new Date().getFullYear()
const PAYMENTS = ['UPI', 'Visa', 'Mastercard', 'RuPay', 'COD']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Newsletter() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | sending | done
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) return setError('Please enter a valid email.')
    setError('')
    setState('sending')
    await subscribe(email.trim())
    setState('done')
  }

  if (state === 'done') {
    return (
      <p role="status" className="anim-fade-up flex items-center gap-2 text-[14px] text-gold-soft">
        <Icon name="check-circle" size={18} weight="fill" /> Welcome to the family. Look out for our letter.
      </p>
    )
  }
  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="flex border-b border-ivory/40 focus-within:border-gold-soft">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-invalid={Boolean(error)}
          className="h-11 min-w-0 flex-1 bg-transparent text-[14px] text-ivory outline-none placeholder:text-ivory/55"
        />
        <button type="submit" disabled={state === 'sending'} aria-label="Subscribe" className="press grid size-11 place-items-center text-gold-soft disabled:opacity-50">
          <Icon name="arrow" size={18} />
        </button>
      </div>
      <p role="alert" className="mt-2 min-h-4 text-[12px] text-gold-soft">
        {error}
      </p>
    </form>
  )
}

export function Footer() {
  return (
    <footer className="mt-20 lg:mt-28">
      {/* Service row */}
      <div className="border-y border-line bg-cream">
        <ul className="shell grid grid-cols-2 gap-x-4 gap-y-6 py-7 lg:grid-cols-4">
          {serviceRow.map((s) => (
            <li key={s.title} className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold-soft text-maroon">
                <Icon name={s.icon} size={21} />
              </span>
              <span>
                <span className="block text-[14px] font-medium">{s.title}</span>
                <span className="block text-[12px] text-ink-soft">{s.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-maroon-deep text-ivory">
        <div className="shell grid grid-cols-2 gap-x-6 gap-y-10 pt-14 pb-10 lg:grid-cols-[1.3fr_repeat(3,0.8fr)_1.3fr]">
          <div className="col-span-2 lg:col-span-1">
            <Wordmark light className="items-start" />
            <p className="mt-5 max-w-[34ch] text-[14px] leading-relaxed text-ivory/70">{site.footer.blurb}</p>
          </div>

          {site.footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="caps text-[12px] text-gold-soft">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="link-line text-[14px] text-ivory/75 hover:text-ivory">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <h3 className="caps text-[12px] text-gold-soft">Stay connected</h3>
            <p className="mt-4 mb-3 text-[14px] text-ivory/70">New drops, artisan stories and members-only offers.</p>
            <Newsletter />
          </div>
        </div>

        <div className="shell flex flex-col gap-4 border-t border-ivory/15 py-5 text-[12px] text-ivory/60 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {YEAR} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Payment methods">
            {PAYMENTS.map((p) => (
              <li key={p} className="rounded-[2px] border border-ivory/20 px-2.5 py-1 text-ivory/80">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
