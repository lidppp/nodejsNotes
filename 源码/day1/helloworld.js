var log = "hello world";
console.log(log);
var http = require("http");
var serve = http.createServer();
serve.on("request", function (req, res) {
    res.writeHead(200, {"content-type": "application/json;charset=utf-8"});
    res.end("收到")
});
serve.listen(8080, function () {
    console.log("服务器已启动")
});
