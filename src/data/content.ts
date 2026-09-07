import ayimolouImg from '@/assets/gari-ayimolou.webp'
import boissonImg from '@/assets/gari-boisson.webp'
import fotoImg from '@/assets/gari-foto.webp'
import pinonImg from '@/assets/gari-pinon.webp'
import jarImg from '@/assets/gari-jar.webp'
import pouchImg from '@/assets/gari-pouch.webp'
import tubeImg from '@/assets/gari-tube.webp'

export type Benefit = {
  id: string
  title: string
  body: string
  /** Palette de la carte — permet la grille asymétrique bicolore. */
  tone: 'cream' | 'straw' | 'bark' | 'clay'
}

export type Ritual = {
  id: string
  /** Le geste, pas un rang : les quatre façons sont des alternatives, pas des étapes. */
  gesture: string
  title: string
  body: string
  /** La mouture que cette façon demande — le pont vers la section Formats. */
  grind: string
  image: string
  imageAlt: string
}

export type NavLink = { label: string; href: string }

export const brand = {
  name: "Gari d'Or",
  wordmark: ['GARI', "D'OR"] as const,
  tagline: 'Gari artisanal du Togo',
  /** Prix d'entrée de gamme, repris par le CTA du hero. Le détail vit dans `formats`. */
  priceFrom: '8,90 €',
  email: 'bonjour@garidor.tg',
  /** L'atelier est une mention d'origine, pas une adresse de retrait : les clients sont en Europe. */
  origin: 'Atelier de Kpalimé — région des Plateaux, Togo',
  shipping: 'Expédié depuis le Togo vers la France, la Belgique et le Canada',
  /** Tarifs et délais d'expédition ne sont pas arrêtés : la page l'annonce plutôt que d'inventer un engagement. */
  shippingNote: 'Frais et délais confirmés à la commande',
}

export const navLinks: NavLink[] = [
  { label: 'Le produit', href: '#produit' },
  { label: 'Pourquoi nous', href: '#pourquoi' },
  { label: 'Déguster', href: '#deguster' },
  { label: 'Contact', href: '#contact' },
]

/** Teintes disponibles pour les pastilles du bandeau, puisées dans la palette de marque. */
export type ClaimTone = 'bark' | 'ink' | 'straw' | 'strawLight' | 'clay' | 'soil' | 'bone'

export type Claim = { label: string; tone: ClaimTone }

/** Bandeau de pastilles sous le hero. Chaque mention reprend un fait déjà énoncé
 *  ailleurs sur la page — rien n'est ajouté ici qui ne soit démontré plus bas. */
export const claims: Claim[] = [
  { label: 'Fermenté trois jours', tone: 'straw' },
  { label: 'Un seul ingrédient', tone: 'bark' },
  { label: 'Trois formats', tone: 'bone' },
  { label: 'Torréfié au feu de bois', tone: 'clay' },
  { label: 'Croustillant', tone: 'strawLight' },
  { label: 'Fait au Togo', tone: 'soil' },
  { label: 'Zéro additif', tone: 'ink' },
  { label: 'Manioc récolté à maturité', tone: 'bark' },
  { label: 'Récolte 2026', tone: 'strawLight' },
  { label: 'Coopératives de femmes', tone: 'soil' },
]

export type Format = {
  id: string
  name: string
  weight: string
  /** Mouture — c'est elle qui décide de l'usage, et c'est la seule chose que l'acheteuse compare. */
  grind: string
  /** À quoi sert ce format précisément. Un format sans usage n'est qu'une photo. */
  use: string
  body: string
  price: string
  image: string
  imageAlt: string
  tone: 'cream' | 'bark' | 'straw'
  /** Ancre du rituel que ce format sert le mieux. */
  ritual: string
}

/** Prix de démonstration : la gamme est réelle, les montants ne le sont pas. */
export const formats: Format[] = [
  {
    id: 'sachet',
    name: 'Le sachet',
    weight: '500 g',
    grind: 'Mouture moyenne',
    use: "Pour l'èba",
    body: "Le format du quotidien. Le grain moyen gonfle sans s'agglomérer : c'est celui qu'on verse en pluie dans l'eau bouillante.",
    price: '8,90 €',
    image: pouchImg,
    imageAlt: 'Sachet kraft Gari d’Or de 500 g, mouture moyenne',
    tone: 'cream',
    ritual: '#deguster',
  },
  {
    id: 'etui',
    name: "L'étui",
    weight: '500 g',
    grind: 'Granules fines',
    use: 'Pour la boisson glacée',
    body: "Le grain le plus fin de la gamme. Il se disperse dans l'eau fraîche au lieu de tomber au fond du verre.",
    price: '12,50 €',
    image: tubeImg,
    imageAlt: 'Étui cylindrique Gari d’Or de 500 g, granules fines',
    tone: 'bark',
    ritual: '#deguster',
  },
  {
    id: 'bocal',
    name: 'Le bocal',
    weight: '450 g',
    grind: 'Mouture moyenne',
    use: 'Pour le croustillant',
    body: 'Le verre garde le croustillant intact une fois ouvert. Celui qui reste sur la table et qu’on saupoudre à la main.',
    price: '14,90 €',
    image: jarImg,
    imageAlt: 'Bocal en verre Gari d’Or de 450 g, avec couvercle en bambou',
    tone: 'straw',
    ritual: '#deguster',
  },
]

