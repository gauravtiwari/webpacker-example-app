const webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: [
      '.svg',
      '.tiff',
      '.png',
      '.hola'
    ]
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest' // Runtime code
              }),

    new webpack.optimize.CommonsChunkPlugin({
            async: true,
            children: true,
            minChunks: 4
          })
  ]
}
