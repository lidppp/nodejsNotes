var express = require("express")
var studnetMongo = require("./mongo")
var router  =  express.Router()

router.get("/",function (req,res) {
    res.redirect("/student")
})
/**
 * 学生列表
 * */
router.get("/student",function (req,res) {
    studnetMongo.find(function (err,req) {
        if(err) return console.log(err),res.status(500).set('Content-Type', 'text/plain;charset=utf8').end("服务器出错啦");

        res.render("student-list.html",{
            students:req
        })
    })

})
/**
 * 添加
 * */
router.get("/student/add",function (req,res) {
    res.render("student-add.html",{})
})

router.post("/student/add",function (req,res) {
    var data = req.body
    data.age = parseInt(data.age)
    data.sex =  parseInt(data.sex)
    var newStudent = new studnetMongo(data)
    newStudent.save(function (err) {
        if(err) return console.log(err),res.status(500).set('Content-Type', 'text/plain;charset=utf8').end("服务器出错啦");

        res.redirect("/student")
    })
})

/**
 * 修改
 * */
router.get("/student/edit",function (req,res) {
    studnetMongo.findOne(req.query,function (err,data) {
        if(err) return console.log(err),res.redirect("/");
        res.render("student-edit.html",{
            _id: data['id'],
            name: data['name'],
            sex: data['sex'],
            age: data['age'],
            like: data['like'],
        })
    })
})

router.post("/student/edit",function (req,res) {
    console.log(req.body)
    var id = req.body._id
    delete req.body._id
    studnetMongo.update({_id:id},req.body,function (err,data) {
        if(err) return console.log(err),res.status(500).set('Content-Type', 'text/plain;charset=utf8').end("服务器出错啦");

        res.redirect("/")
    })
})
/**
 * 删除
 * */
router.get("/student/delete",function (req,res) {
    studnetMongo.deleteOne({_id:req.query.id},function (err,data) {
        if(err) return console.log(err),res.status(500).set('Content-Type', 'text/plain;charset=utf8').end("服务器出错啦");
        res.redirect("/")
    })
})
module.exports = router