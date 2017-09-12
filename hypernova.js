const { join } = require('path')
const hypernova = require('hypernova/server')
const renderReact = require('hypernova-react').renderReact
const { environment } = require('@rails/webpacker')
const requireFromUrl = require('require-from-url/sync')
const detect = require('detect-port')

const config = environment.toWebpackConfig()
const devServerUrl = `http://${config.devServer.host}:${config.devServer.port}`

function camelize(text) {
  const separator = '_'
  const words = text.split(separator)
  if (words.length === 0) return text.charAt(0).toUpperCase() + word.slice(1)
  let result = ''
  let i = 0

  while (i < words.length) {
    const word = words[i]
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
    result += capitalizedWord
    i += 1
  }

  return result
}

const detectPort = new Promise((resolve, reject) =>
    detect(config.devServer.port, (err, _port) => {
    if (err) {
      resolve(false)
    }

    if (config.devServer.port == _port) {
      resolve(false)
    } else {
      resolve(true)
    }
  })
)

hypernova({
  devMode: true,
  port: 3030,
  async getComponent(name) {
    const manifest = require(join(config.output.path, 'manifest.json'))
    const packName = manifest[`${name}.js`]
    const isDevServerRunning = await detectPort
    let bundle

    if (isDevServerRunning) {
      requireFromUrl(`${devServerUrl}${packName}`)
    } else {
      require(join(config.output.path, '..', manifest[`${name}.js`]))
    }

    return renderReact(name, eval(camelize(name)))
  }
})
