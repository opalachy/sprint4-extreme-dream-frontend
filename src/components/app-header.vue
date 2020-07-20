<template>
  <section class="app-header">
    <router-link to="/">Home</router-link>
    <div class="router-header">
      <router-link to="/exp">Experiences</router-link>
      <router-link  v-if="loggedinUser"  :to="`/user/profile/${loggedinUser._id}`">My Profile</router-link>
      <router-link v-if="!loggedinUser" to="/login">Login</router-link>
      <!-- <router-link to="/login">logout</router-link> -->
      <div v-else class="log-user">
         <h5>Walcome {{loggedinUser.userName}}</h5>
         <button class="logout-btn" @click="logout">logout</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "app-header",
  computed:{
    loggedinUser(){
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
      async logout(){
      let user = await this.$store.dispatch({type: 'logout'})
    },
  },
};
</script>

<style>
</style>