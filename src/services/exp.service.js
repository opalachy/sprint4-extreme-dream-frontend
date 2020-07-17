import axios from 'axios';

export const expService = {
    getExps,
    getById
}

async function getExps (){
  const exps = await axios.get('http://localhost:3000/exp') 
   return exps.data
}

async function getById (expId){
  const exps = await axios.get(`http://localhost:3000/exp/${expId}`) 
   return exps.data
}