export type Faq = { question: string; answer: string }

/** Ce qu'une acheteuse à distance doit savoir avant de cliquer. Là où rien n'est arrêté,
 *  la réponse le dit — un « à confirmer » assumé vaut mieux qu'un engagement inventé. */
export const faqs: Faq[] = [
  {
    question: 'Vous livrez dans quels pays ?',
    answer:
      'France, Belgique et Canada pour l’instant. Le colis part de Kpalimé. Si votre pays n’est pas dans la liste, écrivez-nous : nous groupons les demandes et ouvrons les destinations au fur et à mesure.',
  },
  {
    question: 'Combien coûte la livraison, et en combien de temps ?',
    answer:
      'Les frais dépendent du poids et de la destination, et nous préférons vous les confirmer à la commande plutôt que d’afficher un tarif que nous ne tiendrions pas. Comptez deux à trois semaines depuis le Togo.',
  },
  {
    question: 'Quel format choisir ?',
    answer:
      'Par la mouture, pas par la quantité. Granules fines (l’étui) pour la boisson glacée, elles restent en suspension. Mouture moyenne (le sachet, le bocal) pour l’èba et le gari foto, elle gonfle sans coller.',
  },
  {
    question: 'Ça se garde combien de temps ?',
    answer:
      'Le gari est un produit sec : il se conserve un an à l’abri de l’humidité, sans réfrigération. Après ouverture, c’est l’air qui coûte le croustillant — d’où le bocal, qui referme hermétiquement.',
  },
  {
    question: 'Il y a quoi dedans, exactement ?',
    answer:
      'Du manioc. Rien d’autre : ni conservateur, ni colorant, ni arôme, ni farine de complément. C’est la seule ligne de la liste d’ingrédients.',
  },
  {
    question: 'Et si le colis arrive abîmé ?',
    answer:
      'Envoyez-nous une photo du colis à l’ouverture et nous réexpédions. Le gari voyage bien, mais le verre du bocal reste du verre.',
  },
]

export const benefits: Benefit[] = [
  {
    id: 'manioc',
    title: 'Manioc récolté à maturité',
    body: "Moins de 48 h entre la terre et la râpe. C'est ce délai qui garde au gari son parfum de manioc frais.",
    tone: 'cream',
  },
  {
    id: 'pur',
    title: 'Un seul ingrédient',
    body: 'Ni conservateur, ni colorant, ni arôme. Naturellement sans gluten, naturellement sans compromis.',
    tone: 'straw',
  },
  {
    id: 'feu',
    title: 'Torréfié au feu de bois',
    body: "Cuit sur plaque de fonte et remué à la main. Ce geste-là ne s'industrialise pas : c'est lui qui fait le croustillant.",
    tone: 'bark',
  },
  {
    id: 'direct',
    title: 'Payé au juste prix',
    body: 'Acheté 30 % au-dessus du cours local, directement aux coopératives de femmes de la région des Plateaux.',
    tone: 'clay',
  },
]

export const rituals: Ritual[] = [
  {
    id: 'boisson',
    gesture: 'Tremper',
    title: 'En boisson glacée',
    body: "Deux cuillères dans du lait frais, du sucre, des arachides grillées et des glaçons. Le rafraîchissement des après-midis à Lomé, qui se mange à la cuillère.",
    grind: 'Granules fines',
    image: boissonImg,
    imageAlt: 'Bol de gari au lait glacé, avec arachides grillées et glaçons',
  },
  {
    id: 'pinon',
    gesture: 'Travailler',
    title: 'En pinon, avec du porc frit',
    body: "Versé en pluie dans un bouillon de tomate, travaillé à la spatule jusqu'à la souplesse — le geste de l'èba, en plus relevé. On l'accompagne de porc frit.",
    grind: 'Mouture moyenne',
    image: pinonImg,
    imageAlt:
      'Gari versé en pluie dans un bouillon de tomate et travaillé à la spatule, bol de porc frit à côté',
  },
  {
    id: 'foto',
    gesture: 'Sauter',
    title: 'En gari foto',
    body: "Sauté avec œuf, tomate, oignon et épices. Le grain gonfle à peine et garde son mordant : c'est ce croustillant qui sépare le foto d'un riz sauté.",
    grind: 'Mouture moyenne',
    image: fotoImg,
    imageAlt:
      'Assiette de gari foto aux œufs, tomates et épices, servie avec un pilon de poulet',
  },
  {
    id: 'ayimolou',
    gesture: 'Saupoudrer',
    title: "En pluie sur l'ayimolou",
    body: "Une poignée à côté du riz-haricot et de la sauce. Ici le gari ne cuit pas : il apporte le grain sec contre le moelleux, et se mélange à table.",
    grind: 'Mouture moyenne',
    image: ayimolouImg,
    imageAlt:
      "Assiette d'ayimolou — riz et haricots — avec une poignée de gari sec et de la sauce tomate",
  },
]

export const stats = [
  { value: '48 h', label: 'de la terre à la râpe' },
  { value: '1', label: 'seul ingrédient' },
  { value: '120', label: 'productrices partenaires' },
]

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' as const },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' as const },
]
