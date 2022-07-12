/** @type {import('tailwindcss').Config} */

module.exports = {
 
  content: ["./src/**/*.{js,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      keyframes: {
        wiggle1: {
          '0%, 100%': { transform: 'scale(1)' },
          '10%': { transform: 'scale(0.5)' },
        },
        wiggle2: {
          '0%, 100%': { transform: 'scale(1)' },
          '20%': { transform: 'scale(0.5)' },
        },
        wiggle3: {
          '0%, 100%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(0.5)' },
        }
      },
      // animation: {
      //   wiggle: "wiggle 2000ms ease-in-out infinite"
      // }
    },
    fontFamily:{
      'Dongle':['Dongle', 'sans-serif']
    }
  },
  plugins: [],
}
