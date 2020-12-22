import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const USER_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(USER_KEY, JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
