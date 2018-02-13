module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.(jpe?g|png|gif|svg)$/,
                    use: [
                        {
                            loader: require.resolve("url-loader"),
                            options: {
                                outputPath: 'assets/',
                                limit: 10000,
                                name: 'images/[name].[ext]'
                            }
                        },
                        require.resolve('img-loader')
                    ]
                }
            ]
        },
    }
};