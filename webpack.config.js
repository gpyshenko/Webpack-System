const webpack = require('webpack');
const path = require('path');
const UglifyJs = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

const PATHS = {
    source: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

const common = merge([
    {
        entry: {
            'main': PATHS.source + "/js/main.js"
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
                //chunks: ['common'],
                template: PATHS.source + '/pug/pages/index/index.pug'
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'common'
            // }),
            new ExtractTextPlugin('./css/[name].css')
        ]
    },
    pug(),
    images(),
    fonts()
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