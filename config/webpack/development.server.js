// Note: You must restart bin/webpack-dev-server for changes to take effect

const merge = require('webpack-merge')
const devConfig = require('./development.js')
const { dev_server, publicPath } = require('./configuration.js')

module.exports = merge(devConfig, {
  devServer: {
    host: dev_server.host,
    port: dev_server.port,
    compress: dev_server.compress,
    publicPath
  }
})
