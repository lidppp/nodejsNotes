var express = require("express")
var app  = express()
// 通过 /public/index.js 访问  推荐使用
// app.use("/public",express.static("./public/"))

// 通过 /index.js 访问
// app.use(express.static("./public/"))

// 通过 /a/index.js 访问
app.use("/a",express.static("./public/"))

app.get("/",function (req,res) {
    res.send("hello world")
})

app.listen(3000,function () {
    console.log("服务启动成功")
})