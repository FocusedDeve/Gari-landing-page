/**
 * Transition versée entre deux sections : la couleur qui arrive déborde sur celle qui part.
 *
 * Le fond du bloc porte la couleur sortante, le tracé porte la couleur entrante via
 * `currentColor` — donc une seule paire d'utilitaires suffit à l'appeler :
 * `<WaveDivider className="bg-cream text-bone" />`.
 */
type WaveDividerProps = {
  /** `bg-<sortante> text-<entrante>`. */
  className: string
  /** Miroir horizontal : évite que deux vagues successives dessinent la même courbe. */
  flip?: boolean
}

export function WaveDivider({ className, flip = false }: WaveDividerProps) {
  return (
    <div aria-hidden="true" className={`relative block w-full leading-[0] ${className}`}>
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        role="presentation"
        className={`block h-10 w-full sm:h-16 lg:h-24 ${flip ? '-scale-x-100' : ''}`}
      >
        <path
          fill="currentColor"
          d="M0,46 C180,96 330,4 540,30 C742,55 858,104 1062,88 C1218,76 1338,34 1440,52 L1440,110 L0,110 Z"
        />
      </svg>
    </div>
  )
}
