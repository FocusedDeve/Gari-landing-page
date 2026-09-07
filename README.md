# Gari d'Or — landing page

Landing page e-commerce single-page pour un gari artisanal togolais. Le hero reprend
la composition de [donedrinks.com](https://www.donedrinks.com/) : bloc de couleur pleine,
colonne éditoriale à gauche, produit en trio incliné à droite, et titre en casse normale
dont la hiérarchie repose sur un contraste de graisse plutôt que sur les capitales.

## Stack

| Rôle | Choix |
| --- | --- |
| Build | Vite 8 + `@vitejs/plugin-react` |
| Langage | React 19 + TypeScript |
| Styles | Tailwind CSS 4 via `@tailwindcss/vite` |
| Animations | Framer Motion |
| Icônes | lucide-react |
| Paquets | pnpm |

```bash
pnpm install
pnpm dev       # serveur de développement
pnpm build     # tsc -b && vite build
pnpm preview   # sert dist/
pnpm lint
```

## Arborescence

```
src/
├─ App.tsx                       Composition de la page + barre de progression de scroll
├─ index.css                     Base Tailwind, @config, utilitaires, reduced-motion
├─ assets/                       Visuels produit (packaging détouré + photos WebP)
├─ data/content.ts               Tout le contenu éditorial, typé — un seul point d'édition
├─ lib/motion.ts                 Easing, variants et interactions partagés
└─ components/
   ├─ layout/
   │  ├─ Navbar.tsx              Nav fixe en pilule, CTA d'achat, menu mobile
   │  └─ Footer.tsx              CTA final de conversion + contacts + réseaux
   ├─ sections/
   │  ├─ Hero.tsx                Deux colonnes : titre/CTA à gauche, trio produit à droite
   │  │                            — tient dans une seule hauteur de fenêtre
   │  ├─ MarqueeBand.tsx         Deux rangées de pastilles défilant à contresens
   │  ├─ Formats.tsx             Les trois conditionnements, CTA intégré à chaque carte
   │  ├─ Faq.tsx                 Six questions d'achat, <details>/<summary> natifs
   │  ├─ OrderCta.tsx            Conversion finale — dans <main>, pas dans le pied de page
   │  ├─ Benefits.tsx            « Pourquoi notre gari ? » — grille asymétrique + chiffres
   │  └─ Rituals.tsx             « Comment le déguster » — grandes cartes visuelles
   └─ ui/
      ├─ Button.tsx              CTA réactif au survol/appui
      ├─ ProductTrio.tsx         Trois packagings inclinés, chacun sur son ombre au sol
      ├─ WaveDivider.tsx          Transition versée entre deux sections
      ├─ RotatingBadge.tsx       Pastille circulaire à texte tournant
      ├─ Reveal.tsx              Apparition au scroll (une seule fois)
      ├─ Parallax.tsx            Parallaxe légère amortie par ressort
      ├─ SectionLabel.tsx        Sur-titre de section
      └─ BrandIcons.tsx          Logos sociaux (absents de lucide v1)
```

## Système typographique

La référence utilise **Roca One**, une police commerciale. L'équivalent libre retenu est
**Fraunces** (Google Fonts, variable 300–900 avec les axes `SOFT` et `WONK`) : mêmes
terminaisons adoucies, même chaleur, et surtout toute la plage de graisses nécessaire.

Les règles, posées sur `h1, h2, h3` dans `index.css` :

- casse normale, jamais de capitales ;
- graisse 400 par défaut, avec un fragment de la phrase passé en `font-extrabold` — c'est
  ce contraste qui porte la hiérarchie (« Le gari mérite mieux que **l'industrie.** ») ;
- **exception : le `h1` du hero est d'une seule graisse**, en `font-extrabold` à pleine
  chasse. La référence fait de même — elle réserve le contraste gras/maigre à ses titres
  de section. Appliqué au titre de page, il coupe la phrase en deux et affaiblit le seul
  endroit qui doit frapper d'emblée ;
- interlignage `0.95`, crénage `-0.01em` (`tracking-headline`) ;
- `font-variation-settings: 'SOFT' 60, 'WONK' 1`.

Le logotype fait exception via l'utilitaire `wordmark` : capitales, `font-black`, crénage
serré, axes variables à zéro.

## Rythme chromatique

Hero paille → pastilles crème → formats os → pourquoi crème → déguster encre → FAQ crème →
CTA os → pied os. Les changements de fond passent par `WaveDivider` : la couleur qui
arrive déborde sur celle qui part. Le bandeau ne coupe plus par contraste mais par changement de matière : le
hero pose un aplat, le bandeau le fragmente en pastilles qui reprennent chacune une
couleur de la palette, puis la page s'ouvre sur du clair.

## Points d'attention

- **Contenu** : textes, prix, contacts, avantages et rituels vivent dans
  `src/data/content.ts`. Modifier la page ne demande pas de toucher au JSX.
- **Thème** : couleurs, polices, rayons et keyframes sont dans `tailwind.config.js`,
  chargé par Tailwind 4 via `@config` dans `src/index.css`.
- **Défilement fluide** : `scroll-behavior: smooth` natif pour les ancres, plus
  `useScroll`/`useSpring` pour la parallaxe et la barre de progression. Pas de
  détournement de la molette : le trackpad et le clavier gardent leur comportement.
- **Accessibilité** : `prefers-reduced-motion` est honoré sur deux fronts. Le bloc de
  `index.css` neutralise les animations CSS (flottement, marquee, pastille tournante) ;
  `<MotionConfig reducedMotion="user">` dans `App.tsx` couvre Framer, qui anime en
  JavaScript et échappe donc au CSS — les déplacements sont supprimés, les fondus gardés.
- **`ProductTrio`** : rotation et flottement sont portés par deux éléments imbriqués
  distincts — ils écriraient sinon tous les deux la propriété `transform`. Les trois
  packagings sont des produits différents, donc chacun porte son propre `alt`. Les flous
  d'ombre sont en `cqw` (le trio est un `@container`) : en pixels fixes, l'ombre lisible
  sur grand écran disparaissait sur mobile.
- **`RotatingBadge`** : `textLength` cale la phrase exactement sur la circonférence, ce
  qui évite qu'elle se chevauche ou laisse un trou. Changer `LABEL` ne demande aucun
  réglage de taille.
- **Display et `Button`** : la classe `inline-flex` du composant l'emporte sur un
  `hidden` passé en `className`. Pour masquer un bouton selon le breakpoint, envelopper
  l'appel (voir `Navbar.tsx`).

- **Hauteur du hero** : la section tient dans une seule hauteur de fenêtre à tous les
  formats testés (1440×900 à 320×568). La contrainte utile est la hauteur, pas la largeur :
  l'utilitaire `product-stage` d'`index.css` plafonne la largeur de la scène produit en
  `svh`, mais seulement sous 780 px de hauteur de fenêtre — sinon une tablette haute
  rétrécirait le produit sans raison.

- **`MarqueeBand`** : deux rangées de pastilles, même durée, sens opposés — la seconde
  relit la keyframe `marquee` à l'envers plutôt que d'en écrire une seconde. Une piste
  contient trois copies de la liste et se décale de `--marquee-shift` (-100/N %) : la
  boucle est invisible tant que (N − 1) copies couvrent la fenêtre, ce qui tient jusqu'à
  ~4240 px de large. Un `IntersectionObserver` met l'animation en pause hors écran —
  en pause, pas retirée, sinon la piste sauterait au début au retour. Sous
  `prefers-reduced-motion`, l'arrêt seul laisserait la moitié des mentions hors champ :
  les règles de fin d'`index.css` (hors `@layer`, donc prioritaires sur les utilitaires)
  replient la rangée en liste centrée et masquent copies et seconde rangée.

- **Ancres** : `#produit` appartient à `Formats`, pas au hero. Un doublon d'id renverrait
  silencieusement tous les CTA sur le haut de page.
- **`clay`** doit passer 4,5:1 deux fois : en texte sur `cream`/`bone`, et comme fond sous
  du `bone`. `#9A4A1C` fait les deux. L'encre sur `clay` n'y arrive jamais — les pastilles
  terre cuite du bandeau sont donc en `text-bone`.
- **Menu mobile** : c'est un `role="dialog" aria-modal`. Échap ferme, le voile ferme, la
  tabulation reste enfermée dans le panneau et le focus revient sur le bouton d'ouverture.
  Sans ce piège, le focus partait sur des liens invisibles derrière un panneau posé sur une
  page qui ne défile plus.
- **`OrderCta`** vit dans `<main>` : c'est du contenu, pas de la signature de bas de page,
  et un lecteur d'écran ne doit pas sortir du contenu principal pour commander.
- **Captures pleine page** : `fullPage: true` redimensionne le viewport et relance les
  animations d'entrée de `Reveal` — les sections apparaissent vides. Capturer à la taille
  réelle du viewport, ou vérifier l'opacité calculée.

## Images

`src/assets/` contient les trois packagings détourés sur fond transparent — sachet kraft
500 g, étui cylindrique 500 g, bocal en verre 450 g — et trois photos d'ambiance en WebP.
Le tableau `PACKS` de `ProductTrio` est le seul point d'édition de la composition : position,
hauteur relative, inclinaison, plan et ombre s'y règlent par packaging.

La troisième carte de « Comment le déguster » (Gari Foto) est volontairement une carte
d'accent typographique, sans photo : y ajouter une `image` dans `content.ts` la bascule
automatiquement en carte visuelle.

Marque, prix et coordonnées sont fictifs, à visée de démonstration.
#   G a r i - l a n d i n g  
 