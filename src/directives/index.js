export const imgerror = {
  inserted(dom, binding, vnode) {
    // 换图片的时机 onerror
    // console.log(dom) // dom
    // console.log(binding) // 当前指令的相关信息
    // console.log(vnode) // 虚拟节点
    dom.onerror = function() {
      // 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
      // dom可以注册error事件
      dom.src = binding.value // 这里不能写死
    }
  }
}
