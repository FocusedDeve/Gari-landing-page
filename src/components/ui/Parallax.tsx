import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

type ParallaxProps = {
  children: ReactNode
  /** Amplitude du décalage vertical, en pixels, sur toute la traversée du viewport. */
  distance?: number
  className?: string
}

/** Parallaxe légère : le contenu dérive à contre-sens du scroll, amorti par un ressort. */
export function Parallax({ children, distance = 60, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const y = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.4 })

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduceMotion ? undefined : { y }}>{children}</motion.div>
    </div>
  )
}
