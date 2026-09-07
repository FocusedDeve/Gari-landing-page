import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Benefits } from '@/components/sections/Benefits'
import { Faq } from '@/components/sections/Faq'
import { Formats } from '@/components/sections/Formats'
import { Hero } from '@/components/sections/Hero'
import { MarqueeBand } from '@/components/sections/MarqueeBand'
import { OrderCta } from '@/components/sections/OrderCta'
import { Rituals } from '@/components/sections/Rituals'
import { WaveDivider } from '@/components/ui/WaveDivider'

/** Fine barre de progression en haut de page, amortie pour suivre le scroll sans à-coups. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-clay"
    />
  )
}

export default function App() {
  return (
    // Framer anime en JavaScript : le bloc prefers-reduced-motion de index.css ne
    // neutralise que les animations CSS et ne l'atteint pas. `reducedMotion="user"`
    // supprime les déplacements et conserve les fondus.
    <MotionConfig reducedMotion="user">
      <div id="top" className="min-h-screen bg-bone">
        <ScrollProgress />

        {/* Sans ce lien, atteindre le contenu au clavier coûte six tabulations. */}
        <a
          href="#produit"
          className="sr-only z-[70] focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-bold focus:uppercase focus:tracking-wide focus:text-bone"
        >
          Aller au contenu
        </a>

        <Navbar />

        <main>
          <Hero />
          <WaveDivider className="bg-straw-light text-cream" />
          <MarqueeBand />
          <Formats />
          <WaveDivider className="bg-bone text-cream" flip />
          <Benefits />
          <WaveDivider className="bg-cream text-ink" />
          <Rituals />
          <WaveDivider className="bg-ink text-cream" flip />
          <Faq />
          <WaveDivider className="bg-cream text-bone" />
          <OrderCta />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}
