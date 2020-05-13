var path = require("path")
var HtmlWebpackPlugin =require("html-webpack-plugin")
module.exports = {
    // 入口
    entry: "./src/index.js",
    // 出口
    output: {
        // 输出文件名
        filename: "index.js",
        // 输出路径
        path: path.resolve(__dirname,"dist")
    },
    plugins: [
        // 插件详细配置
        new HtmlWebpackPlugin({
            // 复制"./src/index.html"文件, 并且自动引入打包输出的资源
            template: "./src/index.html"
        })
    ],
    mode: "production",
    externals: {
        // 忽略的库名 - - npm包名
        jquery:"jQuery"
    }
}