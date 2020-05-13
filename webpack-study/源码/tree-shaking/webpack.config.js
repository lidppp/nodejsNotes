var { resolve } = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var MiniCssExtractPlugin = require("mini-css-extract-plugin")

/**
  tree shaking: 去除无用代码
    前提: 1.必须使用ES6模块化 2.开启production环境(生产环境)

    在package.json中配置:
        "sideEffects":false 所有代码都没有副作用(都可以进行 tree shaking) 
            问题: 可能会把css / @bable/polyfill 文件干掉

        "sideEffects":["*.css"] // 标记为不要被干掉的包,不进行tree shaking
 */

// 修改环境为开发环境
// process.env.NODE_ENV = "development"
var cssComm = [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
        // 修改loader的配置
        loader: "postcss-loader",
        options: {
            ident: "postcss",  // 固定值
            plugins: () => [
                // postcss的插件
                require("postcss-preset-env")()
            ]
        }
    },
]
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "js/build.[contenthash:10].js",
        path: resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // 不检查node_modules目录下的文件
                loader: "eslint-loader",
                enforce: "pre",
                options: {
                    fix: true //开启自动修复
                }
            },
            {
                // 以下loader只会匹配一个
                // 注意 不能同时有两个配置处理同一类文件
                oneOf: [
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
                                        useBuiltIns: "usage",
                                        // 指定corejs版本
                                        corejs: {
                                            version: 3
                                        },
                                        // 指定浏览器版本
                                        targets: {
                                            chrome: "60",
                                            firefox: "60",
                                            ie: "9",
                                            safari: "10",
                                            edge: "17"
                                        }
                                    }]
                            ],
                            // 开启bable缓存
                            // 第二次构建的时候会读取之前的缓存
                            cacheDirectory: true
                        }
                    },
                    {
                        test: /\.css$/,
                        use: [
                            ...cssComm
                        ]
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            ...cssComm,
                            "sass-loader"
                        ]
                    },
                    {
                        test: /.(jpg|png|gif)$/,
                        // 此处需要下载 file-loader  url-loader
                        use: [
                            {
                                loader: "url-loader",
                                options: {
                                    limit: 8 * 1024,
                                    // 因为html-loader引入图片采用的是commonjs(require)  而 url-loader采用的是es6(import)
                                    // 所以解析是会出现个问题  html中的<img src="[object Module]" alt="">
                                    // 解决方法 : 关闭url-loader中的es6解析
                                    esModule: false,
                                    // hash:10  取图片hash值的前十位
                                    // . 还是那个点
                                    // [ext]  文件原后缀名
                                    name: '[hash:10].[ext]'
                                }
                            }
                        ]
                    },
                    // html-loader 处理html中的image文件,负责image文件的引入 从而能够被url-loader处理
                    {
                        test: /.html$/,
                        use: "html-loader"
                    },
                    {
                        exclude: /.(jpg|png|gif|html|scss|css|js)$/,
                        loader: "file-loader"
                    }]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/dist.[contenthash:10].css"
        }),

    ],
    mode: "production",
    devServer: {
        port: 3000,
        contentBase: resolve(__dirname, "dist"),
        compress: true,
        // 自动打开浏览器
        open: true
    }
}