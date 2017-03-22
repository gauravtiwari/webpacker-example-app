// Note: You must restart bin/webpack-dev-server for changes to take effect

const { resolve } = require('path')
const { readdirSync } = require('fs');
const webpack = require('webpack')
const merge = require('webpack-merge')
const devConfig = require('./development.js')
const { devServer, publicPath, paths } = require('./configuration.js')

module.exports = merge(devConfig, {
  output: { publicPath },

  devServer: {
    host: devServer.host,
    port: devServer.port,
    compress: true,
    hot: true,
    historyApiFallback: true,
    contentBase: resolve(paths.output, paths.entry),
    publicPath
  },

  plugins: devConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ])
})
