// 全局组件
import PageTools from './PageTools'

import * as directives from '@/directives'
import * as filters from '@/filters'
const components = [PageTools]

export default (Vue) => {
  components.forEach(element => {
    Vue.component(element.name, element)
  })
  Object.keys(directives).forEach(ele => {
    Vue.directive(ele, directives[ele])
    // Vue.directive('自定义指令的名字', 逻辑)
  })
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}

