// 权限管理
import router from '@/router'
import store from '@/store' // 引入vuex store实例
// 定义白名单  所有不受权限控制的页面
const whiteList = ['/login', '/404']
// 路由前置守卫
router.beforeEach(async function(to, from, next) {
  // 根据有无token判断登录状态
  if (store.getters.token) {
    if (!store.state.userId) {
      // 请求用户信息
      await store.dispatch('user/getUserInfoAction')
    }
    // 已登录
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else { // 没登录
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

// if (token) {
//   if (是否在登录页) {
//     // 就跳到主页
//   } else {
//     // 留在当前页
//   }
// } else {
//   // 没有token
//   if (是否在白名单) {
//     // 就跳到登录页
//   } else {
//     // 留在当前页
//   }
// }
