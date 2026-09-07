import type { Transition, Variants } from 'framer-motion'

/** Courbe « organique » : départ franc, arrivée très amortie. */
export const EASE_ORGANIC: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const transition = (duration = 0.7, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_ORGANIC,
})

/** Apparition au scroll : montée courte + fondu. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transition() },
}

/** Conteneur qui décale l'apparition de ses enfants. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

/** Réactions au survol/appui, partagées par tous les éléments cliquables. */
export const pressable = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring', stiffness: 400, damping: 26 } satisfies Transition,
}
