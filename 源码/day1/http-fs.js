var http = require("http")
var fs = require("fs")
var {type} = require("./contentType")
var path = require('path');
// 创建http服务
var server = http.createServer()

// 监听请求
server.on("request", function (req, res) {
    // 通过路径来判断
    var url = req.url
    if (url === "/") {
        var data = readfile("/main.html")
        console.log(data)
        res.writeHead(200, data.head)
        res.end(data.data)
    } else if (url === "/favicon.ico") {
        res.end()
    } else {
        var data = readfile(url)
        res.writeHead(200, data.head)
        res.end(data.data)
    }
})

server.listen(3000, function () {
    console.log('服务启动成功')

})

function readfile(url) {
    var rurl = './resource' + url
    var obj = {}
    try {
        var data = fs.readFileSync(rurl)
        var typeext = path.extname(rurl);
        var typestr = type[typeext] ? type[typeext] : type['other']
        console.log(typestr)

        obj.head = {"Content-Type": typestr + '; charset=utf-8'}
        obj.data = data
    } catch (e) {
        obj.head = {"Content-Type": "text/plain; charset=utf-8"}
        obj.data = "文件不存在或路径错误"
    }
    return obj;
}