var os = require("os")

// 获取cpu信息
// console.log(os.cpus())

// 获取内存信息
console.log(os.totalmem() / 1024 / 1024 / 1024)

var path = require("path")

console.log(path.extname("./hello你好.txt"))

/*nodejs自带的模块：path*/
var path=require('path');

//获取文件的后缀名
var extname=path.extname("123.html");

//打印出来
console.log(extname);