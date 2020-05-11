const {resolve}  = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/index.js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // 不检查node_modules目录下的文件
                loader: "eslint-loader",
                options:{
                    fix:true //开启自动修复
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}