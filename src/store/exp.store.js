import { expService } from '../services/exp.service.js'

export const expStore = {
  state: {
    exps: [],
    filterBy: {
      type: 'all'
    }
  },
  getters: {
    exps(state) {
      return state.exps
    }
  },
  mutations: {
  },
  actions: {
    async loadExps({ state }) {
      const exps = await expService.getExps()
      state.exps = exps
      return exps

    }
  },

}