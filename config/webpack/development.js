// config/webpack/development.js
const environment = require('./environment')

const config = environment.toWebpackConfig()
config.devServer.watchContentBase = false
config.devServer.disableHostCheck = true

module.exports = config
