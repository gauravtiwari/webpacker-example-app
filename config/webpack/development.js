// Note: You must restart bin/webpack-watcher for changes to take effect

const merge = require('webpack-merge')
const process = require('process')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const sharedConfig = require('./shared.js')

const devHost = process.env.DEV_HOST
const devPort = process.env.DEV_PORT
const publicPath = devHost ?
                    `http://${devHost}:${devPort}/` : `/${sharedConfig.distDir}/`

module.exports = merge(sharedConfig.config, {
  devtool: 'sourcemap',

  stats: {
    errorDetails: true
  },

  output: {
    pathinfo: true
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|eot|svg|ttf|woff|woff2)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath,
            name: '[name].[ext]'
          }
        }]
      }
    ]
  },

  devServer: {
    host: devHost,
    compress: true,
    port: devPort,
    publicPath
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new ManifestPlugin({
      fileName: 'digests.json',
      publicPath: `/${sharedConfig.distDir}/`
    })
  ]
})
