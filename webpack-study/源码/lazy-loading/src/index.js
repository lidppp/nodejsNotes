console.log("index 被加载了")

// import {add} from "./test"

setTimeout(()=>{
            // 正常加载可以认为是并行加载(同一时间加载多个文件)
            // 预加载是等待其他资源加载完毕,浏览器空闲了,再偷偷加载资源,(不会阻塞其他资源加载,兼容性比较差,慎用)
            /* 预加载:会在使用之前提前加载js */
            /* 懒加载:会在需要使用文件的时候去加载 (如果文件体积比较大会等待比较长的时间)*/
           /* 设置代码分割后的文件名       预加载          */
    import(/* webpackChunkName:"test",webpackPrefetch:true */"./test").then(({add})=>{
        console.log(add(4,5))
    })
},1000)
