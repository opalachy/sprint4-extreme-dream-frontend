import Vue from 'vue'
import Vuex from 'vuex'
import {userService} from '../services/user.service.js'

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

Vue.use(Vuex)

export const userStore = {
    strict: true,
    state: {
        loggedinUser: localLoggedinUser, 
    },
    getters: {
        // users(state) {
        //     return state.users;
        // },
        loggedinUser(state) {
            return state.loggedinUser
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedinUser = user;
        },
        // setUsers(state, { users }) {
        //     state.users = users;
        // },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
    },
    actions: {
        async login({ commit }, { userCred }) {
            console.log(userCred)
            const user = await userService.login(userCred);
            commit({ type: 'setUser', user })
            console.log(user)
            return user;
        },
        async signup({ commit }, { userCred }) {
            const user = await userService.signup(userCred);
            commit({ type: 'setUser', user })
            return user;
        },
        async logout({ commit }) {
            await userService.logout()
            commit({ type: 'setUser', user: null })
        },
        // async loadUsers({ commit }) {
        //     const users = await userService.getUsers();
        //     commit({ type: 'setUsers', users })
        // },
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
