/* eslint global-require: 0 */
// Note: You must restart bin/webpack-watcher for changes to take effect

const merge = require('webpack-merge')
const { config } = require('./shared.js')

module.exports = merge(config, {
  devtool: 'sourcemap',

  stats: {
    errorDetails: true
  },

  output: {
    pathinfo: true
  }
})
