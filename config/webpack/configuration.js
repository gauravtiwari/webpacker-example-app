// Common configuration for webpacker loaded from config/webpacker.yml

const path = require('path')
const process = require('process')
const yaml = require('js-yaml')
const fs = require('fs')

const env = process.env.NODE_ENV
const configuration = fs.readFileSync(path.resolve('config', 'webpacker.yml'), 'utf8')
const { paths, dev_server } = yaml.safeLoad(configuration)[env]
const publicPath = env !== 'production' && dev_server.enabled ?
              `http://${dev_server.host}:${dev_server.port}/` : `/${paths.dist_dir}/`

module.exports = {
  dev_server,
  env,
  paths,
  publicPath
}
