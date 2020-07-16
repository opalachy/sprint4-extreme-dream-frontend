import Vue from 'vue'
import Vuex from 'vuex'
import {experienceStore} from './experience.store.js'
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
    experienceStore,
    userStore
  }
})
