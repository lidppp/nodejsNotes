var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")


module.exports = {
    entry: "./src/index.js"
    , output: {
        filename: "built.js"
        , path: path.resolve(__dirname,"dist")
        , publicPath: "/asd"
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
            ,{
                // 正则匹配文件后缀
                test:/\.js$/,
                // 排除node_modules目录下的文件
                exclude:/node_modules/,
                // 只检查src下的js文件
                include: path.resolve(__dirname,"src"),
                // 如果不写 enforce规则的话则按照顺序执行
                // 延后执行
                // enforce: "post",
                // 优先执行
                enforce: "pre",
                // 使用单个loader
                loader: "eslint-loader"
            },
            {
                // 以下loader只会生效一个
                oneOf: [
                    // XXXX
                ]
            }
        ]
    }
    , plugins: [
        new HtmlWebpackPlugin()
    ]
    , mode: "development"
}