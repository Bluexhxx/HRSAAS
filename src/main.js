import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 3.注释语言包
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 全局注册多个自定义指令
// import { imgerror } from '@/directives'
// Vue.directive('imgerror', imgerror)
import * as directives from '@/directives'
// 把的所有的自定义指令引入 命名为directives 类型是数组
// 取出所有的自定义指令的名字 数组 遍历 注册
Object.keys(directives).forEach(ele => {
  Vue.directive(ele, directives[ele])
  // Vue.directive('自定义指令的名字', 逻辑)
})
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 1.注释掉**mock数据的部分
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
