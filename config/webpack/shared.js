// Note: You must restart bin/webpack-watcher for changes to take effect

const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const extname = require('path-complete-extname')
const { env, extensions, paths, publicPath, rulesDir } = require('./configuration.js')

const packsPath = path.resolve(paths.src_path, paths.dist_dir)

module.exports = {
  context: packsPath,

  entry: fs.readdirSync(packsPath).reduce((entries, entry) => {
      const entriesCopy = entries
      const packName = path.basename(entry, extname(entry))
      entriesCopy[packName] = `./${entry}`
      return entriesCopy
    }, {}
  ),

  output: { filename: '[name].js', path: path.resolve(paths.dist_path) },

  module: {
    rules: fs.readdirSync(rulesDir).map((file) => (
      require(path.join(rulesDir, file))
    ))
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),
    new ExtractTextPlugin(env.NODE_ENV === 'production' ? '[name]-[hash].css' : '[name].css'),
    new ManifestPlugin({ fileName: 'manifest.json', publicPath, writeToFileEmit: true })
  ],

  resolve: {
    alias: { 'vue$':'vue/dist/vue.esm.js' },
    extensions,
    modules: [
      path.resolve(paths.src_path),
      path.resolve(paths.node_modules_path)
    ]
  },

  resolveLoader: {
    modules: [paths.node_modules_path]
  }
}
