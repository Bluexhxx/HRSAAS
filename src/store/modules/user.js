import { loginAPI } from '@/api/login'

export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, playload) {
      state.token = playload
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      // 请求
      try {
        const { data: { data }} = await loginAPI(loginData)
        // 提交mutions
        commit('SET_TOKEN', data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
