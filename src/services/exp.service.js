import HttpService from './http.service.js'
import { userService } from './user.service.js'


export const expService = {
    getExps,
    getById,
    remove,
    add,
    update,
    addParticipant
}

async function getExps() {
  return await HttpService.get('exp')
  // console.log(await HttpService.get('exp'))
}

async function remove(expId) {
  return await HttpService.delete(`exp/${expId}`)
}

async function add(exp) {
  return await HttpService.post(`exp`, exp)
}

async function update(exp) {
  console.log(exp)
  return await HttpService.put(`exp/${exp._id}`, exp)
}

async function getById(expId) {
  return await HttpService.get(`exp/${expId}`)
}

async function addParticipant (booked, exp ,user){
  if(!user) user = userService.getGuestUser(booked)
     exp.participants.push(user);
    try{
      const updatedExp = await update(exp)
       return updatedExp
    } catch (err) {
      return (err)
    } 
}

// function getGuestUser (booked){
//     const user = {
//       _id : 'userId',
//       fullName :  'guest' ,
//       imgUrl : "https://icon-library.com/images/male-avatar-icon/male-avatar-icon-29.jpg" ,
//       numOfTickets : booked.numOfTickets
//     }
//     return user
// }
