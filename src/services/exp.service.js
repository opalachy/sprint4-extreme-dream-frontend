import HttpService from './http.service.js'

import axios from 'axios';


export const expService = {
    getExps,
    getById,
    remove,
    add,
    remove
}

// async function getExps (){
//   const exps = await axios.get('http://localhost:3000/exp') 
//    return exps.data
// }

// async function getById (expId){
//   const exps = await axios.get(`http://localhost:3000/exp/${expId}`) 
//    return exps.data
// }

// async function remove(expId) {
//   return await axios.delete(`http://localhost:3000/exp/${expId}`)
// }



async function getExps() {
  return await HttpService.get('exp')
}

async function remove(expId) {
  return await HttpService.delete(`exp/${expId}`)
}

async function add(exp) {
  return await HttpService.post(`exp`, exp)
}

async function update(exp) {
  return await HttpService.put(`exp/${exp._id}`, exp)
}

async function getById(expId) {
  return await HttpService.get(`exp/${expId}`)
}
