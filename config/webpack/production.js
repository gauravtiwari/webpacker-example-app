// Note: You must restart bin/webpack-watcher for changes to take effect

const webpack = require('webpack')
const merge   = require('webpack-merge')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const sharedConfig = require('./shared.js')

module.exports = merge(sharedConfig.config, {
  output: {
    filename: '[name]-[chunkhash].js',
    publicPath: `/${sharedConfig.distDir}/`,
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 3000,
            publicPath: `/${sharedConfig.distDir}/`,
            name: '[name]-[hash].[ext]',
          }
        }],
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),

    new ExtractTextPlugin('[name]-[hash].css')
  ]
})
