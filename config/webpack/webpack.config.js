const merge = require('webpack-merge')
module.exports = {
  webpack: (webpackConfig,  { ifDevelopment, ifProduction, ifTest, env }) => {
    if (ifDevelopment()) {
      const reactHotClient = ['react-hot-loader/patch']
      Object.keys(webpackConfig.entry).forEach((key) => {
        webpackConfig.entry[key] = reactHotClient.concat(webpackConfig.entry[key]);
      })
    }
    // Important: return the new webpackConfig
    return webpackConfig
  }
}
