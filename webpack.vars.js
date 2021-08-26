const path = require('path')

const srcDir = 'src'
const buildDir = 'build'
const appDir = 'app'
const vendorDir = 'vendor'
const staticDir = 'static'
const distDir = 'dist'

module.exports = {
  app: {
    srcDir: srcDir,
    srcPath: path.resolve(__dirname, srcDir),
    staticPath: path.resolve(__dirname, staticDir),
    buildPath: path.resolve(__dirname, buildDir, appDir)
  },
  vendor: {
    srcDir: vendorDir,
    srcPath: path.resolve(__dirname, srcDir, vendorDir),
    buildPath: path.resolve(__dirname, buildDir, vendorDir),
    manifestPath: path.resolve(__dirname, buildDir, vendorDir, 'manifest.json')
  },
  dist: {
    dirName: distDir,
    buildPath: path.resolve(__dirname, distDir)
  }
}
