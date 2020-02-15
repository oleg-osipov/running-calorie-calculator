const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'app')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.index.html'
    })
  ],
  module: {
    rules: [
      //STYLES
      //   { test: /\.css$/, use: ['style-loader', 'css-loader'] } only css files
      {
        test: /\.s[ac]ss$/, //sass/scss
        use: [
          //3. Creates `style` nodes from JS strings
          'style-loader',
          //2. Translates CSS into CommonJS
          'css-loader',
          //1. Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    compress: true,
    host: 'localhost',
    https: false,
    open: true,
    overlay: true,
    port: 4040
  }
});
