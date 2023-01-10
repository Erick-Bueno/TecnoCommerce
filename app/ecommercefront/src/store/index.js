import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const local = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  state: {
    user:{
      id: null,
      jwt: null
    }
  },
  getters: {
  },
  mutations: {
    setid(state, value){
      state.user.id = value
    },
    setToken(state, value){
      state.user.jwt = value
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[local.plugin]
})
