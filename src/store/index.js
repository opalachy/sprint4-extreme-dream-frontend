import Vue from 'vue'
import Vuex from 'vuex'
import {expStore} from './exp.store.js'
import {userStore} from './user.store.js'
import {orderStore} from './order.store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    expStore,
    userStore,
    orderStore
  }
})
