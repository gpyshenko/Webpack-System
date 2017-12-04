let webpack = require('webpack');
let path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: "./src/js/main.js",
	output: {
		path: path.resolve(__dirname, "./dist/js"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
    plugins: [
        new UglifyJsPlugin({
            parallel: true
		})
	]
};