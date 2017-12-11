const { environment } = require('@rails/webpacker')

const coffeeLoader = environment.loaders.get('coffee')
const babelLoader = environment.loaders.get('babel')
babelLoader.use.forEach(loader => coffeeLoader.use.unshift(loader))

const sassLoader = environment.loaders.get('sass')
const css = environment.loaders.get('css')
const cssLoader = sassLoader.use.find(loader => loader.loader === 'css-loader')

cssLoader.options = Object.assign(cssLoader.options, {
  modules: true,
  localIdentName: '[name]__[local]--[hash:base64:5]'
})

environment.loaders.prepend('svg', // In your webpack config
{
  test: /\.svg$/,
  use: babelLoader.use.concat([
    {
      loader: "react-svg-loader",
      options: {
        jsx: true // true outputs JSX tags
      }
    }
  ])
})

module.exports = environment
