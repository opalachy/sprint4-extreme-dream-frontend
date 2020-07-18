import HttpService from './http.service.js'

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getGeustUser
}


function getGeustUser(booked) {
    const user = {
        _id: 'userId',
        fullName: 'guest',
        imgUrl: "https://icon-library.com/images/male-avatar-icon/male-avatar-icon-29.jpg",
        numOfTickets: booked.numOfTickets
    }
    return user
}


async function getById(userId) {
    return await HttpService.get(`user/${userId}`)
}

async function remove(userId) {
    return await HttpService.delete(`user/${userId}`)
}

async function update(user) {
    // console.log(await HttpService.put(`user/${user._id}`, user))
    return await HttpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    const user = await HttpService.post('login', userCred)
    // const user = await HttpService.post('auth/login', userCred)
    return _handleLogin(user)
}

async function signup(userCred) {
    return await HttpService.post('user', userCred)

    // return _handleLogin(user)
}
async function logout() {
    await HttpService.post('logout');
    // await HttpService.post('auth/logout');
    sessionStorage.clear();
}


async function getUsers(id) {
    console.log(await HttpService.get(`user/${id}`))
    //   return await HttpService.get('user')
}

// function _handleLogin(user) {
//     sessionStorage.setItem('user', JSON.stringify(user))
//     return user;
// }


