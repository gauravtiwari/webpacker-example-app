// Note: You must restart bin/webpack-watcher for changes to take effect

const webpack = require('webpack')
const merge   = require('webpack-merge')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const sharedConfig = require('./shared.js')

const newRules = sharedConfig.config.module.rules.filter((obj) => {
  return !obj.test.test('.png');
})

newRules.push({
  test: /\.(jpe?g|png|gif|svg)$/i,
  use: [{
    loader: 'file-loader',
    options: {
      publicPath: `/${sharedConfig.distDir}/`,
      name: '[name]-[hash].[ext]',
    }
  }],
})

sharedConfig.config.module.rules = newRules

module.exports = merge(sharedConfig.config, {
  output: { filename: '[name]-[chunkhash].js' },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),

    new ExtractTextPlugin('[name]-[hash].css')
  ]
})
