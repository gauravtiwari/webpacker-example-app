const dll = require('@rails/webpacker/package/environments/dll')

const dllContructor = new dll()
const config = dllContructor.toWebpackConfig()

config.entry = {
  vendor: [
    'react',
    'react-dom',
    'prop-types',
    'vue',
    'hypernova-react'
  ]
}

module.exports = config
