import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Parallax } from '@/components/ui/Parallax'
import { ProductTrio } from '@/components/ui/ProductTrio'
import { RotatingBadge } from '@/components/ui/RotatingBadge'
import { brand } from '@/data/content'
import { transition } from '@/lib/motion'

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-gradient-to-b from-straw to-straw-light pt-20 pb-8 sm:pt-28 lg:pb-10"
    >
      <div className="container-page relative w-full">
        <div className="grid items-center gap-5 sm:gap-8 lg:grid-cols-12 lg:gap-2">
          {/* Colonne éditoriale — alignée à gauche dès le grand écran, centrée en dessous. */}
          <div className="text-center lg:col-span-5 lg:text-left">
            {/* Le titre de page est d'une seule graisse, à pleine chasse. Le contraste
                gras/maigre reste l'affaire des h2 de section : appliqué ici aussi, il
                coupe la phrase en deux et affaiblit le seul endroit qui doit frapper. */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.9, 0.08)}
              id="hero-title"
              className="text-[clamp(2.75rem,7.4vw,6.5rem)] font-extrabold leading-[0.9] text-bark"
            >
              <span className="block">L&apos;or blond</span>
              <span className="block">du Togo</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.8, 0.2)}
              className="mx-auto mt-5 max-w-md text-base leading-snug text-bark/80 sm:mt-8 lg:mx-0"
            >
              Manioc râpé, fermenté trois jours puis torréfié à la main sur plaque de fonte.
              Un seul ingrédient, zéro additif.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.8, 0.3)}
              className="mt-6 sm:mt-9"
            >
              <Button
                href="#produit"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" strokeWidth={2.6} />}
              >
                Voir les formats — dès {brand.priceFrom}
              </Button>
            </motion.div>
          </div>

          {/* Colonne produit — déborde légèrement sur la colonne texte, comme la référence. */}
          <div className="lg:col-span-7 lg:-ml-6">
            <Parallax distance={26}>
              <ProductTrio className="product-stage mx-auto" />
            </Parallax>
          </div>
        </div>
      </div>

      {/* Pastille ancrée en bas de section, alignée sur la gouttière du conteneur. */}
      <div className="container-page pointer-events-none absolute inset-x-0 bottom-8 hidden lg:[@media(min-height:820px)]:block">
        <RotatingBadge />
      </div>
    </section>
  )
}
