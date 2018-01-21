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
                                name: 'fonts/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
    }
};