import { expService } from '../services/exp.service.js'

export const expStore = {
  state: {
    exps: [],
      filterBy: {
        type: 'all',
        location: 'all',
        tags: []
    }
  },
  getters: {
    exps(state) {
      return state.exps
    }
  },
  mutations: {
    updateExp(state, { currExp }) {
      const idx = state.exps.findIndex((experience) => experience._id === currExp._id);
      state.exps.splice(idx, 1, currExp);
    },
    addExp(state, { exp }) {
      state.exps.push(exp);
    },
    setFilter(state, { filterBy }){
      state.filterBy = filterBy;
    }
  },
  actions: {
    async loadExps({ state }) {
      try {
        const exps = await expService.getExps(state.filterBy)
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







