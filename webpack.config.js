/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')


module.exports = {
  externals: {
    jquery: 'jQuery'
  },
  entry: {
    index: './src/fridgeTracker.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      loader:"file-loader",
      options:{
        name:'[name].[ext]',
        outputPath:'assets/images/'
      }
    }, {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use:  [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env'
          ]
        }
      }, {
        loader: 'eslint-loader',
        options: {
          formatter: require("eslint-friendly-formatter"),
          failOnError: true
        }
      }]
    }, { 
      test: /\.ejs$/,
      loader: 'raw-loader'
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    }),
    new HtmlWebpackPlugin({
      inlineSource: '.(js|css)$',
      template: './src/index.html'
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],
  node: {
    fs: 'empty'
  }
}