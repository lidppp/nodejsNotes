var { resolve } = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "js/[name].[contenthash:10].js",
        path: resolve(__dirname, "dist")
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })

    ],
    /*
    * 可以将node_modules中的代码单独打包成一个chunk输出
    * 自动分析多入口chunk中,有没有公共文件,如果有会打包成单独的chunk
    * */
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },

    mode: "production",
}