# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Diaspora ouest-africaine — Togolais et Ouest-Africains installés en Europe et en Amérique
du Nord. Ils connaissent déjà le gari : ils savent le préparer, ils ont un souvenir de
référence du goût, et ce qu'ils cherchent en ligne c'est un gari qui tienne la comparaison
avec celui du pays, pas une explication de ce qu'est le gari.

La page est en français. Elle sert donc la diaspora francophone ; la diaspora anglophone
(Nigeria, Ghana) n'est pas couverte aujourd'hui — décision de langue non tranchée.

## Product Purpose

Landing page e-commerce mono-page pour **Gari d'Or**, un gari artisanal togolais. Objectif
unique : convertir un visiteur en commande. Le succès se mesure à la commande passée, pas
au temps passé sur la page.

**Statut du projet : démonstration / portfolio.** Il n'y a pas d'activité réelle derrière.
Le contenu peut rester inventé tant qu'il est plausible — mais rien d'inventé ne doit être
présenté comme une preuve vérifiée (voir Evidence on Hand).

## Positioning

Le gari qui n'a pas rompu la chaîne artisanale, à la différence du gari industriel vendu
en épicerie exotique : manioc râpé sous 48 h après récolte, fermenté trois jours, torréfié
au feu de bois sur plaque de fonte et remué à la main. Un seul ingrédient, aucun additif.

L'achat direct aux coopératives de femmes de la région des Plateaux, au-dessus du cours
local, fait partie de la proposition — c'est ce qu'un concurrent industriel ne peut pas
répliquer sincèrement.

*(Les chiffres qui chiffrent cette promesse — 48 h, 30 %, 120 productrices — sont des
valeurs de démonstration, pas des mesures.)*

## Operating Context

- Page unique, navigation par ancres : produit → pourquoi nous → déguster → contact.
- Achat à distance : le visiteur ne voit ni ne goûte le produit avant de commander. Le
  visuel packaging et la description du procédé portent seuls la crédibilité.
- Les trois usages du gari structurent la section « Déguster » : boisson glacée, èba,
  gari foto. Ce sont des préparations réelles, pas des suggestions marketing.

## Capabilities and Constraints

- **Gamme : trois formats réels** — sachet kraft 500 g, étui cylindrique 500 g (fines
  granules), bocal en verre 450 g (gari artisanal). *Incohérence à corriger :*
  `src/data/content.ts` n'annonce aujourd'hui qu'un prix unique pour « le sachet de 1 kg ».
- **Mécanique commerciale à faire évoluer vers la diaspora :** prix en euros, expédition
  internationale, panier en ligne. Le contenu actuel est entièrement local (FCFA,
  WhatsApp +228, retrait au marché de Hédzranawoé à Lomé) et doit être remplacé. Les
  montants, frais de port et délais ne sont pas décidés — à ne pas inventer comme des
  engagements.
- **Décisions ouvertes :** prix par format ; transporteur et délais ; version anglophone.
- Tout le contenu éditorial est centralisé et typé dans `src/data/content.ts` : un seul
  point d'édition, le JSX n'a pas à être touché pour changer un texte.
- Stack existante (Vite + React 19 + TypeScript + Tailwind 4 + Framer Motion, pnpm).

## Brand Commitments

- **Nom : « Gari d'Or ».** Logotype en deux lignes capitales, `GARI` / `D'OR`. Le titre
  « Akpé Gari » dans `index.html` est un reliquat à corriger.
- Baseline : « Gari artisanal du Togo ». Sur packaging : « L'excellence traditionnelle ».
- L'origine reste nommée — Togo, région des Plateaux, coopératives de femmes — y compris
  après le basculement commercial vers l'euro. C'est l'ancrage du produit, pas un décor.
- Voix : concrète et gestuelle, phrases courtes, le procédé décrit par ses gestes plutôt
  que par des adjectifs. Français, tutoiement absent, aucun superlatif publicitaire.

## Evidence on Hand

Disponible :

- Trois rendus packaging détourés sur fond transparent — `src/assets/gari-pouch.webp`,
  `gari-tube.webp`, `gari-jar.webp`.
- Trois photos d'ambiance — `gari-bowl.webp` (bol de gari fin), `gari-eba.webp` (èba et
  sauce gombo), `gari-cassava.webp` (manioc).

**Absent — à ne jamais fabriquer comme preuve :** aucun témoignage client, aucun client
réel, aucune mention presse, aucune certification, aucun label bio ou commerce équitable,
aucune analyse nutritionnelle, aucun chiffre de vente. Les statistiques affichées
(« 48 h », « 1 seul ingrédient », « 120 productrices ») et les coordonnées
(`bonjour@garidor.tg`, `+228 90 00 00 00`, adresse à Lomé) sont des valeurs de
démonstration : elles peuvent rester, mais ne doivent pas gagner d'habillage qui les fasse
passer pour vérifiées (sceau, « certifié », logo d'organisme, source citée).

## Product Principles

1. **Rien d'inventé ne se déguise en preuve.** Le contenu de démonstration reste plausible
   et reste identifiable comme tel. Pas de sceaux, pas de logos d'organismes, pas de
   témoignages fabriqués.
2. **Le geste est l'argument.** Ce qui distingue ce gari se raconte par le procédé — le
   délai, le feu de bois, la main sur la spatule — pas par le vocabulaire premium.
3. **Écrire pour quelqu'un qui connaît déjà le gari.** L'audience n'a pas besoin qu'on lui
   explique le produit ; elle a besoin d'être convaincue que celui-ci est le bon.
4. **Les trois formats doivent se lire comme une intention**, pas comme trois images. Un
   format, un usage, une raison d'exister.
5. **L'origine ne se dilue pas dans l'export.** Passer à l'euro et à l'expédition ne doit
   pas effacer le Togo du discours ni le transformer en couleur locale.

## Accessibility & Inclusion

Aucune norme n'a été imposée par le projet. Contrainte de fait à préserver : le site
respecte déjà `prefers-reduced-motion` sur l'ensemble de ses animations (apparitions,
parallaxe, flottement, bandeau défilant, pastille tournante). La répartition réelle du
trafic mobile/desktop n'est pas connue : traiter le mobile comme une cible de plein droit
plutôt que comme un cas dégradé, sans invoquer de statistique d'usage.
