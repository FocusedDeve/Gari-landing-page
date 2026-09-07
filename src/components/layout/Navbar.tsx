import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { brand, navLinks } from '@/data/content'
import { EASE_ORGANIC } from '@/lib/motion'

const FOCUSABLE = 'a[href], button:not([disabled])'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Le panneau est un dialogue : tant qu'il est ouvert, la page ne défile pas, Échap
  // ferme, et la tabulation reste enfermée dedans. Sans ce piège, le focus part sur des
  // liens invisibles derrière le panneau, sur une page qui ne peut plus défiler.
  useEffect(() => {
    if (!menuOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const trigger = triggerRef.current
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      )
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      // Le focus revient sur le bouton qui a ouvert le panneau, pas au début du document.
      ;(trigger ?? previouslyFocused)?.focus()
    }
  }, [menuOpen, close])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-page">
        <nav
          aria-label="Navigation principale"
          className={`relative z-10 mt-3 flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 ease-organic sm:px-5 sm:py-3 ${
            scrolled || menuOpen
              ? 'border border-ink/15 bg-bone/95 shadow-pill backdrop-blur-xl'
              : 'border border-transparent bg-transparent'
          }`}
        >
          <a href="#top" className="flex min-h-11 shrink-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-sm font-black text-straw"
            >
              G
            </span>
            <span className="wordmark text-lg leading-none text-ink sm:text-xl">
              {brand.wordmark[0]}
              <span className="text-clay"> {brand.wordmark[1]}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative flex min-h-11 items-center font-display text-sm font-semibold uppercase tracking-wide text-ink/75 transition-colors hover:text-ink"
                >
                  {link.label}
                  <span className="absolute bottom-2 left-0 h-0.5 w-0 bg-clay transition-all duration-300 ease-organic group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            {/* Le display se pilote depuis le parent : la classe `inline-flex`
                du Button l'emporterait sur un `hidden` passé en className. */}
            <span className="hidden sm:block">
              <Button
                href="#produit"
                size="sm"
                icon={<ShoppingBag className="h-4 w-4" strokeWidth={2.4} />}
              >
                Commander
              </Button>
            </span>
            {/* Sous 640 px, le CTA se réduit à son icône — mais garde 44 px de zone tactile. */}
            <a
              href="#produit"
              aria-label="Commander — voir les formats"
              className="grid h-11 w-11 place-items-center rounded-full bg-ink text-bone transition-colors hover:bg-bark sm:hidden"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
            </a>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/35 text-ink transition-colors hover:bg-ink hover:text-bone lg:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Voile cliquable : une sortie de plus que la seule croix. */}
            <motion.button
              type="button"
              onClick={close}
              tabIndex={-1}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_ORGANIC }}
              className="fixed inset-0 z-0 cursor-default bg-ink/45 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              id="menu-mobile"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: EASE_ORGANIC }}
              className="container-page relative z-10 lg:hidden"
            >
              <div className="mt-3 rounded-4xl border border-ink/15 bg-bone p-6 shadow-lift">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={close}
                        className="flex min-h-11 items-center border-b border-ink/15 py-4 font-display text-2xl font-semibold text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <Button
                  href="#produit"
                  size="md"
                  className="mt-6 w-full"
                  icon={<ShoppingBag className="h-4 w-4" strokeWidth={2.4} />}
                >
                  Commander
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
