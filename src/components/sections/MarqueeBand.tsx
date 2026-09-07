import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'

import type { Claim, ClaimTone } from '@/data/content'
import { claims } from '@/data/content'

const TONES: Record<ClaimTone, string> = {
  bark: 'bg-bark text-bone',
  ink: 'bg-ink text-straw',
  straw: 'bg-straw text-ink',
  strawLight: 'bg-straw-light text-bark',
  clay: 'bg-clay text-bone',
  soil: 'bg-soil text-bone',
  bone: 'bg-bone text-bark',
}

/** La seconde rangée démarre au milieu de la liste : les deux lignes ne montrent
 *  jamais la même mention l'une au-dessus de l'autre. */
const HALF = Math.ceil(claims.length / 2)
const ROW_A = claims
const ROW_B = [...claims.slice(HALF), ...claims.slice(0, HALF)]

function Pill({ claim }: { claim: Claim }) {
  return (
    <li
      className={`shrink-0 rounded-full px-6 py-2.5 font-display text-[0.95rem] font-semibold leading-none tracking-headline sm:px-7 sm:py-3 sm:text-lg ${TONES[claim.tone]}`}
    >
      {claim.label}
    </li>
  )
}

/** Nombre de copies dans une piste. La boucle se referme en décalant d'exactement une
 *  copie ; il ne reste donc du contenu à droite que si (COPIES - 1) copies couvrent la
 *  fenêtre. Une liste fait ~2120 px, donc trois copies tiennent jusqu'à ~4240 px de large. */
const COPIES = 3

/** Une copie complète de la liste. */
function Copy({ items, hidden }: { items: Claim[]; hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
      aria-hidden={hidden || undefined}
    >
      {items.map((claim, i) => (
        <Pill key={`${claim.label}-${i}`} claim={claim} />
      ))}
    </ul>
  )
}

type RowProps = {
  items: Claim[]
  /** Vers la droite : on relit la même keyframe à l'envers plutôt que d'en écrire une seconde. */
  reverse?: boolean
  duration: string
  paused: boolean
}

function Row({ items, reverse, duration, paused }: RowProps) {
  return (
    <div
      className="claim-row flex w-max animate-marquee"
      style={
        {
          '--marquee-duration': duration,
          '--marquee-shift': `${-100 / COPIES}%`,
          animationDirection: reverse ? 'reverse' : undefined,
          // On met en pause plutôt que de retirer l'animation : la piste garde sa position
          // et ne saute pas au début quand la bande revient à l'écran.
          animationPlayState: paused ? 'paused' : 'running',
        } as CSSProperties
      }
    >
      {Array.from({ length: COPIES }, (_, i) => (
        <Copy key={i} items={items} hidden={i > 0} />
      ))}
    </div>
  )
}

type MarqueeBandProps = {
  /** Durée d'un cycle complet. Identique sur les deux rangées : le contresens reste symétrique. */
  duration?: string
}

/** Deux rangées de pastilles défilant à contresens, entre le hero et la suite de la page. */
export function MarqueeBand({ duration = '46s' }: MarqueeBandProps) {
  const ref = useRef<HTMLElement>(null)
  const [paused, setPaused] = useState(true)

  // Une boucle décorative ne tourne pas hors écran : elle consomme du temps de composition
  // pour personne. L'observateur la relance quand la bande revient dans le champ.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), {
      rootMargin: '120px 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Ce que promet notre gari"
      className="claim-band overflow-hidden bg-cream py-7 sm:py-9"
    >
      <div className="flex flex-col gap-3 sm:gap-4">
        <Row items={ROW_A} duration={duration} paused={paused} />
        <Row items={ROW_B} duration={duration} paused={paused} reverse />
      </div>
    </section>
  )
}
