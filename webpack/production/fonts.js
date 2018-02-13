module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.(woff|woff2)$/,
                    use: [
                        {
                            loader: require.resolve('file-loader'),
                            options: {
                                outputPath: 'assets/',
                                name: 'fonts/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
    }
};