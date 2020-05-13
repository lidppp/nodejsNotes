console.log("index 被加载了")

// import {add} from "./test"

console.log(1+2)

/**
 1.eslint不认识wendow navigator等全局变量
 解决需要修改eslint配置(package.json中的eslintConfig配置):
   添加"env":{"browser":true // 支持浏览器全局变量}
 2.serviceWorker 必须运行在服务器上
 **/

if("serviceWorker" in navigator){
    window.addEventListener("load",()=>{
        navigator.serviceWorker.register("/service-worker.js")
            .then(()=>console.log("SW注册成功"))
            .catch(()=>console.log("SW注册失败"))
    })
}