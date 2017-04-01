// Note: You must restart bin/webpack-dev-server for changes to take effect

const webpack = require('webpack')
const { resolve } = require('path')
const merge = require('webpack-merge')
const { propIf, removeEmpty } = require('webpack-config-utils')
const devConfig = require('./development.js')
const { devServer, publicPath, paths } = require('./configuration.js')

const entry = propIf(devServer.hot, merge(devConfig.entry, {
  // bundle the client for hot reloading
  // only- means to only hot reload for successful updates
  hot: 'webpack/hot/only-dev-server'
}), devConfig.entry)

module.exports = merge(devConfig, {
  entry,
  devServer: {
    // Show only compile warnings and errors.
    clientLogLevel: 'none',
    compress: true,
    contentBase: resolve(paths.output, paths.entry),
    historyApiFallback: true,
    host: devServer.host,
    // Works with JS, CSS and Vue out-of-the-box
    // More info on integrating HMR with React: https://webpack.js.org/guides/hmr-react/
    hot: devServer.hot,
    // Enable HTTPS if the protocol is https
    https: devServer.protocol === 'https',
    port: devServer.port,
    publicPath,
    // Avoids CPU overload on some systems.
    watchOptions: {
      ignored: /node_modules/
    }
  },

  plugins: removeEmpty([
    propIf(devServer.hot, new webpack.HotModuleReplacementPlugin(), undefined),
    new webpack.NamedModulesPlugin()
  ])
})
