var { resolve } = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var WorkboxWebpackPlugin = require("workbox-webpack-plugin")

/**
 * PWA: 渐进式网络开发应用程序(离线可访问技术)
 *  主要是通过 workbox来实现,在webpack中需要使用 workbox-webpack-plugin
 */
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "js/[name].[contenthash:10].js",
        path: resolve(__dirname, "dist")
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            skipWaiting: true, // 强制等待中的 Service Worker 被激活
            clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
        })
    ],
    /*
    * 可以将node_modules中的代码单独打包成一个chunk输出
    * 自动分析多入口chunk中,有没有公共文件,如果有会打包成单独的chunk
    * */
    // optimization: {
    //     splitChunks: {
    //         chunks: "all"
    //     }
    // },

    mode: "production",
}