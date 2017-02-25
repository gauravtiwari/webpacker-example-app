// Note: You must restart bin/webpack-watcher for changes to take effect

var path    = require('path');
var webpack = require('webpack');
var merge   = require('webpack-merge');
var OptimizeJsPlugin = require('optimize-js-plugin');

var sharedConfig = require('./shared.js');

module.exports = merge(sharedConfig.config, {
  devtool: 'sourcemap',

  stats: {
    errorDetails: true
  },

  output: {
    pathinfo: true
  },

  devServer: {
    compress: true,
    port: 8080,
    publicPath: 'http://localhost:8080/'
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),

    new OptimizeJsPlugin({
      sourceMap: false
    })
  ]
});
