// Note: You must restart bin/webpack-watcher for changes to take effect

const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const sharedConfig = require('./shared.js')

const productionRules = sharedConfig.config.module.rules.filter((obj) => {
  if (obj.test.test('.png')) {
    return false
  }

  return true
})

const productionfileLoaderConfig = sharedConfig.fileLoaderConfig
productionfileLoaderConfig.options.name = '[name]-[hash].[ext]'

const productionPlugins = sharedConfig.config.plugins.filter(plugin => (
  plugin.filename === undefined
))

productionRules.push({
  test: sharedConfig.fileLoaderExtensions,
  use: productionfileLoaderConfig
})

sharedConfig.config.module.rules = productionRules
sharedConfig.config.plugins = productionPlugins

module.exports = merge(sharedConfig.config, {
  output: { filename: '[name]-[chunkhash].js' },

  plugins: [
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|jpeg|png|gif|svg|eot|svg|ttf|woff|woff2)$/
    })
  ]
})
