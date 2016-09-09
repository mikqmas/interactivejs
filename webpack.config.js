// webpack.config.js

var webpack = require('webpack');

var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  entry: "./javascripts/entry.jsx",
  output: {
    path: "./",
    filename: PROD ? 'bundle.min.js' : 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: { warnings: false }
    })
  ] : []
};
