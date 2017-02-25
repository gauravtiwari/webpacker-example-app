// Note: You must restart bin/webpack-watcher for changes to take effect

const webpack = require('webpack')
var merge   = require('webpack-merge');
const path = require('path')
const process = require('process')
const glob = require('glob')
const extname = require('path-complete-extname')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const isDevServer = process.argv.find(v => v.includes('webpack-dev-server'));
let distDir = process.env.WEBPACK_DIST_DIR

if (distDir === undefined) {
  distDir = 'packs'
}

const fileLoaderConfig = {
  loader: 'url-loader',
  options: {
    limit: 3000,
    publicPath: `/${distDir}/`,
    name: '[name].[ext]',
  }
}

if (isDevServer) {
  Object.assign(
    fileLoaderConfig.options,
    { publicPath: 'http://localhost:8080/' }
  )
}

config = {
  entry: glob.sync(path.join('app', 'javascript', 'packs', '*.js*')).reduce((map, entry) => {
    const basename = path.basename(entry, extname(entry))
    map[basename] = path.resolve(entry)
    return map
  }, {}),

  output: {
    filename: '[name].js',
    path: path.resolve('public', distDir),
  },

  module: {
    rules: [
      { test: /\.coffee(\.erb)?$/, loader: "coffee-loader" },
      {
        test: /\.js(\.erb)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [ 'latest', { 'es2015': { 'modules': false } } ]
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
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [fileLoaderConfig],
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new ExtractTextPlugin('[name].css')
  ],

  resolve: {
    extensions: [ '.js', '.coffee' ],
    modules: [
      path.resolve('app/javascript'),
      path.resolve('node_modules')
    ]
  },

  resolveLoader: {
    modules: [ path.resolve('node_modules') ]
  }
}

module.exports = {
  distDir,
  config,
  fileLoaderConfig,
}
