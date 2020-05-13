var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var TerserWebpackPlugin = require("terser-webpack-plugin")

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
    , mode: "production"
    , optimization: {
        splitChunks: {
            chunks: "all",
            // 下方的设置都是默认值,一般不需要修改
            minSize: 30*1024, // 分割的chunk最小为30KB
            maxSize:0, // 最大没有限制
            minChunks: 1, // 要提取的chunk最少被引用一次
            maxAsyncRequests: 5 , // 按需加载时并行加载的文件的最大数量为5
            maxInitialRequests: 3, // 入口js文件最大并行数量
            automaticNameDelimiter: "~", // 文件名称连接符
            name: true, // 可以使用命名规则
            cacheGroups: {  // 分割chunk组
                // node_modules 文件会被打包到 vendors组的chunk中  vendors~xxx.js
                // 满足上面的公共规则 , 上面的规则对下方规则都生效
                vendors: {
                    test: /[\\/.]node_modules[\\/]/,
                    // 优先级
                    priority: -10
                },
                default:{
                    // 要提取的chunk最少被引用两次
                    minChunks:2,
                    // 优先级比上面的低
                    priority: -20,
                    // 如果当前要打包的模块,和之前已经被提取的模块时同一个,就会复用,而不是重新打包模块
                    reuseExistingChunk: true
                }
            }
        },
        // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
        // 解决: 修改A文件导致B文件的contenthash变化 导致缓存失效
        runtimeChunk: {name: entrypoint =>{return `runtime-${entrypoint.name}`}}
        , minimizer: [
            //配置生产环境的压缩方案 : js , css
            // 此处需要下载 terser-webpack-plugin
            new TerserWebpackPlugin({
                // 开启缓存
                cache:true,
                // 开启多进程打包
                parallel: true,
                sourceMap: true
            })
        ]
    }
}