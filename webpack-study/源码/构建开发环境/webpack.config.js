var path = require("path")
var HtmlWebpackPlugin =require("html-webpack-plugin")
module.exports = {
    // 入口
    entry: "./src/index.js",
    // 出口
    output: {
        // 输出文件名
        filename: "./js/index.js",
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
                test:/\.(jpg|png|gif)$/,
                use:[
                    {
                        loader: "url-loader",
                        options: {
                            outputPath:"img",
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
                use:{
                    loader: "file-loader",
                    options:{
                        outputPath:"static"
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
        port:8000,
        // 项目构建后的路径
        contentBase:path.resolve(__dirname,"dist"),
        // 启用g-zip压缩
        compress:true,
        // 自动打开浏览器
        open:true
    }
}