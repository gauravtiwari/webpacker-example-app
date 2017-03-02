// Note: You must restart bin/webpack-watcher for changes to take effect

const webpack = require('webpack')
const path = require('path')
const process = require('process')
const glob = require('glob')
const extname = require('path-complete-extname')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

let distDir = process.env.WEBPACK_DIST_DIR
const devHost = process.env.DEV_HOST
const devPort = process.env.DEV_PORT

if (distDir === undefined) {
  distDir = 'packs'
}

const fileLoaderExtensions = /\.(jpe?g|png|gif|svg|eot|svg|ttf|woff|woff2)$/i
const fileLoaderConfig = {
  loader: 'file-loader',
  options: {
    publicPath: `/${distDir}/`,
    name: '[name].[ext]'
  }
}

if (devHost && devPort) {
  Object.assign(
    fileLoaderConfig.options,
    { publicPath: `http://${devHost}:${devPort}/` }
  )
}

const config = {
  entry: glob.sync(path.join('app', 'javascript', 'packs', '*.js*')).reduce(
    (map, entry) => {
      const basename = path.basename(entry, extname(entry))
      const localMap = map
      localMap[basename] = path.resolve(entry)
      return localMap
    }, {}
  ),

  output: { filename: '[name].js', path: path.resolve('public', distDir) },

  module: {
    rules: [
      { test: /\.coffee(\.erb)?$/, loader: 'coffee-loader' },
      {
        test: /\.jsx?(\.erb)?$/,
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
      },
      {
        test: fileLoaderExtensions,
        use: [fileLoaderConfig]
      },
      {
        test: /\.(sass|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new ExtractTextPlugin('[name].css'),
    new ManifestPlugin({
      fileName: 'digests.json',
      publicPath: `/${distDir}/`
    })
  ],

  resolve: {
    extensions: ['.js', '.coffee'],
    modules: [
      path.resolve('app/javascript'),
      path.resolve('node_modules')
    ]
  },

  resolveLoader: {
    modules: [path.resolve('node_modules')]
  }
}

module.exports = {
  distDir,
  devHost,
  devPort,
  fileLoaderConfig,
  fileLoaderExtensions,
  config
}
