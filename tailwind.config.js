/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sunny: '#FFE66D',
        coral: '#FF6B6B',
        teal: '#4ECDC4',
        sky: '#A8DADC',
        mint: '#B5EAD7',
        plum: '#C77DFF',
        cream: '#FFF8E7'
      },
      fontFamily: {
        fun: ['"Fredoka"', '"Comic Sans MS"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        pop: '0 6px 0 0 rgba(0,0,0,0.15)',
        kid: '0 8px 0 0 rgba(0,0,0,0.2)'
      }
    }
  },
  plugins: []
}
