const environment = require('./environment')
const path = require('path')
const { config: webpackerConfig } = require('@rails/webpacker')

environment.config.devtool = 'cheap-eval-source-map'
environment.config.output.filename = '[name].js'
module.exports = environment.toWebpackConfig()
