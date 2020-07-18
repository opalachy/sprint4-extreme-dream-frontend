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
    },
    async booking({ state }, { booked, exp, user }) {
       
      const updatedExp =  await expService.addParticipant(booked, exp, user)
      console.log(updatedExp)
    }
  },
}
