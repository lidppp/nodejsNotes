var express = require("express")
var fs = require("fs")
var template = require("art-template")
// 模板路径
var htmlTemUrl = "../views"
// 留言路径
var itemJsonUrl = "./itemJSON.json"
// 必须引入这个才可以获取到 post请求中的body
var bodyparser = require('body-parser');
var app = express()
// 配置 bodyparser
app.use(bodyparser.urlencoded({ extende: true }));
app.use(bodyparser.json())

app.use("/public/", express.static("../public/"))

// 发生错误时调用
function errFn(res) {
  res.status(404).end("404 Not find");
}
app.get("/index", function (req, res) {
  res.redirect('/');
})

app.get("/", function (req, res) {
  fs.readFile(htmlTemUrl + "/index1.html", function (err, data) {
    if (err) {
      console.log(err)
      errFn(res)
      return
    }
    var htmlArr = readJSON()
    var htmldata = template.render(data.toString(), {
      list: htmlArr ? htmlArr : []
    })
    res.send(htmldata)
  })
})


app.get("/post", function (req, res) {
  fs.readFile(htmlTemUrl + "/ajax.html", function (err, data) {
    if (err) {
      console.log(err)
      errFn(res)
      return
    }
    res.set("content-type", "text/html")
    res.send(data.toString())
  })
})

app.post("/api/creatitem", function (req, res) {
  console.log("post", req.body)
  var flag = writeJSON(req.body)
  if (flag) {
    res.set({ "Content-Type": "application/json; charset=utf-8" }).send(JSON.stringify({ code: 200, msg: "添加成功" }))
  } else {
    res.status(500).send(JSON.stringify({ code: 500, msg: "服务器错误" }))
  }
}).get("/api/creatitem", function (req, res) {
  console.log("get", req.query)
  var flag = writeJSON(req.query)
  if (flag) {
    res.set({ "Content-Type": "application/json; charset=utf-8" }).send(JSON.stringify({ code: 200, msg: "添加成功" }))
  } else {
    res.status(500).send(JSON.stringify({ code: 500, msg: "服务器错误" }))
  }
})
app.listen(3000, function () {
  console.log("express 服务启动")
})

function readJSON() {
  hasJSON()
  try {
    var data = fs.readFileSync(itemJsonUrl)
    console.log(data)
    return JSON.parse(data.toString())
  } catch (e) {
    console.log(e)
    return false
  }

}

function writeJSON(arrdata) {
  var oldData = readJSON()
  if (oldData) {
    oldData.unshift(arrdata)
    var data = JSON.stringify(oldData)
    try {
      fs.writeFileSync(itemJsonUrl, data)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
}


function hasJSON() {
  try {
    fs.statSync(itemJsonUrl)
  } catch (e) {
    console.log(e)
    try {
      fs.writeFileSync(itemJsonUrl, JSON.stringify([]))
    } catch (err) {
      console.log(err)
      hasJSON()
    }
  }
}

hasJSON()
