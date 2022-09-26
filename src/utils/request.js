//  实现axios的二次封装
import axios from 'axios'
import { Message } from 'element-ui'
// 通过axios 创建axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址 /api
  timeout: 5000
})
// 响应拦截器
request.interceptors.response.use(
  response => {
    const { message, data, success } = response.data
    if (success) { // 业务逻辑成功
      Message(message)
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  error => {
    Message.error(error.message)
    return Promise.reject(error)
  }
)
// 导出实例
export default request
