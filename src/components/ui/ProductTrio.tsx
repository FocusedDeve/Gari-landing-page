import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'

import jarImg from '@/assets/gari-jar.webp'
import pouchImg from '@/assets/gari-pouch.webp'
import tubeImg from '@/assets/gari-tube.webp'
import { transition } from '@/lib/motion'

type Pack = {
  id: string
  src: string
  width: number
  height: number
  alt: string
  /** Position du packaging, en % du conteneur ; la hauteur cale la ligne de sol commune. */
  place: CSSProperties
  /** Hauteur de l'image en % de la hauteur du conteneur : conserve l'échelle relative des trois formats. */
  heightPct: number
  rotate: number
  z: number
  /** Ombre au sol, décalée vers la droite comme l'éclairage de la photo. */
  shadow: { left: number; width: number; opacity: number }
  floatDuration: string
  delay: number
  priority?: boolean
}

/** Ligne de sol partagée, en % de la hauteur du conteneur. */
const GROUND = 7

const PACKS: Pack[] = [
  {
    id: 'pouch',
    src: pouchImg,
    width: 750,
    height: 1129,
    alt: 'Sachet kraft Gari d’Or, gari premium 500 g',
    place: { left: '2%' },
    heightPct: 80,
    rotate: -7,
    z: 20,
    shadow: { left: 6, width: 31, opacity: 0.42 },
    floatDuration: '7s',
    delay: 0.16,
  },
  {
    id: 'tube',
    src: tubeImg,
    width: 593,
    height: 1185,
    alt: 'Étui cylindrique Gari d’Or, fines granules 500 g',
    place: { left: '36%' },
    heightPct: 86,
    rotate: 3,
    z: 30,
    shadow: { left: 39, width: 27, opacity: 0.5 },
    floatDuration: '5.6s',
    delay: 0,
    priority: true,
  },
  {
    id: 'jar',
    src: jarImg,
    width: 618,
    height: 1046,
    alt: 'Bocal en verre Gari d’Or, gari artisanal 450 g',
    place: { right: '5%' },
    heightPct: 76,
    rotate: 8,
    z: 10,
    shadow: { left: 68, width: 28, opacity: 0.38 },
    floatDuration: '6.4s',
    delay: 0.26,
  },
]

type ProductTrioProps = {
  className?: string
}

/** Trois packagings alignés sur une même ligne de sol, chacun posé sur son ombre. */
export function ProductTrio({ className = '' }: ProductTrioProps) {
  return (
    // `@container` : les flous sont exprimés en `cqw`, donc relatifs à la scène.
    // En pixels fixes, l'ombre lisible sur grand écran s'évaporait en dessous.
    <div className={`@container relative aspect-[16/11] w-full ${className}`}>
      {PACKS.map((pack) => {
        const floatVar = {
          '--float-duration': pack.floatDuration,
          '--shadow-opacity': pack.shadow.opacity,
        } as CSSProperties

        return (
          <motion.div
            key={pack.id}
            className="absolute inset-0"
            style={{ zIndex: pack.z }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(1, pack.delay)}
          >
            {/* L'ombre reste plaquée au sol pendant que le packaging flotte,
                et se resserre à mesure qu'il s'élève. */}
            <div
              aria-hidden="true"
              className="absolute animate-shadow-pulse rounded-[50%] bg-bark blur-[2cqw]"
              style={{
                ...floatVar,
                left: `${pack.shadow.left}%`,
                width: `${pack.shadow.width}%`,
                bottom: `${GROUND - 3.6}%`,
                // Un ratio, pas un padding en % : celui-ci se résoudrait sur la largeur du conteneur.
                aspectRatio: '6 / 1',
              }}
            />

            {/* Flottement et rotation portés par deux éléments distincts :
                ils écriraient sinon tous les deux la même propriété transform. */}
            <div
              className="absolute"
              style={{ ...pack.place, bottom: `${GROUND}%`, height: `${pack.heightPct}%` }}
            >
              <div className="h-full animate-float" style={floatVar}>
                <img
                  src={pack.src}
                  width={pack.width}
                  height={pack.height}
                  alt={pack.alt}
                  fetchPriority={pack.priority ? 'high' : undefined}
                  decoding="async"
                  style={{ transform: `rotate(${pack.rotate}deg)`, transformOrigin: '50% 55%' }}
                  className="h-full w-auto max-w-none drop-shadow-[0_2.2cqw_3cqw_rgba(74,45,24,0.26)]"
                />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
