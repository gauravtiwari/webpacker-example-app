const environment = require('./environment')
const webpack = require('webpack')

const config = environment.toWebpackConfig()
config.devtool = 'none'
config.devServer.useLocalIp = true
module.exports = config
