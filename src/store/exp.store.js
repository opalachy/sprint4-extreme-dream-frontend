import {expService} from '../services/exp.service.js'

export const expStore = {
    state: {
    },
    getters:{

    },
    mutations: {
    },
    actions: {
     async loadExps({state}){
      const exps = await expService.getExps()
         console.log(exps)
      }    
    },

  }