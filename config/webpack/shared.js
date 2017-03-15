// Note: You must restart bin/webpack-watcher for changes to take effect

const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const extname = require('path-complete-extname')
const { dev_server, env, paths, publicPath } = require('./configuration.js')

const config = {
  entry: glob.sync(path.join(paths.src_path, paths.dist_dir, '*.js*')).reduce(
    (map, entry) => {
      const basename = path.basename(entry, extname(entry))
      const localMap = map
      localMap[basename] = path.resolve(entry)
      return localMap
    }, {}
  ),

  output: { filename: '[name].js', path: path.resolve(paths.dist_path) },

  module: {
    rules: [
      { test: /.ts$/, loader: 'ts-loader' },
      {
        test: /.vue$/, loader: 'vue-loader',
        options: {
          loaders: { 'scss': 'vue-style-loader!css-loader!sass-loader', 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'}
        }
      },
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
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpeg|png|gif|svg|eot|svg|ttf|woff|woff2)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath,
            name: env === 'production' ? '[name]-[hash].[ext]' : '[name].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),
    new ExtractTextPlugin(
      env === 'production' ? '[name]-[hash].css' : '[name].css'
    ),
    new ManifestPlugin({
      fileName: 'manifest.json',
      publicPath: `/${paths.dist_dir}/`
    })
  ],

  resolve: {
    alias: { 'vue$':'vue/dist/vue.esm.js' },
    extensions: ['.js', '.coffee', '.ts'],
    modules: [
      path.resolve(paths.src_path),
      path.resolve(paths.node_modules_path)
    ]
  },

  resolveLoader: {
    modules: [path.resolve(paths.node_modules_path)]
  }
}

module.exports = {
  config,
  dev_server,
  env,
  paths,
  publicPath
}
