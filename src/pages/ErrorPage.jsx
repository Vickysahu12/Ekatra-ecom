import { useRouteError } from 'react-router'

/**
 * Shown if a page crashes. Rendered outside the providers, so it uses plain links
 * and a full reload to recover cleanly.
 */
export function ErrorPage() {
  const error = useRouteError()
  if (import.meta.env.DEV) console.error(error)

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-ivory px-6 text-center">
      <p className="serif text-[34px] font-semibold text-maroon">Ekatra</p>
      <h1 className="serif mt-8 text-[32px] text-maroon">Something went wrong</h1>
      <p className="mt-3 max-w-[40ch] text-[15px] text-ink-soft">
        Sorry, this page ran into a problem. Your bag and wishlist are safe. Please try again.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="caps h-12 rounded-soft bg-maroon px-7 text-[13px] text-ivory hover:bg-maroon-deep"
        >
          Try Again
        </button>
        <a href="/" className="caps grid h-12 place-items-center rounded-soft border border-maroon px-7 text-[13px] text-maroon">
          Go Home
        </a>
      </div>
    </div>
  )
}
