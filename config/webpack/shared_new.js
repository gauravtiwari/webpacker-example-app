// Note: You must restart bin/webpack-watcher for changes to take effect

const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const extname = require('path-complete-extname')
const { env, extensions, paths, publicPath, rulesDir } = require('./configuration.js')

module.exports = {
  context: path.resolve(paths.entry),

  entry: fs.readdirSync(path.resolve(paths.entry)).reduce((entries, entry) => {
      const entriesCopy = entries
      const packName = path.basename(entry, extname(entry))
      entriesCopy[packName] = `./${entry}`
      return entriesCopy
    }, {}
  ),

  output: { filename: '[name].js', path: path.resolve(paths.output, paths.entry.split('/').pop()) },

  module: {
    rules: fs.readdirSync(rulesDir).map((file) => (
      require(path.join(rulesDir, file))
    ))
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),
    new ExtractTextPlugin(env.NODE_ENV === 'production' ? '[name]-[hash].css' : '[name].css'),
    new ManifestPlugin({ fileName: 'manifest.json', publicPath, writeToFileEmit: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
  ],

  resolve: {
    alias: { 'vue$':'vue/dist/vue.esm.js' },
    extensions,
    modules: [
      path.resolve(paths.entry),
      path.resolve(paths.node_modules)
    ]
  },

  resolveLoader: {
    modules: [paths.node_modules]
  }
}
