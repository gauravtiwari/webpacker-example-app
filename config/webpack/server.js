process.env.NODE_ENV = 'development'
process.env.WEBPACKER_ASSET_HOST = 'http://localhost:3035'

const path = require('path');
const webpack = require('webpack');
const express = require('express');
const WebpackDevServer = require('webpack-dev-server');

const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');

const config = require('./development.js');
const devServer = config.devServer;

/**
 * Takes a request "/dist/file1.bundle.js"
 * returns a key from config.entry "file1.bundle"
 */
function convertReqPathToBundleName(reqPath) {
  return path.basename(reqPath).replace(path.extname(reqPath), '');
}

function createBuildOnRequestMiddleware(config) {
  // hold onto a reference to our original config.entry,
  // and clear out the entry on the config. We'll dynamically
  // re-add as needed.
  const allEntries = config.entry;
  config.entry = {};

  // Webpack validation will fail if you create a compiler with no entry
  // points, so we add the first one back in.
  const firstEntry = Object.keys(allEntries)[0];
  config.entry[firstEntry] = allEntries[firstEntry];

  delete config.devServer

  const compiler = webpack(config);
  const webpackDevServer = new WebpackDevServer(compiler, devServer);

  const devServerWrapper = express();

  /**
   * Before we hook up the webpackDevServer, we need to be sure we're
   * compiling everything needed.
   * This makes sure our compiler is in the correct state before letting
   * webpackDevServer handle all the requests.
   */
  devServerWrapper.use(function(req, res, next) {
    const entryKey = convertReqPathToBundleName(req.path);
    if(!config.entry[entryKey] && allEntries[entryKey]) {
      console.log(`Found a request for an unbuilt bundle "${entryKey}", adding to compiler: "${compiler.name}"`);
      config.entry[entryKey] = allEntries[entryKey];

      // This only works for entries that are composed of arrays.
      // { 'file1.bundle': ['...'] } vs { 'file1.bundle': '...' }
      compiler.apply(new SingleEntryPlugin(null, allEntries[entryKey], entryKey));

      // This is sort of hacky, but it was the easiest way to invalidate
      // webpack + watcher.
      webpackDevServer.middleware.invalidate();
    }
    next();
  });

  devServerWrapper.use(webpackDevServer.app);

  return devServerWrapper;
}

const app = express();

/**
 * Load the webpackDevServer as middleware in our express server.
 */
app.use(createBuildOnRequestMiddleware(config));

app.listen(devServer.port, devServer.host, () => {
  console.log(`Listening: ${devServer.host}:${devServer.port}`);
});
