var express = require("express")
// 调用express
var app = express()
// 公开 public文件夹
app.use("/public/", express.static("./public/"))
// 请求为/时返回
app.get("/", function (req, res) {
    res.send("<h1>你好,express<br> <a href='/about?a=1&b=2'>关于我</a> </h1>")
})
// 请求为about时返回
app.get("/about", function (req, res) {
    console.log(req.query)
    res.send(`<h3>关于我,express,req:${req.url}</h3>`)
})
// 开始监听
app.listen(3000, function () {
    console.log("服务启动")

})

var fs = require("fs")

fs.readFile("./package-lock.json", function (err, data) {
    console.log(err)
    console.log(data)
})