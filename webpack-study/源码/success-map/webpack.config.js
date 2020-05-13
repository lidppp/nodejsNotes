var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    // 入口
    entry: ["./src/index.js", "./src/index.html"],
    // 出口
    output: {
        // 输出文件名
        filename: "index.js",
        // 输出路径
        path: path.resolve(__dirname, "dist")
    },
    // 配置loader
    module: {
        // 注意 这里的loader都需要下载
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            outputPath: "img",
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
            {
                test: /\.html$/,
                use: [
                    "html-loader"
                ]
            },
            {
                exclude: /\.(jpg|png|gif|css|scss|html|js)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: "static"
                    }
                },
            }
        ]
    },
    plugins: [
        // 插件详细配置
        new HtmlWebpackPlugin({
            // 复制"./src/index.html"文件, 并且自动引入打包输出的资源
            template: "./src/index.html"
        })
    ],
    mode: "development",
    // 开发服务器 热编译 自动刷新
    // 只会在内存中编译打包,不会有本地输出
    // 启动devServer指令为 npx webpack-dev-server
    // 需要下载 webpack-dev-server
    devServer: {
        // 端口号
        port: 8000,
        // 项目构建后的路径
        contentBase: path.resolve(__dirname, "dist"),
        // 启用g-zip压缩
        compress: true,
        // 自动打开浏览器
        open: true,
        // 开启HMR功能
        // 当修改了webpack配置,新配置要想生效,必须重启webpack配置
        hot: true
    },
    devtool: "source-map"
}
/**
 * devtool的值有以下几种
 * 注意: 以下中括号可以随意组合
 * [inline- | hidden- | eval-][nosources-][cheap-[module-]]source-map
 *
 * source-map: 外部
 *      错误代码的准确信息和原代码精确到错误行和列
 *
 * inline-source-map:内联  会在打包后的出口文件中生成一个内联source-map base64编码
 *      1.只生成一个内联的source-map
 *      错误代码的准确信息和原代码精确到错误行和列
 *
 * hidden-source-map:外部
 *      错误代码的准确信息
 *      但是没有错误位置(错误位置提示的是build后的位置),无法追踪到原代码的位置
 *
 * eval-source-map:内联
 *      每一个文件都生成一个source-map并且都在eval函数
 *      错误代码的准确信息和原代码精确到错误行和列(会多一个哈希值)
 *
 * nosources-source-map: 外部
 *      错误代码的准确信息和原代码精确到错误行和列
 *      但是无法看到原代码信息(隐藏原代码,安全性)
 *
 * cheap-source-map:外部
 *      错误代码的准确信息和原代码精确到错误行(只精确到行而不是列)
 *      cheap会提示一整行都报错了,但是其他的会提示更加准确的报错位置
 *
 * cheap-module-source-map:外部
 *      错误代码的准确信息和原代码精确到错误行(只精确到行而不是列)
 *      会将loader的source-map加入
 *
 * 内联和外部的区别:1.外部的生成了文件,内联没有 2.内联的构建速度更快
 *
 *
 * 开发环境下  速度要快,调试要友好
 *            速度排行 eval>inline>cheap
 *            最快的是 eval-cheap-source-map
 *            调试友好 source-map
 *                    cheap-module-source-map
 *                    cheap-source-map
 *            --> eval-source-map / eval-cheap-module-source-map
 * 生产环境下  原代码要不要隐藏,调试要达到那个程度
 *            内联会让代码体积变得很大,所以内联的方式直接排除掉
 *              hidden-source-map  只隐藏原代码会提示构建前代码错误信息
 *              nosources-source-map  全部隐藏
 *            --> source-map / cheap-module-source-map
 */