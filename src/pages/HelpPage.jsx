import { site } from '../config/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Accordion } from '../components/ui/Accordion'
import { Icon } from '../components/ui/Icon'
import { Ornament } from '../components/ui/SectionHeading'
import { formatPrice } from '../lib/format'

const SECTIONS = [
  {
    id: 'shipping',
    title: 'Shipping',
    faqs: [
      ['How long does delivery take?', 'Orders are dispatched within 24 hours and delivered in 2 to 7 working days depending on your pincode.'],
      ['Is shipping free?', `Shipping is free on orders above ${formatPrice(site.freeShippingOver)}. Below that, a flat ${formatPrice(site.shippingFee)} applies.`],
      ['Do you offer cash on delivery?', `Yes, across India, with a ${formatPrice(site.codFee)} handling fee.`],
    ],
  },
  {
    id: 'returns',
    title: 'Returns & Exchange',
    faqs: [
      ['What is your return policy?', 'Unused pieces with tags can be returned or exchanged within 7 days of delivery. We arrange a free pickup.'],
      ['Can I return a stitched blouse?', 'Stitched blouses are made to your size, so they can be exchanged for a different size only.'],
      ['When will I get my refund?', 'Refunds reach your original payment method within 5 to 7 days of pickup. COD orders are refunded to your bank account or as store credit.'],
    ],
  },
  {
    id: 'care',
    title: 'Saree Care',
    faqs: [
      ['How should I wash silk sarees?', 'Dry clean only for the first few washes. Store folded in a muslin cloth and refold every few months to protect the zari.'],
      ['Will the colour bleed?', 'Handloom dyes may release a little colour in the first wash. Always dry clean or wash separately in cold water.'],
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    faqs: [['How do you use my data?', 'We only use your details to deliver your order and, if you opt in, to send you our newsletter. We never sell your data.']],
  },
]

export function HelpPage() {
  useDocumentTitle('Help')
  return (
    <div className="shell max-w-[860px] py-10 lg:py-14">
      <div className="text-center">
        <h1 className="serif text-[40px] text-maroon">How can we help?</h1>
        <Ornament className="mt-3" />
      </div>

      <div id="contact" className="mt-10 grid scroll-mt-32 gap-3 sm:grid-cols-3">
        {[
          ['whatsapp', 'WhatsApp', site.phone, `https://wa.me/${site.phone.replace(/\D/g, '')}`],
          ['chat', 'Email', site.email, `mailto:${site.email}`],
          ['package', 'Track order', 'My orders', '/account'],
        ].map(([icon, title, body, href]) => (
          <a key={title} href={href} className="group rounded-soft border border-line bg-white/60 p-5 transition-colors hover:border-maroon">
            <Icon name={icon} size={26} className="text-maroon" />
            <p className="mt-3 text-[15px] font-medium">{title}</p>
            <p className="text-[13px] text-ink-soft group-hover:text-maroon">{body}</p>
          </a>
        ))}
      </div>

      {SECTIONS.map((s) => (
        <section key={s.id} id={s.id} className="mt-12 scroll-mt-32">
          <h2 className="serif text-[28px] text-maroon">{s.title}</h2>
          <div className="mt-3 border-t border-line">
            {s.faqs.map(([q, a]) => (
              <Accordion key={q} title={q}>
                {a}
              </Accordion>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
