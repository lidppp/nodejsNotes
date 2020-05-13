console.log("test被加载了")

export function add(...argu) {
  return argu.reduce((n, p) => { return n + p }, 0)
}
