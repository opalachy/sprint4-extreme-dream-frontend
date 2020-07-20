<template>
    <section class="user-login">
<<<<<<< HEAD
      <h1>Login:</h1>
      <div v-if="loggedinUser">
          <h3>Currently logged as: {{loggedinUser.userName}}</h3>
          <button @click="logout">Logout</button>
      </div>
      <form v-else @submit.prevent="login">
=======
      <form @submit.prevent="login">
>>>>>>> 36764a113861bcc1494b73662c3cf111bc803c6a
        <input placeholder="Please input user name" v-model="credentials.userName"/>
        <input placeholder="Please input password" v-model="credentials.password" show-password/>
        <button>Login</button>
      </form>
      <p>Not registered yet?</p>
      <button @click="signup">Sign Up!</button>
    </section>
</template>
<script>

import {userService} from '../services/user.service.js'
export default {
  data(){
    return {
      credentials: {
        userName: '',
        password: '',
      },
    }
  },
  methods: {
<<<<<<< HEAD
     async login() {
      const user = await this.$store.dispatch({type: 'login', userCred: this.credentials})
      // console.log('loggedin user:', this.loggedinUser)
      this.loadLoggedinUser()
      console.log('user-login: ',this.loggedinUser);
      this.$router.push('/')
    },
    async logout(){
      let user = await this.$store.dispatch({type: 'logout'})
      console.log('loggedout user:', user);
      // this.loadLoggedinUser()
=======
     login() {
      this.$store.dispatch({type: 'login', userCred: this.credentials})
>>>>>>> 36764a113861bcc1494b73662c3cf111bc803c6a
      this.$router.push('/')
    },
    signup(){
        this.$router.push('/signup')
<<<<<<< HEAD
    },
    loadLoggedinUser(){
      this.loggedinUser = this.$store.getters.loggedinUser
=======
>>>>>>> 36764a113861bcc1494b73662c3cf111bc803c6a
    }
  },
  created() {

  },

}
</script>

<style>

</style>