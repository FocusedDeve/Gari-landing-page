import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { fadeUp, transition } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  /** Décalage en secondes, pour cascader plusieurs Reveal voisins. */
  delay?: number
  className?: string
}

/** Apparition au scroll, jouée une seule fois. Neutralisée si l'utilisateur réduit les animations. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={transition(0.7, delay)}
    >
      {children}
    </motion.div>
  )
}
