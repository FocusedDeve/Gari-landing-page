import { Leaf } from 'lucide-react'

const CIRCLE_ID = 'badge-arc'
const RADIUS = 38
/** textLength cale la phrase pile sur la circonférence : ni chevauchement, ni trou. */
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const LABEL = 'GARI ARTISANAL · RÉCOLTE 2026 · TOGO ·'

type RotatingBadgeProps = {
  className?: string
}

/** Pastille circulaire à texte tournant, posée dans un angle de la section. */
export function RotatingBadge({ className = '' }: RotatingBadgeProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-24 w-24 sm:h-28 sm:w-28 ${className}`.trim()}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
        <defs>
          <path id={CIRCLE_ID} d={`M50,50 m-${RADIUS},0 a${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`} />
        </defs>
        <text className="fill-bark font-sans" fontSize="8.6" fontWeight="600">
          <textPath
            href={`#${CIRCLE_ID}`}
            textLength={CIRCUMFERENCE}
            lengthAdjust="spacing"
          >
            {LABEL}
          </textPath>
        </text>
      </svg>

      <span className="absolute inset-0 m-auto grid h-11 w-11 place-items-center rounded-full bg-bark text-straw sm:h-12 sm:w-12">
        <Leaf className="h-5 w-5" strokeWidth={2.2} />
      </span>
    </div>
  )
}
