let webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

module.exports = {
	entry: PATHS.source + "/main.js",
	output: {
		path: PATHS.dist,
		filename: "bundle.js"
        //publicPath: "/js"
    },
	module: {
		rules: [
            {
                test: /\.pug$/,
                loader: "pug-loader",
                options: {
                    pretty: true
                }
            },
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
		}),
        new HtmlWebpackPlugin({
            template: PATHS.source + '/index.pug'
        })
	],
    devServer: {
	    hot: true
    }
};