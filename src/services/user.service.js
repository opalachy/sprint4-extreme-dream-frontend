const gUsers = [
    {
        _id: 'u101',
        fullName: 'Orly Amdadi',
        userName: 'orly@amdadi.com',
        password: 'tinkerbell',
        isSeller: true,
        imgUrl: 'http://some-img',
        // reviews: [
        //     {
        //         id: 'r101',
        //         from: {
        //             _id: 'u102',
        //             fullName: 'Orly Azaz',
        //             imgUrl: 'http://core-img'
        //         },
        //         txt: '',
        //         rate: 2
        //     }
        // ],
        info: 'Dive master, with 12 years experience. I have 1200 hours of diving. I\'m certefied cave master as well.'
    },
    {
        _id: 'u102',
        fullName: 'Orly Azaz',
        userName: 'orly@azaz.com',
        password: '1234',
        isSeller: false,
        imgUrl: 'http://core-img',
        // reviews: [],
        info: 'I\'m new to diving and I would like to dive in an exsotic place'
    }
]



























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
