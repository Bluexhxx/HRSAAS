//  实现axios的二次封装
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
const TIMEOUT = 6000000
// 通过axios 创建axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址 /api
  timeout: 5000
})
// 判断token是否超时
function isCheckTokenOut() {
  const timeEnd = Date.now()
  const timeStamp = timeEnd - store.getters.hrsaasTime
  return timeStamp > TIMEOUT // 超时就返回true
}
// 请求拦截器
request.interceptors.request.use(config => {
  if (store.getters.token) {
    // 判断token 有无过期
    if (isCheckTokenOut()) { // 超时
      // 退出 跳转 抛错
      store.dispatch('user/logoOutAction')
      router.push('/login')
      return Promise.reject(new Error('token超时，重新登录'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
    // config.headers['Authorization']
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(
  response => {
    const { message, data, success } = response.data
    if (success) { // 业务逻辑成功
      // Message(message)
      return data
    }
    // Message.error(message)
    return Promise.reject(new Error(message))
  },
  error => {
    if (error.response?.status === 401) { // token失效
      store.dispatch('user/logoOutAction')
      router.push('/login')
      Message.error('token失效')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)
// 导出实例
export default request
