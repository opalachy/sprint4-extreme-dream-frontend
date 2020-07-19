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



// saveToy({ commit }, { toy }) {
//   const type = (toy._id) ? 'updateToy' : 'addToy';
//   if (!toy._id) toy.createdAt = Date.now();
//   return toyService.save(toy)
//     .then((savedToy) => {
//       commit({ type, savedToy })
//       return savedToy;
//     })
// }




