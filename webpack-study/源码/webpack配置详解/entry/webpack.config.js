var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")

/**
 * entry 入口起点
 * String: "./src/js/index.js" -> 指向js文件作为入口,打包形成一个chunk输出一个bundle文件此时chunk的name默认为main
 *
 * Array: ["./src/js/index.js","./src/js/add.js"] -> 多入口 , 所有入口文件只会形成一个chunk , 输出出去的文件只会形成一个bundle , chunk的name默认为main
 *      通常来讲只有在HMR功能中让HTML热更新生效
 *
 * Object: {main:"./src/js/index.js",add:"./src/js/add.js"} -> 多入口, 有几个入口文件形成几个chunk 同时输出几个bundle , 同时chunk的name为key
 *      特殊用法
 *      {main:["./src/js/index.js","./src/js/add.js"],add:"./src/js/add.js"}
 *
 * */
module.exports = {
    entry: "./src/js/index.js"
    , output: {
        filename: "built.js"
        , path: path.resolve(__dirname,"dist")
    }
    , plugins: [
        new HtmlWebpackPlugin()
    ]
    , mode: "development"
}