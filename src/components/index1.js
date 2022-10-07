// 组件自动全局注册
// require.context(路径，是否查看子目录，正则) ==》返回一个函数
// require.context 返回的函数 有一个keys属性，对应也是一个方法，返回值 找到内容的路径
// require.context 返回的函数 的作用 根据路径 找到对应的模块
const fn = require.context('./', true, /\.vue$/)
const components = fn.keys().map(ele => {
  console.log(ele)
  return fn(ele)
})
export default (Vue) => {
  components.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
}
