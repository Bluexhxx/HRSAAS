//  实现axios的二次封装
import axios from 'axios'

// 通过axios 创建axios 实例
const service = axios.create({
  baseURL: '/dev', // 基准地址
  timeout: 5000
})
// 导出实例
export default service
