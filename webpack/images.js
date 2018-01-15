module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.(jpe?g|png|gif|svg|woff|woff2)$/,
                    loaders: [
                        {
                            loader: "file-loader",
                            options: {
                                name: 'images/[name].[ext]'
                            }
                        },
                        'img-loader'
                    ]
                }
            ]
        },
    }
};