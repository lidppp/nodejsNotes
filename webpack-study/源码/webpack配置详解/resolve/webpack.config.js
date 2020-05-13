var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")


module.exports = {
    entry: "./src/index.js"
    , output: {
        filename: "built.js"
        , path: path.resolve(__dirname,"dist")
        // , publicPath: "/asd"
        , chunkFilename: "[name]_chunk.js"
        , library: "[name]"
        , libraryTarget: "window"
    }
    , module: {
        rules: [
            // loader的配置
            {
                // 正则匹配文件后缀
                test:/\.css$/,
                // 使用多个loader
                use:["style-loader","css-loader"]
            }
            ]
    }
    , plugins: [
        new HtmlWebpackPlugin()
    ]
    , mode: "development"
    // 解析模块的[路径]规则
    , resolve: {
        // 配置解析模块路径别名: 帮助简写别名
        // 优点: 简写路径  缺点: 写路径时没有提示了
        alias: {
            $css:path.resolve(__dirname,"src/css")
        },
        // 配置省略文件路径的后缀名
        // 默认为 [".js",".json"]
        // 就是为什么写import的时候可以省略 .js后缀名
        // 找文件的顺序按照数组下标走 如果同一文件夹下 既有index.js 又有index.css的话 import "index" 找到的必然是两次index.js
        extensions: [".js",".json",".css"],
        // 告诉webpack 解析模块时去找那个目录
        modules: [path.resolve(__dirname,"../../node_modules"),"node_modules"]

    }
}