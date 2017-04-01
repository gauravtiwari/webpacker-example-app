// Common configuration for webpacker loaded from config/webpack/paths.yml

const { join, resolve } = require('path')
const { env } = require('process')
const { safeLoad } = require('js-yaml')
const { readFileSync } = require('fs')
const { getIfUtils, propIf } = require('webpack-config-utils')

const configPath = resolve('config', 'webpack')
const loadersDir = join(__dirname, 'loaders')
const { ifProduction, ifDevelopment } = getIfUtils(process.env.NODE_ENV)

const paths = safeLoad(readFileSync(join(configPath, 'paths.yml'), 'utf8'))[env.NODE_ENV]
const devServer = safeLoad(readFileSync(join(configPath, 'development.server.yml'), 'utf8'))[env.NODE_ENV]

const assetPath = propIf(env.ASSET_HOST !== undefined && ifProduction(), `${env.ASSET_HOST}/${paths.entry}/`, `/${paths.entry}/`)
const devServerUrl = `${devServer.protocol}://${devServer.host}:${devServer.port}/${paths.entry}/`
const publicPath = propIf(devServer.enabled && ifDevelopment(), devServerUrl, assetPath)

module.exports = {
  devServer,
  env,
  ifDevelopment,
  ifProduction,
  paths,
  loadersDir,
  publicPath
}
