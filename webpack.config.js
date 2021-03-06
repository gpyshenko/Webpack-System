const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJs = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const images = require('./webpack/production/images');
const fonts = require('./webpack/production/fonts');

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
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: PATHS.source + '/pug/pages/index/index.pug'
            })
        ]
    },
    pug()
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
                                require.resolve('style-loader'),
                                require.resolve('css-loader'),
                                require.resolve("postcss-loader")
                            ]

                        },
                        {
                            test: /\.(jpe?g|png|gif|svg|woff|woff2)$/,
                            use: [require.resolve('file-loader')]
                        }
                    ]
                },
                plugins: [

                ]
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
                                fallback: require.resolve('style-loader'),
                                use: [
                                    {
                                        loader: require.resolve('css-loader'),
                                        options: {
                                            minimize: true
                                        }
                                    },
                                    require.resolve("postcss-loader")
                                ]
                            })
                        },
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            loader: require.resolve("babel-loader")
                        }
                    ]
                },
                plugins: [
                    new CleanWebpackPlugin(['dist']),
                    new UglifyJs({
                        parallel: true
                    }),
                    new ExtractTextPlugin('./css/[name].css')
                ]
            },
            images(),
            fonts()
        ])
    }

};