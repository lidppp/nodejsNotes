var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")


module.exports = {
    entry: "./src/index.js"
    , output: {
        // 输出文件名称 可以使用 js/built.js 指定目录
        filename: "built.js"
        // 输出文件目录(将来所有资源输出的公共目录)
        , path: path.resolve(__dirname,"dist")
        // 所有引入的资源的公共路径的前缀 -> 输出路径的前面 -> 默认为 "img/a.png" ==> "/images/a.png"
        // 如果按照下方这么写的话 输出为  /asd/built.js
        , publicPath: "/asd"
        // 非入口chunk的名称
        /*
        * 通过import()分割出来的chunk
        * 通过optimization分割出来的chunk
        * */
        // 此处的name 为chunk的name  为 0,1,2.....
        , chunkFilename: "[name]_chunk.js"
        // 将整个库内容暴露出去给外部使用
        , library: "[name]"
        // 适用于浏览器  意思是将这个文件模块挂载到window下
        // 如果是服务端(nodejs)  libraryTarget: "global"
        // 如果是libraryTarget: "commonjs" 是通过commonjs的规则暴露出去
        // 一般情况下是结合dll将某个库单独打包出去,正常打包不需要library
        , libraryTarget: "window"
    }
    , plugins: [
        new HtmlWebpackPlugin()
    ]
    , mode: "development"
}