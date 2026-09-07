/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Blanc cassé / crème — fonds respirants
        bone: '#FAF6EC',
        cream: '#F1E5CE',
        // Jaune paille — couleur signature, fond du hero
        straw: {
          DEFAULT: '#F5C542',
          light: '#FBE2A0',
          deep: '#E0A200',
        },
        // Tons terre
        clay: '#9A4A1C',
        soil: '#8A5223',
        bark: '#4A2D18',
        ink: '#1B100A',
        leaf: '#4F7A3A',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        // Le titre du hero reste quasi sans crénage, comme la référence.
        headline: '-0.01em',
        tightest: '-0.055em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        lift: '0 24px 60px -24px rgba(27, 16, 10, 0.45)',
        pill: '0 10px 30px -12px rgba(27, 16, 10, 0.35)',
      },
      transitionTimingFunction: {
        organic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        // Le décalage dépend du nombre de copies dans la piste : une piste de N copies
        // boucle sans saut en se déplaçant de -100/N %. La piste le déclare elle-même.
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(var(--marquee-shift, -50%), 0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
        shadowPulse: {
          '0%, 100%': { transform: 'scaleX(1)', opacity: 'var(--shadow-opacity, 0.32)' },
          '50%': { transform: 'scaleX(0.88)', opacity: 'calc(var(--shadow-opacity, 0.32) * 0.62)' },
        },
        rotate360: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 30s) linear infinite',
        float: 'float var(--float-duration, 6s) ease-in-out infinite',
        'shadow-pulse': 'shadowPulse var(--float-duration, 6s) ease-in-out infinite',
        'spin-slow': 'rotate360 24s linear infinite',
      },
    },
  },
  plugins: [],
}
