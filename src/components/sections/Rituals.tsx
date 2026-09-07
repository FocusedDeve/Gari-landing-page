import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Ritual } from '@/data/content'
import { rituals } from '@/data/content'

/** Nombre de copies dans la piste. La boucle se referme en décalant d'exactement une copie ;
 *  il ne reste donc du contenu à droite que si (COPIES - 1) copies couvrent la fenêtre.
 *  Une copie fait ~1330 px en grand écran, donc trois copies tiennent jusqu'à ~2660 px de large. */
const COPIES = 3

/** Descente de chaque carte dans le cadre, en pixels. Les hauts se décalent, les bas sont
 *  tous coupés sur la même ligne par le bord de la bande : ce n'est plus une rangée de
 *  cartes posées côte à côte, c'est un mur qui passe derrière une fenêtre. Les valeurs
 *  dépassent le rayon d'angle (2 rem) pour qu'aucune carte ne montre un coin arrondi en bas. */
const DROP = [36, 58, 44, 64]

function RitualCard({ ritual, drop }: { ritual: Ritual; drop: number }) {
  return (
    <li
      className="ritual-card w-[74vw] max-w-[20rem] shrink-0 sm:w-[18.5rem] lg:w-[19.5rem]"
      style={{ transform: `translate3d(0, ${drop}px, 0)` }}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-4xl bg-bark/70">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={ritual.image}
            width={1080}
            height={475}
            loading="lazy"
            decoding="async"
            alt={ritual.imageAlt}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent"
          />
          <span className="absolute left-5 top-5 rounded-full bg-straw px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-ink">
            {ritual.gesture}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 pb-[5.5rem] sm:p-7 sm:pb-[5.5rem]">
          <h3 className="text-2xl font-semibold text-bone">{ritual.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-bone/80">{ritual.body}</p>
          {/* La mouture est ce qui décide de l'achat : chaque façon la nomme. Poussée en pied
              de carte, elle s'aligne d'une carte à l'autre malgré des textes inégaux. */}
          <p className="mt-auto border-t border-bone/25 pt-5 font-display text-xs font-bold uppercase tracking-[0.18em] text-straw">
            {ritual.grind}
          </p>
        </div>
      </article>
    </li>
  )
}

/** Une copie complète de la série. Le `pr` porte l'écart qui suit la dernière carte :
 *  sans lui, la piste ne serait pas un multiple exact de la copie et la boucle sauterait. */
function Copy({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-stretch gap-5 pr-5"
      aria-hidden={hidden || undefined}
    >
      {rituals.map((ritual, i) => (
        <RitualCard key={ritual.id} ritual={ritual} drop={DROP[i % DROP.length]} />
      ))}
    </ul>
  )
}

export function Rituals() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [offscreen, setOffscreen] = useState(true)

  // Une boucle hors champ consomme du temps de composition pour personne.
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting), {
      rootMargin: '160px 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="deguster"
      aria-labelledby="deguster-title"
      className="on-dark bg-ink py-20 sm:py-28 lg:py-32"
    >
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionLabel className="text-straw">Comment le déguster</SectionLabel>
              <h2
                id="deguster-title"
                className="mt-5 max-w-2xl text-[clamp(2.25rem,6vw,4.5rem)] text-bone"
              >
                Quatre façons,
                <br />
                <span className="font-extrabold text-straw">une seule matière.</span>
              </h2>
            </div>
            <div className="lg:max-w-sm">
              <p className="text-base leading-relaxed text-bone/80">
                Boisson, pâte, sauté ou simplement en pluie : le gari change d&apos;état selon
                ce qu&apos;on lui donne à boire. Voici quatre façons qu&apos;on retrouve dans
                toutes les cuisines togolaises.
              </p>
              {/* Réservée aux pointeurs — au doigt, il n'y a pas de survol — et retirée en
                  mouvement réduit, où plus rien ne défile. Ce second repli vit dans index.css :
                  entre deux variantes de même spécificité, seul l'ordre d'émission trancherait. */}
              <p className="ritual-hint mt-4 hidden text-xs text-bone/60 [@media(hover:hover)]:block">
                Le défilement s&apos;arrête au survol d&apos;une carte.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bande pleine largeur : la série ne se termine pas, elle traverse. */}
      <div
        ref={carouselRef}
        className="ritual-carousel group relative mt-8 overflow-hidden lg:mt-10"
      >
        {/* Le survol met en pause via CSS, l'observateur via la classe conditionnelle. Les deux
            écrivent la même valeur sur la même propriété : leur ordre de cascade est sans effet. */}
        <div
          className={`ritual-track flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] ${
            offscreen ? '[animation-play-state:paused]' : ''
          }`}
          style={
            {
              '--marquee-duration': '43s',
              '--marquee-shift': `${-100 / COPIES}%`,
            } as CSSProperties
          }
        >
          {Array.from({ length: COPIES }, (_, i) => (
            <Copy key={i} hidden={i > 0} />
          ))}
        </div>
      </div>

      <div className="container-page">
        {/* Chaque façon appelle une mouture : la section a une destination. */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="max-w-md text-base text-bone/80">
              Granules fines pour la boisson glacée, mouture moyenne pour tout ce qui passe à
              la casserole.
            </p>
            <a
              href="#produit"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-straw px-7 py-3 font-display text-sm font-bold uppercase tracking-wide text-ink transition-colors duration-300 ease-organic hover:bg-straw-light"
            >
              Voir les trois formats
              <ArrowRight className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
