<template>
    <section class="user-signup">
      <h1>Signup:</h1>
      <form  @submit.prevent="signup">
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
        userName: 'rani',
        password: 'rani',
        email: 'rani@rr.com'
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