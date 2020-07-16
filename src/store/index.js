import Vue from 'vue'
import Vuex from 'vuex'
import {tripStore} from './trip.store.js'
import {userStore} from './user.store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tripStore,
    userStore
  }
})
