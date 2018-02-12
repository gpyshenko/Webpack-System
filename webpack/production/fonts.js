module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.(woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
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