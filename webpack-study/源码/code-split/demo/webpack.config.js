var { resolve } = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        index: "./src/index.js",
        test: "./src/test.js"
    },
    output: {
        filename: "js/[name].[contenthash:10].js",
        path: resolve(__dirname, "dist")
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })

    ],
    optimization: {
        splitChunks:  {
            chunks: "all"
        }
    },
    mode: "production",
}