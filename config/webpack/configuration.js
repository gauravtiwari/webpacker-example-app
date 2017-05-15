// Common configuration for webpacker loaded from config/webpack/configuration.yml

const { join, resolve } = require('path')
const { env } = require('process')
const { safeLoad } = require('js-yaml')
const { readFileSync } = require('fs')

const configPath = resolve('config', 'webpack')
const loadersDir = join(__dirname, 'loaders')
const { devServer, paths } = safeLoad(readFileSync(join(configPath, 'configuration.yml'), 'utf8'))[env.NODE_ENV]

const publicPath = env.NODE_ENV !== 'production' && devServer.enabled ?
  `//${devServer.host}:${devServer.port}/${paths.entry}/` : `/${paths.entry}/`

module.exports = {
  devServer,
  env,
  paths,
  loadersDir,
  publicPath
}
