var path = require("path")
var express = require("express")
var bodyParser = require('body-parser');/*post方法*/
var router = require("./router")


var app = express()
// 配置post请求
app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({extended: false}));

//配置公开public文件夹
app.use('/public',express.static(path.join(__dirname, 'public')));

//配置art-template在express中的应用
app.engine('html', require('express-art-template'));
// 配置视图文件夹
console.log(__dirname)
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'html');
// 注册路由
app.use(router)

app.listen(3000,function () {
    console.log("3000 Running....")
})