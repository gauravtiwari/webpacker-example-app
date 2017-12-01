const environment = require('./environment')

environment.config.devtool = 'cheap-module-source-map'
module.exports = environment.toWebpackConfig()
