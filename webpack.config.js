let webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const css = require('./webpack/css');
const devserver = require('./webpack/devserver');

const PATHS = {
    source: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + "/pages/index/index.js",
            'blog': PATHS.source + "/pages/blog/blog.js"
        },
        output: {
            path: PATHS.dist,
            filename: "[name].js"
            //publicPath: "/js"
        },
        module: {
            rules: [
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
                filename: 'index.html',
                chunks: ['index'],
                template: PATHS.source + '/pages/index/index.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'blog.html',
                chunks: ['blog'],
                template: PATHS.source + '/pages/blog/blog.pug'
            })
        ]
    },
    pug(),
    css()
]);

module.exports = function (env) {
    if(env === 'production') {
        return common
    }
    if(env === 'development') {
        return merge([

            common,
            devserver()
        ])
    }
};