import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Button } from '../components/ui/Button'
import { Ornament } from '../components/ui/SectionHeading'

export function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <div className="shell flex flex-col items-center py-24 text-center">
      <p className="serif text-[96px] leading-none text-gold-soft">404</p>
      <h1 className="serif mt-2 text-[36px] text-maroon">This page has wandered off</h1>
      <Ornament className="mt-3" />
      <p className="mt-4 max-w-[38ch] text-[15px] text-ink-soft">The link may be old or the piece may have sold out. Let us take you somewhere lovely instead.</p>
      <div className="mt-8 flex gap-3">
        <Button to="/">Go Home</Button>
        <Button to="/shop/sarees" variant="outline">
          Shop Sarees
        </Button>
      </div>
    </div>
  )
}
