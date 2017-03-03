// Note: You must restart bin/webpack-watcher for changes to take effect

const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const sharedConfig = require('./shared.js')

module.exports = merge(sharedConfig.config, {
  output: { filename: '[name]-[chunkhash].js' },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|eot|svg|ttf|woff|woff2)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath: `/${sharedConfig.distDir}/`,
            name: '[name]-[hash].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.optimize.UglifyJsPlugin(),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|jpeg|png|gif|svg|eot|svg|ttf|woff|woff2)$/
    }),

    new ManifestPlugin({
      fileName: 'digests.json',
      publicPath: `/${sharedConfig.distDir}/`
    })
  ]
})
