// import "core-js"
const add =  (a, b)=>{
  return (a + b);
}

const pr = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    console.log("定时器执行了")
    resolve()
  },1000)
})
console.log(pr)
console.log(add(3, 2));
