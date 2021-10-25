const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      primary: '#39bcf8',
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
      gray: colors.coolGray,
      white: colors.white,
      black: colors.black,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif', 'Roboto'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    }
  }
}