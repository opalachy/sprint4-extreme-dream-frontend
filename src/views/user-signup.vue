<template>
    <section class="user-signup">
      <h1>Signup:</h1>
<<<<<<< HEAD
      <div v-if="loggedinUser">
          <h3>Currently logged as: {{loggedinUser.userName}}</h3>
          <p>If you want to add another user, please logout first</p>
          <button @click="logout">Logout</button>
      </div>
      <form v-else @submit.prevent="signup">
=======
      <form  @submit.prevent="signup">
>>>>>>> 36764a113861bcc1494b73662c3cf111bc803c6a
        <el-input placeholder="Please input Email" v-model="credentials.email"></el-input>
        <el-input placeholder="Please input user name" v-model="credentials.userName"></el-input>
        <el-input placeholder="Please input password" v-model="credentials.password" show-password></el-input>
        <button>Signup</button>
      </form>
    </section>
</template>
<script>

export default {
  data(){
    return {
      credentials: {
<<<<<<< HEAD
        userName: '',
        password: '',
        email: '',
=======
        userName: 'rani',
        password: 'rani',
        email: 'rani@rr.com'
>>>>>>> 36764a113861bcc1494b73662c3cf111bc803c6a
      },
    }
  },
  methods: {
    async signup(){
        let user = await this.$store.dispatch({type: 'signup', userCred: this.credentials})
        this.$router.push('/exp')
    }
  }
}
</script>

<style>

</style>