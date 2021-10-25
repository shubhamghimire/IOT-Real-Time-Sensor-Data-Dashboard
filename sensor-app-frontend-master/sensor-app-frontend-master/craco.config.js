// craco.config.js
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    style: {
      postcss: {
        plugins: [
          postcssPresetEnv({
            features: {
              'nesting-rules': true
            }
          }),
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  }