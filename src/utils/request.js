//  实现axios的二次封装
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// 通过axios 创建axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址 /api
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use(config => {
  if (store.getters.token) {
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
    Message.error(error.message)
    return Promise.reject(error)
  }
)
// 导出实例
export default request
