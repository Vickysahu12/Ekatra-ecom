import { artisan } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { Button } from '../../components/ui/Button'
import { Ornament } from '../../components/ui/SectionHeading'

// Maroon story panel next to a close-up of the weave.
export function ArtisanSpotlight() {
  const ref = useReveal()

  return (
    <section ref={ref} className="shell pt-16 lg:pt-24" aria-labelledby="artisan-title">
      <div className="grid overflow-hidden rounded-soft bg-maroon text-ivory lg:grid-cols-[1fr_1.15fr]" data-reveal>
        <div className="relative flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <p className="caps flex items-center gap-3 text-[11px] text-gold-soft">
            <span className="h-px w-6 bg-gold-soft/60" />
            {artisan.eyebrow}
          </p>
          <h2 id="artisan-title" className="serif mt-4 text-[36px] leading-[1.05] sm:text-[46px]">
            {artisan.title}
          </h2>
          <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-ivory/75">{artisan.body}</p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-ivory/15 pt-6">
            {artisan.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="serif text-[28px] leading-none text-gold-soft sm:text-[34px]">{s.value}</dd>
                <dd className="mt-1.5 text-[12px] text-ivory/65">{s.label}</dd>
              </div>
            ))}
          </dl>
          <Button to={artisan.cta.to} variant="gold" className="mt-9 self-start">
            {artisan.cta.label}
          </Button>
        </div>
        <div className="group relative min-h-[360px] overflow-hidden">
          <Img
            id={artisan.image}
            alt="Close-up of a hand-woven Banarasi blouse with zari motifs"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="absolute! inset-0"
            position="50% 30%"
            imgClassName="transition-transform duration-[1600ms] ease-out group-hover:scale-105"
          />
          <Ornament light className="absolute right-6 bottom-6" />
        </div>
      </div>
    </section>
  )
}
