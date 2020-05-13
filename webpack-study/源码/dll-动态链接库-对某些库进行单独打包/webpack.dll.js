/*
* 使用dll技术,对某些第三方库进行单独打包
* 当去运行webpack时,默认查找的是webpack.config.js
*
* 所以运行的时候需要运行 webpack --config webpack.dll.js
* */
var {resolve} = require("path")
var webpack = require("webpack")
module.exports = {
    // 下方两个配置是专门用来打包jQuery的 jQuery的名称是jQuery_hash.js
    entry:{
        // 最终打包生成的name -> jquery
        // ["jQuery"]  要打包的库是 jQuery
        jquery:["jquery"]
    },
    output: {
        filename: "[name].js",
        path: resolve(__dirname,"dll"),
        library: "[name]_[hash:8]", // 打包的库向外暴露的名字是什么名字
    },
    plugins: [
        // 打包生成一个manifest.json文件 --> 提供和jQuery的映射关系
        new webpack.DllPlugin({
            name:"[name]_[hash:8]", // 映射库的暴露的名称
            path: resolve(__dirname,"dll/manifest.json") // 输出文件路径
        })
    ],
    mode: "production"
}