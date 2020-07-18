<template>
    <section class="user-signup">
      <h1>Signup:</h1>
      <div v-if="loggedinUser">
          <h3>Currently logged as: {{loggedinUser.username}}</h3>
          <p>If you want to add another user, please logout first</p>
          <button @click="logout">Logout</button>
      </div>
      <form v-else @submit.prevent="signup">
        <el-input placeholder="Please input Email" v-model="credentials.email"></el-input>
        <el-input placeholder="Please input user name" v-model="credentials.username"></el-input>
        <el-input placeholder="Please input password" v-model="credentials.password" show-password></el-input>
        <button>Signup</button>
      </form>
    </section>
</template>
<script>
import {userStore} from '../store/user.store.js'
export default {
  data(){
    return {
      loggedinUser: '',
      credentials: {
        username: '',
        password: '',
        email: '',
      },
    }
  },
  methods: {
    async signup(){
        let user = await this.$store.dispatch({type: 'signup', userCred: this.credentials})
        this.$router.push('/login')
    },
    async logout(){
      let user = await this.$store.dispatch({type: 'logout'})
      console.log('loggedout user:', user);
      this.loggedinUser = this.$store.getters.loggedinUser
    },
  },
  created() {
    let user = this.$store.getters.loggedinUser
    if (user) this.loggedinUser = user
  },

}
</script>

<style>

</style>