//  实现axios的二次封装
import axios from 'axios'

// 通过axios 创建axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址 /api
  timeout: 5000
})
// 导出实例
export default request
