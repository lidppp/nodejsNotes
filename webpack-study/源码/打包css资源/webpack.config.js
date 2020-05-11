var path = require("path")

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

    ],
    mode: "development"
}