import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'


const local = new VuexPersistence({
  storage: {
    getItem: key => Cookies.get(key),
    setItem:(key, value) => Cookies.set(key, value,{expires:7,secure:true}),
    removeItem: key => Cookies.remove(key)
  }
})

export default createStore({
  state: {
    user:{
      id: null,
      jwt: null,
      Nome: null,
      countFavorites:null,
      countCart:null,
      productsFavoriteds:[]
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
    },
    setNome(state,value){
      state.user.Nome = value
    },
    setFav(state, value){
     state.user.countFavorites = value
    },
    setCart(state, value){
      state.user.countCart = value
    },
    setProductFav(state, value){
      state.user.productsFavoriteds = value
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[local.plugin]
})
