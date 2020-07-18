import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/user.service.js'

var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

Vue.use(Vuex)

export const userStore = {
    strict: true,
    state: {
        userPrefs:{
            gender: null,
            color: null,
            time: null
        },
        loggedinUser : localLoggedinUser,
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
        setUser(state, {userCred}) {
            state.loggedinUser = userCred;
        },
        setUsers(state, {users}) {
            state.users = users;
        },
        removeUser(state, {userId}) {
            state.users = state.users.filter(user => user._id !== userId)
        },
       
    },
    actions: {
        async login(context, {userCred}) {
            const user = await userService.login(userCred);
            console.log(userCred)
            context.commit({type: 'setUser', user})
            return user;
        },
        async signup(context, {userCred}) {
            const user = await userService.signup(userCred)
            console.log('1');
            
            context.commit({type: 'setUser', user})
            return user;
            
        },
        async logout(context) {
            await userService.logout()
            context.commit({type: 'setUsers', users: []})
            context.commit({type: 'setUser', user: null})
        },
        async loadUsers(context) {
            const users = await userService.getUsers();
            context.commit({type: 'setUsers', users})
        },
        async removeUser(context, {userId}) {
            await userService.remove(userId);
            context.commit({type: 'removeUser', userId})
        },
        async updateUser(context, {user}) {
            user = await userService.update(user);
            context.commit({type: 'setUser', user})
        }
    },
}
