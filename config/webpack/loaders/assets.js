const { ifProduction, publicPath } = require('../configuration.js')

module.exports = {
  test: /\.(jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
  use: [{
    loader: 'file-loader',
    options: {
      publicPath,
      name: ifProduction('[name]-[hash].[ext]', '[name].[ext]')
    }
  }]
}
