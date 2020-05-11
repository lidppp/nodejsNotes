var http = require("http")
var fs = require("fs")
var urlR = require("url")
var template = require("art-template")
var queryString = require("querystring")
var htmlTemUrl = "../views"
var publicDitUrl = ".."
var itemJsonUrl = "./itemJSON.json"
http.createServer(function (req, res) {
    function succFn() {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
    }

    function errFn() {
        res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"})
        res.end("404 NOT FIND")
    }

    var url = decodeURIComponent(req.url)
    url = urlR.parse(url).pathname
    console.log(url)
    if (url === "/favicon.ico") {
        errFn()
    } else if (url === "/" || url === "/index") {
        fs.readFile(htmlTemUrl + "/index1.html", function (err, data) {
            if (err) {
                console.log(err)
                errFn()
                return
            }
            succFn()
            var htmlArr = readJSON()
            var htmldata = template.render(data.toString(), {
                list: htmlArr ? htmlArr : []
            })
            res.end(htmldata)
        })
    } else if (url === "/post") {
        fs.readFile(htmlTemUrl + "/ajax.html", function (err, data) {
            if (err) {
                console.log(err)
                errFn()
                return
            }
            succFn()
            res.end(data)
        })
    } else if (url.indexOf('/public') === 0) {
        fs.readFile(publicDitUrl + url, function (err, data) {
            if (err) {
                console.log(err)
                errFn()
                return
            }
            res.end(data)
        })
    } else if (url.indexOf("/api") === 0) {
        if (url.indexOf("/creatitem") !== -1) {
            req.on("data", function (chunk) {
                var flag = writeJSON(queryString.parse(chunk.toString()))
                if (flag) {
                    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"})
                    res.end(JSON.stringify({code: 200, msg: "添加成功"}))
                } else {
                    res.writeHead(500, {"Content-Type": "application/json; charset=utf-8"})
                    res.end(JSON.stringify({code: 500, msg: "服务器错误"}))
                }
            })
        }
    } else {
        errFn()
    }

}).listen(3000, function () {
    console.log("服务器运行成功")
})

function readJSON() {
    try {
        var data = fs.readFileSync(itemJsonUrl)
        console.log(data)
        return JSON.parse(data.toString())
    } catch (e) {
        console.log(e)
        return false
    }

}

function writeJSON(arrdata, res) {
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
    fs.stat(itemJsonUrl, function (err, stats) {
        if (err) {
            fs.writeFile(itemJsonUrl, JSON.stringify([]), function (err) {
                if (err) {
                    console.log(err)
                }
            })
            console.log(err)
            return
        }
    })
}

hasJSON()