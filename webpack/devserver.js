module.exports = function () {
    return {
        devServer: {
            hot: true,
            stats: 'errors-only',
            port: 9000
        }
    }
};