import HttpService from './http.service.js'


export const expService = {
    getExps,
    getById,
    remove,
    add,
    update
}

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
