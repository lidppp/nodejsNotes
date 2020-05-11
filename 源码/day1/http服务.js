var http = require("http") // 引入http模块
var server = http.createServer() // 创建一个web服务器
// request请求事件处理函数需要接收两个参数
// request 请求对象,承载请求中的所有参数
// response 响应对象，使用response返回响应
// 响应内容只能是字符串或者二进制数据
server.on("request", function (request, response) {
  // 当服务器接收到request请求触发回调函数,注意此处的request是固定的
  // console.log(request)
  console.log("收到收到,over.请求路径为", request.url)
  // 解决中文响应乱码
  response.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' })
  // response.write("黄鸡收到黄鸡收到")
  // 事实证明...\n没有起到任何作用
  // 可以在end中直接返回数据
  switch (request.url) {
    case "/":
    case "/index":
      response.end("首页")
      // response.write("首页");
      break;
    case "/login":
      response.end("登录")
      // response.write("登录");
      break;
    case "/about":
      response.end("关于我")
      // response.write("关于我");
      break;
    default:
      response.end("404")
  }
  // response.end()
})
// 绑定端口号,启动服务器,回调函数是服务启动成功进行调用
server.listen(8080, function () {
  console.log("服务器启动成功")
})