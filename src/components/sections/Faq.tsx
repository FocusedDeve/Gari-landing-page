import { Plus } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Faq as FaqItem } from '@/data/content'
import { faqs } from '@/data/content'

/**
 * `<details>`/`<summary>` natifs plutôt qu'un accordéon maison : le clavier, le lecteur
 * d'écran et la recherche dans la page fonctionnent sans une ligne de JavaScript.
 */
function FaqRow({ item, delay }: { item: FaqItem; delay: number }) {
  return (
    <Reveal delay={delay}>
      <details className="group rounded-4xl bg-bone px-6 py-1 transition-colors duration-300 ease-organic hover:bg-cream sm:px-8">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 marker:content-none [&::-webkit-details-marker]:hidden">
          <h3 className="text-lg font-semibold text-ink sm:text-xl">{item.question}</h3>
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-clay text-bone transition-transform duration-300 ease-organic group-open:rotate-45"
          >
            <Plus className="h-4 w-4" strokeWidth={2.6} />
          </span>
        </summary>
        <p className="max-w-2xl pb-7 text-sm leading-relaxed text-ink/75 sm:text-base">
          {item.answer}
        </p>
      </details>
    </Reveal>
  )
}

export function Faq() {
  return (
    <section id="questions" aria-labelledby="faq-title" className="bg-cream py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel className="text-clay">Avant de commander</SectionLabel>
            <h2 id="faq-title" className="mt-5 text-[clamp(2.25rem,6vw,4rem)] text-ink">
              Vous vous
              <br />
              <span className="font-extrabold text-clay">demandez sûrement.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3 lg:mt-16">
          {faqs.map((item, index) => (
            <FaqRow key={item.question} item={item} delay={index * 0.06} />
          ))}
        </div>
      </div>
    </section>
  )
}
