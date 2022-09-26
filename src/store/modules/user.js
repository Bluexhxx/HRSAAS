// import { loginAPI } from '@/api/login'
// import { getUserInfoAPI } from '@/api/user'
import { loginAPI, getUserInfoAPI, getUserBasicInforByidAPI } from '@/api'

export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REMOVE_USERINFO(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      // 请求
      try {
        const data = await loginAPI(loginData)
        // 提交mutions
        commit('SET_TOKEN', data)
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
    }
  }
}
