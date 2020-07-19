import { expService } from '../services/exp.service.js'

export const expStore = {
  state: {
    exps: [],
    filterBy: {
      type: 'all',
      loggedinUser: null
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
      try {
        const exps = await expService.getExps()
        console.log('try');
        state.exps = exps
        return exps

      } catch (err) {
        console.log('ERR: ',err)
      }
    },

    async removeExp({ commit }, { id }) {
      await expService.remove(id)
      // commit({ type: 'removeExp', id })

    },
    async booking({ state }, { booked, exp, user }) {
      const updatedExp = await expService.addParticipant(booked, exp, user)
      console.log(updatedExp)
    }
  },
}



// async saveExp({ commit }, { exp }) {
//   const type = (exp._id) ? 'updateExp' : 'addExp';
//   if (!exp._id) exp.createdAt = Date.now();
//   const exp = await expService.save(exp)
//     .then((savedExp) => {
//       commit({ type, savedExp })
//       return savedExp;
//     })
// }




