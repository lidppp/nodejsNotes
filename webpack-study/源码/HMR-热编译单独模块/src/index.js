
import "./other.css"

import "./index.css"
import print from "./print.js"
console.log("你好世界,哇喔")
console.log("Who am I 啊 Lidppp啊")

if (module.hot) {
  module.hot.accept('./print.js', function () {
    // 当print.js更新后执行代码
    print()
  })
}