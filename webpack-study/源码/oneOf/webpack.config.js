var { resolve } = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var MiniCssExtractPlugin = require("mini-css-extract-plugin")

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
        filename: "js/build.js",
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
                oneOf: [{
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
                        ]
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
            filename: "css/dist.css"
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