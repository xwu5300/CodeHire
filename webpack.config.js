const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './client/src/index.jsx',
	output: {
		path: path.join(__dirname, '/client/dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
          {
          	test: /\.jsx/,
          	exclude: /node_modules/,
          	use: {
          		loader: 'babel-loader',
          	}
          }
        ]
	},
	plugins: [
      new HtmlWebpackPlugin({
        template: './client/src/index.html'
			}),
			new UglifyJsPlugin()
	]
}
