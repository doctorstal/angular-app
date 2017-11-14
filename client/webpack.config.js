const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './src/app/app.ts',
    vendor: './vendor/vendor-imports.ts'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: 'html-loader?exportAsEs6Default',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.html' ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]
};