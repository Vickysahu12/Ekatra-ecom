import { site } from '../../config/site'
import { Wordmark } from './Wordmark'
import { Icon } from '../ui/Icon'

const YEAR = new Date().getFullYear()
const PAYMENTS = ['UPI', 'Visa', 'Mastercard', 'RuPay', 'Cash on delivery']

export function Footer() {
  return (
    <footer className="shell pt-16 pb-28 lg:pt-24 lg:pb-10">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-12 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
        <div className="col-span-2 lg:col-span-1">
          <Wordmark />
          <p className="mt-4 max-w-[32ch] text-[14px] leading-relaxed text-ink-soft">{site.footer.blurb}</p>
          <ul className="mt-6 flex gap-2">
            {site.footer.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="press grid size-10 place-items-center rounded-full bg-soft transition-colors duration-200 hover:bg-ink hover:text-bg"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {site.footer.columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-[13px] font-bold">{col.title}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="link-line text-[14px] text-ink-soft hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-[12px] text-ink-soft lg:flex-row lg:items-center lg:justify-between">
        <p>
          © {YEAR} {site.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-2" aria-label="Payment methods">
          {PAYMENTS.map((p) => (
            <li key={p} className="rounded-full border border-line-strong px-3 py-1 font-medium text-ink">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
