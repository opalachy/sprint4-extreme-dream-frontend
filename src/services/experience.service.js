import axios from 'axios';

export const experienceService = {
    getExps
}

async function getExps (){
  const exps = await axios.get('localhost:3000/exp') 
   return exps
}