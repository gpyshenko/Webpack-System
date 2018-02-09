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

            ]
        },
        plugins: [
            new UglifyJs({
                parallel: true
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: PATHS.source + '/pug/pages/index/index.pug'
            })
        ]
    },
    pug(),
    images(),
    fonts()
]);

module.exports = function (env) {
    if(env === 'development') {
        return merge([
            common,
            {
                module: {
                    rules: [
                        {
                            test: /\.css$/,
                            use: [
                                'style-loader',
                                'css-loader',
                                "postcss-loader"

                            ]

                        }
                    ]
                }
            },
            devserver()
        ])
    }
    if(env === 'production') {
        return merge([
            common,
            {
                module: {
                    rules: [
                        {
                            test: /\.css$/,
                            use: ExtractTextPlugin.extract({
                                publicPath: '../',
                                fallback: 'style-loader',
                                use: [
                                    {
                                        loader: 'css-loader',
                                        options: {
                                            minimize: true
                                        }
                                    },
                                    "postcss-loader"
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
                    new ExtractTextPlugin('./css/[name].css')
                ]
            }
        ])
    }

};