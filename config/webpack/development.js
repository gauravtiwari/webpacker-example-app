/* eslint global-require: 0 */
// Note: You must restart bin/webpack-watcher for changes to take effect

const merge = require('webpack-merge')
const sharedConfig = require('./shared.js')
const { webpacker } = require('../../package.json').config

if (webpacker.static) {
  const staticConfig = require('./static.js')
  sharedConfig.config = merge(sharedConfig.config, staticConfig)
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
