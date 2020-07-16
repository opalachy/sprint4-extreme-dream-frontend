import {experienceService} from '../services/experience.service.js'

export const experienceStore = {
    state: {
    },
    getters:{

    },
    mutations: {
    },
    actions: {
     async loadExps({state}){
      const exps = await experienceService.getExps()
         console.log(exps)
      }    
    },

  }