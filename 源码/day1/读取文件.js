var fs = require("fs")
fs.readFile("./hellow", function (err, data) {
  if (!err) {
    // 两种方式都可以
    // console.log(data.toString())
    console.log(String(data))
  } else {
    console.log("读取失败", err)
  }
})