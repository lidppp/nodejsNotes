var http = require("http")
var fs = require("fs")
var path = require("path")
var {type} = require("./contentType.js")
var template = require("art-template")
var server = http.createServer()


var ROOT_DIR = "./www"
server.on("request", function (req, res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    var url = req.url
    if (url === "/favicon.ico") {
        return
    }
    url = decodeURIComponent(url) // 解决url中有中文浏览器自动编码的问题
    var rurl = path.join(ROOT_DIR, url)
    try {
        // 获取当前路径的详细信息
        var stat = fs.lstatSync(rurl);
        if (stat.isDirectory()) { // 判断当前路径是否为文件夹
            fs.readdir(rurl, function (err, data) {
                if (err) {
                    return console.log(err)
                }
                // 读取模板
                var htmltem = fs.readFileSync("./template/index1.html").toString()
                // 渲染模板
                var files = []
                data.forEach(function (item) {
                    var lstat = fs.lstatSync(path.join(rurl, item))
                    files.push({
                        imgsrc: lstat.isDirectory() ? "folder.gif" : "text.gif",
                        src: path.join(url, item),
                        srcName: item,
                        creatTime: dateFormat(lstat.ctime),
                        size: renderSize(lstat.size)
                    })
                })
                // 拼接模板
                htmltem = template.render(htmltem, {
                    url: url,
                    isback: url !== "/",
                    backurl: url !== "/"? path.join(url, '../'):"/",
                    files:files
                }, {
                    "escape": false
                })
                // 响应模板
                res.end(htmltem)
            })
        } else {
            // 如果不是文件夹则执行读取文件操作
            var data = readfile(rurl)
            res.writeHead(200, data.head)
            res.end(data.data)
        }
    } catch (e) {
        console.log(e)
        res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"})
        res.end("文件不存在或路径错误")
    }


})
server.listen(3000, function () {
    console.log("文件服务器启动")

})

// 读取文件(这个是读取真正的文件)
function readfile(url) {
    // 当前url为真实的本地路径
    var rurl = url
    var obj = {}
    try {
        // 同步读取文件
        var data = fs.readFileSync(rurl)
        // 获取content-type
        // extname方法为获取后缀名
        var typeext = path.extname(rurl)
        var typestr = type[typeext] ? type[typeext] : type['other']
        // 拼接contenttype
        obj.head = {"Content-Type": typestr + '; charset=utf-8'}
        obj.data = data
    } catch (e) {
        obj.head = {"Content-Type": "text/plain; charset=utf-8"}
        obj.data = "文件不存在或路径错误"
    }
    return obj;
}

// 格式化日期
function dateFormat(date, fmt) {
    fmt = fmt || "YYYY-mm-dd HH:MM"
    var ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
        ;
    }
    ;
    return fmt;
}

// 格式化文件大小
function renderSize(value) {
    if (null == value || value == '' || value == 0 || value == '0') {
        return " - ";
    }
    var unitArr = new Array("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
    var index = 0;
    var srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2);//保留的小数位数
    return size + unitArr[index];
}