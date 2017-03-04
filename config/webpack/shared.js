// Note: You must restart bin/webpack-watcher for changes to take effect

const webpack = require('webpack')
const path = require('path')
const process = require('process')
const glob = require('glob')
const ManifestPlugin = require('webpack-manifest-plugin')
const extname = require('path-complete-extname')
const { webpacker } = require('../../package.json').config

let distDir = webpacker.distDir
let distPath = webpacker.distPath
let srcDir = webpacker.srcDir
let nodeModulesDir = webpacker.nodeModulesDir
let digestFile = webpacker.digestFile

if (!distDir) {
  distDir = 'packs'
}

if (!srcDir) {
  srcDir = 'app/javascript'
}

if (!distPath) {
  distPath = 'public/packs'
}

if (!nodeModulesDir) {
  nodeModulesDir = 'node_modules'
}

if (!digestFile) {
  digestFile = 'digests.json'
}

const config = {
  entry: glob.sync(path.join(srcDir, distDir, '*.js*')).reduce(
    (map, entry) => {
      const basename = path.basename(entry, extname(entry))
      const localMap = map
      localMap[basename] = path.resolve(entry)
      return localMap
    }, {}
  ),

  output: { filename: '[name].js', path: path.resolve(distPath) },

  module: {
    rules: [
      {
        test: /.vue$/, loader: 'vue-loader',
        options: {
          loaders: { 'scss': 'vue-style-loader!css-loader!sass-loader', 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'}
        }
      },
      { test: /.ts$/, loader: 'ts-loader' },
      { test: /\.coffee(\.erb)?$/, loader: 'coffee-loader' },
      {
        test: /\.(js|jsx)?(\.erb)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'react',
            ['env', { modules: false }]
          ]
        }
      },
      {
        test: /\.erb$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'rails-erb-loader',
        options: {
          runner: 'DISABLE_SPRING=1 bin/rails runner'
        }
      }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new ManifestPlugin({
      fileName: digestFile,
      publicPath: `/${distDir}/`
    })
  ],

  resolve: {
    alias: { 'vue$':'vue/dist/vue.esm.js' },
    extensions: ['.js', '.coffee', '.ts'],
    modules: [
      path.resolve(srcDir),
      path.resolve(nodeModulesDir)
    ]
  },

  resolveLoader: {
    modules: [path.resolve(nodeModulesDir)]
  }
}

module.exports = {
  distDir,
  distPath,
  srcDir,
  nodeModulesDir,
  config
}
