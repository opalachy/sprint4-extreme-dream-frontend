<template>
    <section class="user-login">
      <form @submit.prevent="login">
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
     login() {
      this.$store.dispatch({type: 'login', userCred: this.credentials})
      this.$router.push('/')
    },
    signup(){
        this.$router.push('/signup')
    }
  },
  created() {

  },

}
</script>

<style>

</style>