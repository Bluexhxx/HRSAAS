// import { loginAPI } from '@/api/login'
// import { getUserInfoAPI } from '@/api/user'
import { loginAPI, getUserInfoAPI } from '@/api'

export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, playload) {
      state.token = playload
    },
    SET_USERINFO(state, playload) {
      state.token = playload
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
      commit('REMOVE_USERINFO', res)
    }
  }
}
