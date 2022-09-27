// import { loginAPI } from '@/api/login'
// import { getUserInfoAPI } from '@/api/user'
import { loginAPI, getUserInfoAPI, getUserBasicInforByidAPI } from '@/api'

export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaasTime: 0
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    REMOVE_TOKEN(state) {
      state.token = null
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REMOVE_USERINFO(state) {
      state.userInfo = {}
    },
    SET_HRASSA_TIME(state, hrsaasTime) {
      state.hrsaasTime = hrsaasTime
    }
  },
  actions: {
    // 登录操作
    async loginAction({ commit }, loginData) {
      // 请求
      try {
        const data = await loginAPI(loginData)
        // 提交mutions
        commit('SET_TOKEN', data)
        commit('SET_HRASSA_TIME', new Date().getTime())
      } catch (e) {
        console.log(e)
      }
    },
    async getUserInfoAction({ commit }) {
      // 请求
      const res = await getUserInfoAPI()
      const res2 = await getUserBasicInforByidAPI(res.userId)
      const result = { ...res, ...res2 }
      commit('SET_USERINFO', result)
      // 深拷贝 返回一个新的res 防止复杂数据类型的原数据被改变
      return JSON.parse(JSON.stringify(result))
    },
    // 登出操作
    logoOutAction({ commit }) {
      // 删除用户信息
      commit('REMOVE_USERINFO')
      // 删除token
      commit('REMOVE_TOKEN')
    }
  }
}
