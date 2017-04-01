const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { ifProduction } = require('../configuration.js')

const loaderOptions = {
  test: /\.(scss|sass|css)$/i,
  use: [
    'style-loader', {
      loader: 'css-loader',
      // Enable css-modules
      // Documentation: https://github.com/css-modules/css-modules
      options: {
        modules: true,
        minimize: ifProduction(),
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
      }
    },
    'postcss-loader',
    'sass-loader'
  ]
}

// For development server and hot-reloading use regular loaders
// In production environment extract styles to a separate bundle
module.exports = ifProduction({
  test: /\.(scss|sass|css)$/i,
  use: ExtractTextPlugin.extract(loaderOptions.use)
}, loaderOptions)
