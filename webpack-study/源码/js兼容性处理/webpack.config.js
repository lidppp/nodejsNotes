const {resolve} = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/index.js",
        path: resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    // 预设: 指示babel做怎样的兼容性处理  下方是基本兼容性处理
                    // 只能做普通的兼容性处理 无法处理如promise等等
                    // 全部兼容性处理 使用 @babel/polyfill
                    // 这个包会将所有兼容处理引入,体积太大
                    // 所以我们需要做按需加载 core-js包

                    presets: [
                        // 注意此处有个中括号
                        ["@babel/preset-env",
                        {
                            // 按需加载
                            useBuiltIns:"usage",
                            // 指定corejs版本
                            corejs:{
                                version:3
                            },
                            // 指定浏览器版本
                            targets:{
                                chrome:"60",
                                firefox:"60",
                                ie:"9",
                                safari:"10",
                                edge:"17"
                            }
                        }]
                    ]
                }
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    mode: "development"
}