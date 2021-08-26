const webpack = require('webpack')
const path = require('path')
const { vendor } = require('./webpack.vars')

console.log(vendor)
module.exports = {
  mode: 'development',
  entry: {
    vendor: path.join(vendor.srcPath, '/vendor.js')
  },
  output: {
    path: vendor.buildPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_[fullhash]',
      path: vendor.manifestPath
    })
  ]
}
