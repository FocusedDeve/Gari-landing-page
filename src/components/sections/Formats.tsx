import { ArrowRight } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Format } from '@/data/content'
import { brand, formats } from '@/data/content'

const TONES: Record<Format['tone'], { card: string; meta: string; body: string; cta: string }> = {
  cream: {
    card: 'bg-gradient-to-b from-cream to-bone text-ink',
    meta: 'text-ink/70',
    body: 'text-ink/75',
    cta: 'bg-ink text-bone hover:bg-bark',
  },
  bark: {
    card: 'on-dark bg-gradient-to-b from-bark to-soil text-bone',
    meta: 'text-bone/80',
    body: 'text-bone/80',
    cta: 'bg-straw text-ink hover:bg-straw-light',
  },
  straw: {
    card: 'bg-gradient-to-b from-straw-light to-straw text-ink',
    meta: 'text-ink/75',
    body: 'text-ink/80',
    cta: 'bg-ink text-bone hover:bg-bark',
  },
}

const orderHref = (format: Format) =>
  `mailto:${brand.email}?subject=${encodeURIComponent(
    `Commande — ${format.name} ${format.weight}`,
  )}&body=${encodeURIComponent(
    [
      `Bonjour,`,
      ``,
      `Je souhaite commander : ${format.name} — ${format.weight} (${format.grind}) — ${format.price}`,
      `Quantité : `,
      `Pays de livraison : `,
      ``,
      `Merci de me confirmer les frais et le délai d’expédition.`,
      ``,
      `Nom :`,
      `Adresse :`,
    ].join('\n'),
  )}`

function FormatCard({ format, delay }: { format: Format; delay: number }) {
  const tone = TONES[format.tone]

  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={`flex h-full flex-col overflow-hidden rounded-4xl ${tone.card}`}
        aria-labelledby={`format-${format.id}`}
      >
        {/* Le packaging est posé sur une ombre de contact, comme dans le hero :
            même vocabulaire d'un bout à l'autre de la page. */}
        <div className="relative grid place-items-center px-8 pt-10 pb-4">
          <div
            aria-hidden="true"
            className="absolute bottom-6 h-6 w-1/2 rounded-[50%] bg-ink/25 blur-xl"
          />
          <img
            src={format.image}
            width={750}
            height={1129}
            loading="lazy"
            decoding="async"
            alt={format.imageAlt}
            className="relative h-52 w-auto max-w-none drop-shadow-[0_14px_20px_rgba(27,16,10,0.24)] sm:h-64"
          />
        </div>

        <div className="flex flex-1 flex-col px-7 pb-7 sm:px-8 sm:pb-8">
          <p
            className={`font-display text-xs font-bold uppercase tracking-[0.18em] ${tone.meta}`}
          >
            {format.use}
          </p>
          <h3 id={`format-${format.id}`} className="mt-2 text-3xl font-extrabold sm:text-4xl">
            {format.name}
          </h3>
          <p className={`mt-1.5 text-sm font-semibold ${tone.meta}`}>
            {format.weight} · {format.grind}
          </p>
          <p className={`mt-4 text-sm leading-relaxed ${tone.body}`}>{format.body}</p>

          {/* La décision et l'action dans le même rectangle : le prix et son bouton
              sont poussés en bas de carte pour s'aligner d'une carte à l'autre. */}
          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-7">
            <p className="font-display text-2xl font-extrabold tracking-headline">
              {format.price}
            </p>
            <a
              href={orderHref(format)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide transition-colors duration-300 ease-organic ${tone.cta}`}
            >
              Commander
              <ArrowRight className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" />
              <span className="sr-only">{`${format.name} ${format.weight}`}</span>
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function Formats() {
  return (
    <section id="produit" aria-labelledby="formats-title" className="bg-bone py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel className="text-clay">Trois formats</SectionLabel>
            <h2
              id="formats-title"
              className="mt-5 text-[clamp(2.25rem,6vw,4rem)] text-ink"
            >
              Le grain décide
              <br />
              <span className="font-extrabold text-clay">de l&apos;usage.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink/75">
              Même manioc, même feu, même plaque. Ce qui change d&apos;un format à l&apos;autre,
              c&apos;est la mouture — et c&apos;est elle qui décide de ce que vous en ferez.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {formats.map((format, index) => (
            <FormatCard key={format.id} format={format} delay={index * 0.1} />
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-ink/75">
            {brand.shipping}.{' '}
            <span className="text-ink/60">{brand.shippingNote}.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
