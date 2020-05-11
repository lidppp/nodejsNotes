var fs = require("fs")

fs.writeFile("./aa.txt", "", function (err) {
  if (err) {
    console.log(err)
  } else {
    fs.readFile("./aa.txt", function (err, data) {
      if (!err) {
        if (data) {
          console.log("空文件data不判断为空")
        }
        console.log(data.toString())
      } else {
        console.log(err)
      }
    })
  }
})