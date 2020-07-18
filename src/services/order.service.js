import HttpService from './http.service.js'
import { userService } from './user.service.js'

export const orderService = {
    getOrders,
    getById,
    remove,
    add,
    update,
    addOrder

}

async function getOrders() {
    console.log('ddddd')
    return await HttpService.get('order')
    //   console.log(await HttpService.get('order'))
}

async function remove(orderId) {
    return await HttpService.delete(`order/${orderId}`)
}

async function add(order) {
    return await HttpService.post(`order`, order)
}

async function update(order) {
    return await HttpService.put(`order/${order._id}`, order)
}

async function getById(orderId) {
    return await HttpService.get(`order/${orderId}`)
}
async function addOrder(booked, exp, user) {
    if(!user) user = userService.getGuestUser(booked)
    const order = {
        createdAt : Date.now(),
        by: {
            _id: user._id, 
            fullName: user.fullName,
            imgUrl: user.imgUrl
        },
        exp: {
            _id: exp._id,
            type: exp.type,
            title: exp.title
        }
    }
    console.log(order)
    return await add(order) 
}
// function getGeustUser (booked){
//     const user = {
//       _id : 'userId',
//       fullName :  'guest' ,
//       imgUrl : "https://icon-library.com/images/male-avatar-icon/male-avatar-icon-29.jpg" ,
//       numOfTickets : booked.numOfTickets
//     }
//     return user
// }























