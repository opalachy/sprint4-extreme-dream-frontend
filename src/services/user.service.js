import HttpService from './http.service.js'

export default {
    // login,
    // logout,
    signup,
    getUsers,
    getById,
    remove,
    update
}

async function getById(userId) { 
    return await HttpService.get(`user/${userId}`)
}

async function remove(userId) {
    return await HttpService.delete(`user/${userId}`)
}

// const user = {
//     fullName: "adss",
//     imgUrl: "https://glimakra.com/wp-content/uploads/2017/08/Johan-Kauppi-Designer-Portrait-2017.jpg",
//     info: "36 years old. Spot is important part in my life, especially scuba diving.",
//     isSeller: false,
//     password: "12d34",
//     userName: "yaird@lapid.com",
//     _id: "oWe-S6G"
// }

async function update(user) {
    // console.log(await HttpService.put(`user/${user._id}`, user))
    return await HttpService.put(`user/${user._id}`, user)
}

// async function login(userCred) {
//     const user = await HttpService.post('auth/login', userCred)
//     return _handleLogin(user)
// }

async function signup(userCred) {
    return await HttpService.post('user', userCred)
 
    // return _handleLogin(user)
}
// async function logout() {
//     await HttpService.post('auth/logout');
//     sessionStorage.clear();
// }

async function getUsers() {
//    console.log(HttpService.get('user'))
  return await HttpService.get('user')
}

// function _handleLogin(user) {
//     sessionStorage.setItem('user', JSON.stringify(user))
//     return user;
// }



























// import HttpService from './HttpService'

// export default {
//     login,
//     logout,
//     signup,
//     getUsers,
//     getById,
//     remove,
//     update
// }

// function getById(userId) {
//     return HttpService.get(`user/${userId}`)
// }
// function remove(userId) {
//     return HttpService.delete(`user/${userId}`)
// }

// function update(user) {
//     return HttpService.put(`user/${user._id}`, user)
// }

// async function login(userCred) {
//     const user = await HttpService.post('auth/login', userCred)
//     return _handleLogin(user)
// }
// async function signup(userCred) {
//     const user = await HttpService.post('auth/signup', userCred)
//     return _handleLogin(user)
// }
// async function logout() {
//     await HttpService.post('auth/logout');
//     sessionStorage.clear();
// }
// function getUsers() {
//     return HttpService.get('user')
// }

// function _handleLogin(user) {
//     sessionStorage.setItem('user', JSON.stringify(user))
//     return user;
// }
