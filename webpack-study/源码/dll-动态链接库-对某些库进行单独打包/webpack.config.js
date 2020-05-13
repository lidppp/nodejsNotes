var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var webpack = require("webpack")
var AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        // 告诉webpack 那些库不参与打包,同时使用时的名称也得改
        // 所以,不需要加extrnals
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, "dll/manifest.json")
        }),
        // 将某个文件打包输出出去,并且在html中自动引入该资源
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, "dll/jquery.js")
        })
    ],
    mode: "production"
}