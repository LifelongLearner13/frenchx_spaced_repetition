var path = require('path');
require('dotenv').config();
var webpack = require('webpack');
var packageData = require('./package.json');
var filename = [packageData.name, packageData.version, 'js'];

module.exports = {
  entry: path.resolve(__dirname, 'frontend/src/js/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'frontend/build/js'),
    filename: filename.join('.')
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
        'DOMAIN': JSON.stringify(process.env.DOMAIN),
      }
    })
  ]
};
