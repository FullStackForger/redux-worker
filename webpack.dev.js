const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.ts'
  },
  devtool: 'cheap-module-source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].js'
    // filename: 'index.js'
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
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
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      hidePathInfo: false,
      name: 'common'
    }
  },
  plugins: [
    new ESLintPlugin({ emitError: true, emitWarning: true, outputReport: true, files: 'src/**' }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/static/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}
