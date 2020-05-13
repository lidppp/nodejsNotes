var path = require("path")
var HtmlWebpackPlugin =require("html-webpack-plugin")
module.exports = {
    // 入口
    entry: "./src/index.js",
    // 出口
    output: {
        // 输出文件名
        filename: "index.js",
        // 输出路径
        path: path.resolve(__dirname,"dist")
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
        port:8000,
        // 运行代码的目录
        contentBase:path.resolve(__dirname,"dist"),
        // 监视contentBase目录下的所有文件,一旦文件变化就会reload
        watchContentBase:true,
        watchOption:{
            // 忽略文件
            ignored:/node_modules/
        }
        // 启用g-zip压缩
        ,compress:true,
        // 自动打开浏览器
        open:true,
        // 指定域名
        host:"localhost",
        // 开启HMR功能
        hot: true,
        // 不要显示启动服务器的日志信息
        clientLogLevel: "none",
        // 出了基本的启动信息以外,其他内容都不要打印
        quiet: true,
        // 如果出现错误不要全屏提示
        overlay:false,
        // 服务器代理 -> 解决开发环境下跨域问题
        proxy:{
            "/api":{
                target:"http://localhost:3000",
                pathRewrite:{
                    // 发送请求时路径重写  将/api/xxx -> /xxx
                    "^/api":""
                }
            }
        }
    }
}