import Vue from 'vue'
import Vuex from 'vuex'
import {userService} from '../services/user.service.js'

// var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

Vue.use(Vuex)

export const userStore = {
    strict: true,
    state: {
        loggedinUser: null 
        // {
        //     "_id": "u101",
        //     "fullName": "Orly Snowboard",
        //     "info": "Ski and snowboard instructor for more than 20 years. Gurn camp resort was founded in 2010. In 2015 Gurn camp was awarded the best freestle resort in France.",
        //     "imgUrl": "https://i0.wp.com/zsuttonphoto.com/wp-content/uploads/2019/11/Los-Angeles-Beauty-Photography-19.jpg?fit=3000%2C3750&ssl=1"
        // }
        ,
        users: []
    },
    getters: {
        userPrefs(state) {
            return state.userPrefs;
        },
        users(state) {
            return state.users;
        },
        loggedinUser(state) {
            return state.loggedinUser
        }
    },
    mutations: {
        setUserPrefs(state, { userPrefs }) {
            state.userPrefs = userPrefs;
        },
        setUser(state, { user}) {
            console.log('store: ', user);
            state.loggedinUser = user;
        },
        setUsers(state, { users }) {
            state.users = users;
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },

    },
    actions: {
        async login({ commit }, { userCred }) {
            console.log(userCred)
            const user = await userService.login(userCred);
            console.log('userStore: ', user);
            commit({ type: 'setUser', user })
            return user;
        },
        async signup({ commit }, { userCred }) {
            const user = await userService.signup(userCred)
            console.log('1');
            commit({ type: 'setUser', user })
            return user;

        },
        async logout({ commit }) {
            await userService.logout()
            commit({ type: 'setUsers', users: [] })
            commit({ type: 'setUser', user: null })
        },
        async loadUsers({ commit }) {
            const users = await userService.getUsers();
            commit({ type: 'setUsers', users })
        },
        async removeUser({ commit }, { userId }) {
            await userService.remove(userId);
            commit({ type: 'removeUser', userId })
        },
        async updateUser({ commit }, { user }) {
            user = await userService.update(user);
            commit({ type: 'setUser', user })
        }
    },
}
