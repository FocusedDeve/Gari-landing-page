import cassavaImg from '@/assets/gari-cassava.webp'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Benefit } from '@/data/content'
import { benefits, stats } from '@/data/content'

const TONES: Record<Benefit['tone'], { card: string; body: string; rule: string }> = {
  cream: { card: 'bg-bone text-ink', body: 'text-ink/75', rule: 'bg-ink/20' },
  straw: { card: 'bg-straw text-ink', body: 'text-ink/80', rule: 'bg-ink/25' },
  bark: { card: 'bg-bark text-bone', body: 'text-bone/80', rule: 'bg-bone/25' },
  clay: { card: 'bg-clay text-bone', body: 'text-bone', rule: 'bg-bone/30' },
}

/**
 * Pas d'icône : quatre pictogrammes de bibliothèque dans des carrés teintés sont le
 * système visuel le plus interchangeable qui soit. La couleur, la graisse et un filet
 * suffisent à distinguer les cartes, et ce qu'elles disent reste lisible.
 */
function BenefitCard({ benefit, delay }: { benefit: Benefit; delay: number }) {
  const tone = TONES[benefit.tone]

  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={`flex h-full flex-col rounded-4xl p-7 transition-transform duration-500 ease-organic hover:-translate-y-1.5 sm:p-9 ${tone.card}`}
      >
        <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">{benefit.title}</h3>
        <span aria-hidden="true" className={`mt-5 h-px w-12 ${tone.rule}`} />
        <p className={`mt-5 text-sm leading-relaxed sm:text-base ${tone.body}`}>{benefit.body}</p>
      </article>
    </Reveal>
  )
}

export function Benefits() {
  const [first, second, third, fourth] = benefits

  return (
    <section
      id="pourquoi"
      aria-labelledby="pourquoi-title"
      className="bg-cream py-20 sm:py-28 lg:py-32"
    >
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Colonne éditoriale, collante sur grand écran. */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionLabel className="text-clay">Pourquoi Gari d&apos;Or</SectionLabel>
              <h2 id="pourquoi-title" className="mt-5 text-[clamp(2.25rem,6vw,4rem)] text-ink">
                Le gari mérite
                <br />
                mieux que
                <br />
                <span className="font-extrabold text-clay">l&apos;industrie.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink/75">
                Le gari industriel est séché trop vite, coupé de farines et vendu sans origine.
                Nous avons repris chaque étape, du champ à la plaque de fonte, avec les
                productrices qui la maîtrisent depuis toujours.
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-x-6 gap-y-5">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-display text-3xl font-extrabold tracking-headline text-ink">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-ink/75">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* Bento : les tuiles de texte et la tuile photo partagent une grille et un rayon.
            La photo n'est plus une légende à part, c'est une cellule — ce qui comble aussi
            le vide que laissaient les deux colonnes décalées. */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:gap-6">
          <BenefitCard benefit={first} delay={0} />
          <BenefitCard benefit={second} delay={0.08} />
          <BenefitCard benefit={third} delay={0.16} />
          <BenefitCard benefit={fourth} delay={0.24} />

          <Reveal delay={0.3} className="sm:col-span-2">
            <figure className="overflow-hidden rounded-4xl">
              <img
                src={cassavaImg}
                width={1091}
                height={592}
                loading="lazy"
                decoding="async"
                alt="Racines de manioc fraîchement récoltées dans un panier tressé"
                className="h-56 w-full object-cover sm:h-72"
              />
              <figcaption className="bg-bark px-6 py-4 font-display text-xs font-bold uppercase tracking-[0.16em] text-bone">
                Manioc frais — coopérative de Kpalimé
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
