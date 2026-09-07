import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { brand } from '@/data/content'

/**
 * Point de conversion final. Il vit dans `<main>` et non dans le pied de page : c'est du
 * contenu, pas de la signature de bas de page, et un lecteur d'écran ne doit pas avoir à
 * sortir du contenu principal pour l'atteindre.
 */
export function OrderCta() {
  return (
    <section
      id="commander"
      aria-labelledby="commander-title"
      className="bg-bone pt-16 pb-20 sm:pt-20 sm:pb-28"
    >
      <div className="container-page">
        <Reveal>
          <div className="on-dark overflow-hidden rounded-5xl bg-clay px-7 py-16 text-center sm:px-12 sm:py-24">
            <SectionLabel className="text-bone">Prêt à croustiller</SectionLabel>
            <h2
              id="commander-title"
              className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] tracking-headline text-bone"
            >
              Le goût de
              <br />
              <span className="font-extrabold">chez vous, chez vous.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-bone">
              Trois formats à partir de {brand.priceFrom}. {brand.shipping}.
            </p>
            <p className="mx-auto mt-2 max-w-lg text-sm text-bone">
              {brand.shippingNote}.
            </p>
            <Button
              href="#produit"
              size="lg"
              variant="inverse"
              className="mt-9"
              icon={<ArrowRight className="h-4 w-4" strokeWidth={2.6} />}
            >
              Choisir mon format
            </Button>
            <p className="mt-5 text-sm text-bone">
              Commande par e-mail à{' '}
              <a
                href={`mailto:${brand.email}`}
                className="inline-flex min-h-11 items-center font-semibold text-bone underline decoration-bone/70 decoration-[1.5px] underline-offset-4 transition-colors hover:decoration-bone"
              >
                {brand.email}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
