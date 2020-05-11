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

// 修改环境为开发环境
process.env.NODE_ENV = "development"
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
                    "css-loader",

                    /**
                     * css兼容性处理需要用到 postcss
                     * 在websocket中使用的话需要用到 postcss-loader
                     * 还需要一个插件 postcss-preset-env  这个插件可以帮助postcss识别使用环境 从而精确到兼容ie几
                     *
                     *
                     *帮postcss找到package.json中browserslist里面的配置,通过配置加载指定的css兼容性样式
                        // 可以去GitHub上面找  browserslist 搜详细配置
                      "browserslist":{
                            // 开发环境
                            // 需要设置nodejs的环境变量
                            // 在本文件的上方
                            // process.env.NODE_ENV = "development"
                          "development":[
                              "last 1 chrome version",  // 最后一个版本的谷歌浏览器
                              "last 1 firefox version", // 最后一个版本的火狐浏览器
                              "last 1 safari version"   // 最后一个版本的苹果浏览器
                          ],
                          // 生产环境  默认看生产环境
                          "production":[
                              ">0.2%", // 用户>0.2%的浏览器
                              "not dead",  // 不要已经去世的浏览器
                              "not op_mini all"  // 不要op_mini浏览器全部版本
                          ]
                      }
                     */
                    {
                        // 修改loader的配置
                        loader: "postcss-loader",
                        options: {
                            ident:"postcss",  // 固定值
                            plugins:()=>[
                                // postcss的插件
                                require("postcss-preset-env")()
                            ]
                        }
                    },

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
        }),

    ],
    mode: "production",
    devServer: {
        port:3000,
        contentBase:resolve(__dirname,"dist"),
        compress:true,
        // 自动打开浏览器
        open:true
    }
}