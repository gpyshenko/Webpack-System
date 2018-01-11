module.exports = function (paths) {
    return {
        test: /\.css$/,
        include: paths,
        use: [
            'style-loader',
            'css-loader',
            'postcss-loader'
        ]
    }
};