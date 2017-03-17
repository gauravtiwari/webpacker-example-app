const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports =  {
  test: /\.(scss|sass|css)$/i,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
  })
}
