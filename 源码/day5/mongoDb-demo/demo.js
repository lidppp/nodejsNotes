var mongoose = require("mongoose")
// 连接数据库  最后一个参数wang是数据库的名字
mongoose.connect("mongodb://localhost/wang")

var db = mongoose.connection
//数据库连接错误时触发
db.on("error", console.error.bind(console, "错误:"))
// 数据库连接成功时触发
db.once("open", function () {

    console.log("mongoDB启动成功")
    // 新建一个Schema
    // 在此处设计表结构
    // var dogSchema = mongoose.Schema({name: String})
    var dogSchema = mongoose.Schema({
        name: {
            type: String,
            required: true // 必填项,不可为空
        }
    })
    // 给Schema绑定一个方法,这个方法可以在每一个数据中调用,相当于给原型链中加了一个方法
    dogSchema.methods.speak = function () {
        // 这个方法中的this指向为本条数据
        var str = "我是谁?我是狗.我也是" + this.name + "!汪汪汪!"
        console.log(str)
    }
    // 将Schema发布为model(模型)
    // mongoose.model方法就是用来将一个架构发布为模型
    // 第一个参数: 传入一个大写名词的单数用来表示你的数据库名称
    //                 mongoose 会自动将大写名字的字符串生成 小写复数 的集合名称
    //                  例如这里的Dog最终会变为dogs集合名称
    // 第二个参数: 架构 Schema
    // 返回值 模型构造函数
    // 当我们有了模型构造函数之后就可以使用这个构造函数对Dogs中的数据进行操作
    var dog = mongoose.model("Dog", dogSchema)

    /**
     * 新增
     */

    // // new一个model
    // // 使用save方法保存,then方法为保存成功时调用
    // // 对象中要写入Schema中的数据结构
    // new dog({name: "傻逼安臻"}).save().then(function (item) {
    //     console.log(item)
    //     item.speak()
    // })
    // 第二种方式
    // var anzheng = new dog({name: "傻逼安臻"})
    // anzheng.save(function (err, fluffy) {
    // // fluffy为本行插入的信息
    //     if (err) {
    //         return console.error(err)
    //     }
    //     fluffy.speak()
    // })

    /**
     * 查询
     */
    // 通过dog构造函数来查询
    // 查询全部
    // dog.find(function (err,ret) {
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log(ret)
    // })

    // 按条件查询
    // 此处可以使用如下方的正则
    // 也可以直接查询 "1个安臻" 得到的是一个数组
    // dog.find({name:/1/},function(err,ret){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log(ret)
    // })

    // findOne 方法只会匹配第一条符合条件的数据,返回一个对象,如果没有条件会查询第一条数据
    // dog.findOne({name: /1个/}).then(function (err, ret) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log(ret)
    // })
    /**
     * 修改
     */
    // 只会修改符合条件的第一条数据进行修改
    // dog.update({name:/^3/},{name:"大傻吊安臻"},function (err,ret) {
    //     if(err){
    //         return console.error(err)
    //     }
    //     console.log(ret)
    // })

    // 只会修改符合条件的第一条数据进行修改
    // dog.updateOne({name: /^3/}, {name: "大傻吊安臻"}, function (err, ret) {
    //     if (err) {
    //         return console.error(err)
    //     }
    //     console.log(ret)
    // })

    // 会对所有匹配到的数据进行修改
    dog.updateMany({name: /^4/}, {name: "大傻吊安臻"}, function (err, ret) {
        if (err) {
            return console.error(err)
        }
        console.log(ret)
    })
    /**
     * 删除
     */
    // 删除一个
    // dog.deleteOne({name:/^1/},function (err,ret) {
    //     //     if(err){
    //     //         return console.log(err)
    //     //     }
    //     //     console.log(ret)
    //     // })

    // 删除多个
    // dog.deleteMany({name:/^1/},function (err,ret) {
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log(ret)
    // })

    // 不推荐使用 删除匹配到的多个
    // 官方提示 remove已被弃用,请使用deleteOne 或者 deleteMany
    // dog.remove({name:/^2/},function (err,ret) {
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log(ret)
    // })
})