const { environment } = require('@rails/webpacker')

const coffeeLoader = environment.loaders.get('coffee')
const babelLoader = environment.loaders.get('babel')

coffeeLoader.use = babelLoader.use.concat(coffeeLoader.use)
module.exports = environment
