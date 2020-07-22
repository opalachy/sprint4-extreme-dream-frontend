<template>
  <section class="app-header">
    <router-link to="/"><span :class="isOnHome" @click="goToHome" > Home</span></router-link>
    <div class="router-header">
      <button :class="isOnExperiences" @click="goToExperiences">Experiences</button>
      <router-link  v-if="loggedinUser"  :to="`/user/${loggedinUser._id}`"> 
         <span @click="goToProfile" :class="isOnProfile" >My Profile</span>
      </router-link>
      <router-link v-if="!loggedinUser" to="/login">
         <span @click="goToLogin"  :class="isOnLogin">Login</span>
      </router-link>
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
  data(){ 
    return {
        activeLink: 'home'
    } 
  },
  computed:{
    loggedinUser(){
      return this.$store.getters.loggedinUser;
    },
    isOnHome() {
      return {active :  this.activeLink === 'home' }
    },
    isOnProfile() {
      return {active : this.activeLink === 'profile' }
    },
    isOnLogin() {
      return {active : this.activeLink === 'login' }
    },
    isOnExperiences() {
      return {active : this.activeLink === 'experiences' }
    },
  },
  methods: {
      async logout(){
      let user = await this.$store.dispatch({type: 'logout'})
      this.$router.push('/');
    },
    goToExperiences(){
      this.activeLink = 'experiences'
      this.$store.commit({type: "setFilter" , filterBy: {}});
      this.$router.push('/exp');
    },
    goToHome(){
      this.activeLink ='home'
    },
    goToProfile(){
      this.activeLink ='profile'
    },
    goToLogin(){
       this.activeLink ='login'
    }
  },
};
</script>

<style>

.active{
   border-bottom: 3px solid black;
}
</style>