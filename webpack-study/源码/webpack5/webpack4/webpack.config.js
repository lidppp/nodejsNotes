var path = require("path")
var htmlPlugin = require("html-webpack-plugin")
module.exports = {
    entry: "./src/index.js"
    , output: {
        filename: "[name].js",
        path:path.resolve(__dirname,"build")
    },
    plugins: [
        new htmlPlugin()
    ]
    , mode: "production"
}