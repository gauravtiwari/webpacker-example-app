/* eslint global-require: 0 */
// Note: You must run bin/webpack for changes to take effect

const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const sharedConfig = require('./shared.js')
const { webpacker } = require('../../package.json').config

if (webpacker.static) {
  const staticConfig = require('./static.js')
  sharedConfig.config = merge(sharedConfig.config, staticConfig)
}

module.exports = merge(sharedConfig.config, {
  output: { filename: '[name]-[chunkhash].js' },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|jpeg|png|gif|svg|eot|svg|ttf|woff|woff2)$/
    })
  ]
})
