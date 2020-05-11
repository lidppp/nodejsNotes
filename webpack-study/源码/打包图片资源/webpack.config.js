var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  // 入口
  entry: "./src/index.js",
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
      },
      // 配置图片处理
      // 会有一个问题,可以处理css中的图片资源,但是无法处理html中的图片资源,所以在下方需要再引入一个loader
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
  mode: "development"
}