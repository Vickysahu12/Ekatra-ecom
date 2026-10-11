import { useId, useState } from 'react'
import { subscribe } from '../../services/newsletter'
import { cutout } from '../../data/cutouts'
import { Icon } from '../ui/Icon'
import { cn } from '../../lib/cn'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Club signup on a blush card, with a model stepping out of the right edge.
export function Newsletter() {
  const inputId = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [error, setError] = useState('')
  const model = cutout('look-08')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) return setError('Enter an email like name@example.com')
    setError('')
    setStatus('sending')
    try {
      await subscribe(email.trim())
      setStatus('done')
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="shell pt-20 lg:pt-28" aria-labelledby="club-title">
      <div className="relative isolate overflow-hidden rounded-card bg-blush px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <img
          src={model.src}
          width={model.w}
          height={model.h}
          alt=""
          loading="lazy"
          className="pointer-events-none absolute -right-6 bottom-0 -z-10 hidden h-[118%] w-auto md:block lg:right-10"
        />
        <div className="max-w-[520px]">
          <h2 id="club-title" className="title">
            Join the ekatra club
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            First look at new drops, styling notes and members-only offers. One email a week, at most.
          </p>

          {status === 'done' ? (
            <p role="status" className="anim-fade-up mt-7 flex items-center gap-2.5 text-[16px] font-semibold">
              <Icon name="verified" size={22} weight="fill" className="text-rose" />
              You&apos;re in. Check your inbox for a welcome note.
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-7">
              <label htmlFor={inputId} className="sr-only">
                Email address
              </label>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  id={inputId}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={`${inputId}-error`}
                  placeholder="Your email address"
                  className={cn(
                    'h-13 min-w-0 flex-1 rounded-full border bg-bg px-5 text-[16px] outline-none transition-colors placeholder:text-ink-soft focus:border-ink',
                    error ? 'border-rose' : 'border-transparent',
                  )}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="press flex h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-7 text-[15px] font-semibold text-bg transition-colors hover:bg-ink/85 disabled:opacity-60"
                >
                  {status === 'sending' ? 'Joining…' : 'Join now'}
                </button>
              </div>
              <p id={`${inputId}-error`} role="alert" className="mt-2 min-h-5 pl-5 text-[13px] font-medium text-rose">
                {error}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
