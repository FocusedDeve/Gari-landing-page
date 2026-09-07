import { Mail, MapPin, Truck } from 'lucide-react'

import { FacebookIcon, InstagramIcon } from '@/components/ui/BrandIcons'
import { brand, navLinks, socials } from '@/data/content'

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
}

/** L'atelier est une origine, pas un point de retrait : les acheteurs sont en Europe. */
const CONTACTS = [
  { icon: Mail, label: brand.email, href: `mailto:${brand.email}` },
  { icon: MapPin, label: brand.origin, href: null },
  { icon: Truck, label: brand.shipping, href: null },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-bone">
      <div className="container-page border-t border-ink/15 py-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="wordmark text-3xl text-ink">
              {brand.wordmark[0]}
              <span className="text-clay"> {brand.wordmark[1]}</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/75">
              {brand.tagline}. Récolté, râpé et torréfié par les coopératives de la région des
              Plateaux, expédié chez vous.
            </p>
            <ul className="mt-7 flex gap-2.5">
              {socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS]
                if (!Icon) return null
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-ink/35 text-ink transition-colors duration-300 hover:bg-ink hover:text-straw"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <nav className="lg:col-span-3" aria-label="Pied de page">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ink/75">
              Navigation
            </h3>
            <ul className="mt-3 flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-11 items-center text-sm text-ink/75 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ink/75">
              Contact
            </h3>
            <ul className="mt-3 flex flex-col">
              {CONTACTS.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-start gap-2.5 text-sm text-ink/75">
                  <Icon className="mt-3.5 h-4 w-4 shrink-0 text-clay" strokeWidth={2.2} aria-hidden="true" />
                  {href ? (
                    <a href={href} className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
                      {label}
                    </a>
                  ) : (
                    <span className="flex min-h-11 items-center">{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-ink/15 pt-7 text-xs text-ink/75">
          © {new Date().getFullYear()} {brand.name}. Marque fictive créée pour une démonstration —
          prix, coordonnées et destinations d&apos;expédition ne sont pas réels.
        </p>
      </div>
    </footer>
  )
}
