// 下载插件  mini-css-extract-plugin
/*
* module:{
*   rules:[
*       {
*           test:/\.css$/,
*           use:[
*               // 因为style-loader会将css-loader处理过后的代码插入到html中
*               // 所以此处不适用style-loader
*               // 使用 MiniCssExtractPlugin.loader 代替style-loader  作用为提取js中的css到单独文件中 并且会引入到html中
*               MiniCssExtractPlugin.loader
*               ,"css-loader"
*           ]
*       }
*   ]
* }
*
*
* */
var {resolve} = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "js/build.js",
        path: resolve(__dirname,"dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/dist.css"
        })
    ],
    // mode: "development",
    devServer: {
        port:3000,
        contentBase:resolve(__dirname,"dist"),
        compress:true,
        // 自动打开浏览器
        open:true
    }
}