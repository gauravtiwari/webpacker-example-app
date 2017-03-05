/* eslint global-require: 0 */
// Note: You must restart bin/webpack-watcher for changes to take effect

const merge = require('webpack-merge')
const sharedConfig = require('./shared.js')
const { webpacker } = require('../../package.json')

if (webpacker.assets) {
  const assetsConfig = require('./assets.js')
  sharedConfig.config = merge(sharedConfig.config, assetsConfig)
}

module.exports = merge(sharedConfig.config, {
  devtool: 'sourcemap',

  stats: {
    errorDetails: true
  },

  output: {
    pathinfo: true
  }
})
