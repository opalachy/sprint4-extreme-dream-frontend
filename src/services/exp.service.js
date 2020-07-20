import HttpService from './http.service.js'
import { userService } from './user.service.js'


export const expService = {
  getExps,
  getById,
  remove,
  add,
  update,
  addParticipant,
  getSellerExps,
  getEmptyExp,
  saveExp
}

async function getExps({type = 'all' ,location= 'all',tags = [] ,sortBy = 'all' , sellerId ='all'}) {
  return await HttpService.get(`exp?type=${type}&location=${location}&tags=${tags}&sortBy=${sortBy}&sellerId=${sellerId}`)
}

async function getSellerExps(filterBy) {
  const expSeller = await  getExps(filterBy)
  return expSeller
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

function getEmptyExp() {
  const emptyExp = 
        {
          title: "",
          shortDesc: "",
          desc: "",
          createdBy: {
            _id: "",
            fullName: "",
            info: "",
            imgUrl: ""
          },
          type: "",
          currPrice: "",
          origPrice: "",
          tags: [],
          participants: [],
          location: "",
          date: "",
          capacity: "",
          imgUrls: [],
          reviews: []
        }
  return emptyExp
}

async function addParticipant(booked, exp, user) {
  if (!user) user = userService.getGuestUser(booked)
  exp.participants.push(user);
  try {
    const updatedExp = await update(exp)
    return updatedExp
  } catch (err) {
    return (err)
  }
}

function saveExp(exp) {
  return exp._id ? update(exp) : add(exp);
}
