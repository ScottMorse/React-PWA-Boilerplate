const path = require('path');
const webpack = require('webpack');
const workboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './client/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'client')
    },
    { 
      test: /\.css$/, 
      include: path.join(__dirname, 'client'),
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.(png|jpg)$/,
      include: path.join(__dirname, 'client'),
      loader: 'url-loader'
    }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new workboxPlugin.InjectManifest({
      swSrc: './sw.js',
      swDest: path.join(__dirname, 'dist/sw.js')
    })
  ]
};
