const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { vendor, app } = require('./webpack.vars')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.ts'
  },
  devtool: 'cheap-module-source-map',

  output: {
    path: app.buildPath,
    chunkFilename: '[name].js'
    // filename: 'index.js'
  },

  devServer: {
    static: {
      directory: app.staticPath
    },
    open: true,
    compress: false,
    port: 9100
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              presets: ['@babel/typescript', '@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
            }
          }
        ],
        include: /src/
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: /src/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: vendor.manifestPath,
      scope: 'xyz',
      sourceType: 'commonjs2'
    }),
    new ESLintPlugin({ emitError: true, emitWarning: true, outputReport: true, files: 'src/**' }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/static/index.html'
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      hidePathInfo: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
          priority: -10,
          reuseExistingChunk: true
        },
        shared: {
          chunks: 'all',
          priority: -20,
          minChunks: 2,
          name: 'shared'
        }
      }
    }
  }
}
