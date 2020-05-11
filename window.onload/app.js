var fs = require("fs")

var express = require("express")

const app = express()
const port = 3000

app.get('/', (req, res) => {
  fs.readFile("./a.html", "utf8", function (err, data) {
    res.send(data)
  })
})
app.get("/img", (req, res) => {
  fs.readFile("./img/009.jpg", function (err, data) {
    setTimeout(() => {
      res.send(data)
    }, 3000);
  })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))