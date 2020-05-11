var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/student")

// 设计表结构
var student = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required: true
    },
    sex:{
        type:Number,
        required:true,
        default:0,
        enum:[0,1]
    },
    like:{
        type:String
    }
})

// 模块化表
var StudentMongo = mongoose.model("Student",student)

module.exports = StudentMongo
