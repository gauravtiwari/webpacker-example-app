const path = require('path')
const { env } = require('../configuration.js')

const elmSource = path.resolve(process.cwd())
const pathMake = `${elmSource}/node_modules/.bin/elm-make`

const loaderOptions = () => {
  if (env.NODE_ENV === 'production') {
    return `elm-webpack-loader?cwd=${elmSource}&pathToMake=${pathMake}`
  }

  return `elm-hot-loader!elm-webpack-loader?cwd=${elmSource}&verbose=true&warn=true&debug=true&pathToMake=${pathMake}`
}

module.exports = {
  test: /\.elm$/,
  exclude: [/elm-stuff/, /node_modules/],
  loader: loaderOptions()
}
