function a (num1,num2){
    return num1-num2
}
/*
* 通过js代码将某个单独文件打包成一个chunk
* import动态导入语法: 能将某个文件单独打包
* */

import (/* webpackChunkName:"test" */"./test")
    .then(res=>{
        console.log(res.add(2,2))
    })
    .catch(err=>console.log("错误",err))
// eslint-disable-next-line
console.log(a(1, 1))