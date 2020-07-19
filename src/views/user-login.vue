<template>
    <section class="user-login">
      <h1>Login:</h1>
      <div v-if="loggedinUser">
          <h3>Currently logged as: {{loggedinUser.username}}</h3>
          <button @click="logout">Logout</button>
      </div>
      <form v-else @submit.prevent="login">
        <input placeholder="Please input user name" v-model="credentials.username"/>
        <input placeholder="Please input password" v-model="credentials.password" show-password/>
        <button>Login</button>
      </form>
      <p>Not registered yet?</p>
      <button @click="signup">Sign Up!</button>
    </section>
</template>
<script>
import {userStore} from '../store/user.store.js'
import {userService} from '../services/user.service.js'
export default {
  data(){
    return {
      loggedinUser: null,
      credentials: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
     login() {
      this.$store.dispatch({type: 'login', userCred: this.credentials})
      // console.log('loggedin user:', this.loggedinUser)
      // this.loadLoggedinUser()
      this.$router.push('/')
    },
    async logout(){
      let user = await this.$store.dispatch({type: 'logout'})
      console.log('loggedout user:', user);
      // this.loadLoggedinUser()
      this.$router.push('/')
    },
    signup(){
        this.$router.push('/signup')
    },
    // loadLoggedinUser(){
    //   this.loggedinUser = this.$store.getters.loggedinUser
    // }
  },
  created() {
    // this.loadLoggedinUser()
  },

}
</script>

<style>

</style>