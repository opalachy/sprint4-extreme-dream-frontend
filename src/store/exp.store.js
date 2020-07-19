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
    updateExp(state, { exp }) {
      const idx = state.exps.findIndex((experience) => experience._id === exp._id);
      state.exps.splice(idx, 1, exp);
    },
    addExp(state, { exp }) {
      state.exps.push(exp);
    }
  },
  actions: {
    async loadExps({ state }) {
      try {
        const exps = await expService.getExps()
        console.log('try');
        state.exps = exps
        return exps

      } catch (err) {
        console.log('ERR: ', err)
      }
    },

    async removeExp({ commit }, { id }) {
      await expService.remove(id)
      // commit({ type: 'removeExp', id })

    },
    async booking({ state }, { booked, exp, user }) {
      const updatedExp = await expService.addParticipant(booked, exp, user)
      console.log(updatedExp)
    },
    async saveExp({ commit }, { exp }) {
      const type = (exp._id) ? 'updateExp' : 'addExp';
      if (!exp._id) exp.date = Date.now();
      const currExp = await expService.saveExp(exp)
      commit({ type, currExp })
      return currExp
    }
  }

}







