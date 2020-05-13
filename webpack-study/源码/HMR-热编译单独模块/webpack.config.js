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
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
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
    }
}