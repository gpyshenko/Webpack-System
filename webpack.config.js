const webpack = require('webpack');
const path = require('path');
const UglifyJs = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const images = require('./webpack/images');

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
            filename: "js/[name].js"
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'postcss-loader'
                        ]
                    })
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                }
            ]
        },
        plugins: [
            new UglifyJs({
                parallel: true
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATHS.source + '/pages/index/index.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'blog.html',
                chunks: ['blog', 'common'],
                template: PATHS.source + '/pages/blog/blog.pug'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            }),
            new ExtractTextPlugin('./css/[name].css')
        ]
    },
    pug(),
    images()
]);

module.exports = function (env) {
    if(env === 'production') {
        return merge([
            common
        ])
    }
    if(env === 'development') {
        return merge([
            common,
            devserver()
        ])
    }
};