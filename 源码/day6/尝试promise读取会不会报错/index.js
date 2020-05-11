var fs = require("fs")

function read_file(url) {
    return new Promise(function (resolve, reject) {
        fs.readFile(url, "utf8", function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data)
        })
    })
}

read_file("./a.txt")
    .then(data => {
        console.log(data)
        return read_file("./d.txt")
    },err => {
        console.log(err)
        return read_file("./c.txt")
    })
    .then(data => {
        console.log(data)
        return read_file("./c.txt")
    },err => {
        console.log(1)
        console.log(err)
        return read_file("./c.txt")
    })
    .then(data => {
        console.log(data)
        return read_file("./b.txt")
    },err => {
        console.log(err)
        return read_file("./b.txt")
    })
    .then(data=>{
        console.log(data)
    },err => {
        console.log(err)
    })