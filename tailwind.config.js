/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14110f',
        sand: '#f2ebdd',
        muted: '#8a857c',
        indigo: '#1b2a6b',
        amber: '#f2a900',
        clip: '#f2f2f2',
        paper: '#efe9dc',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', '"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans Variable"', '"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 32px rgba(0,0,0,0.12)',
        tape: '0 4px 12px rgba(0,0,0,0.24)',
        album: '0 2px 17px rgba(0,0,0,0.18)',
        pin: '0 4px 8px rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [],
}
