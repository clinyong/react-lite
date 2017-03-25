var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  entry: {
    app: './index.tsx'
  },
  output: {
    filename: '[name].js',
    publicPath: config.assetsPublicPath
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        },
        exclude: /node_modules/,
      }
    ]
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
}
