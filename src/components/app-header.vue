<template>
  <section class="app-header">
    <router-link to="/"><span :class="isOnHome" @click="goToHome" > Home
       
        <div v-if="msgToSeller" class="msg-to-seller">someone order your exp</div>

       <!-- <img src="https://www.extremeadventures.com.au/imgs/ExtremeLogo.png" alt=""> -->
       
      </span></router-link>
    <div class="router-header">
      <button :class="isOnExperiences" @click="goToExperiences">Experiences</button>
         <span @click="goToProfile" :class="isOnProfile" >My Profile</span>
      <router-link  v-if="loggedinUser"  :to="`/user/${loggedinUser._id}`"> 
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
import socket from "../services/socket.service.js";

export default {
  name: "app-header",
  data(){ 
    return {
        activeLink: 'home',
        msgToSeller: false
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
    created() {
    const loggedinuser = this.$store.getters.loggedinUser
    if(!loggedinuser) return 
    socket.setup()
    socket.on(loggedinuser._id , ()=> {
         this.msgToSeller = true;
           setTimeout(() =>{
            this.msgToSeller = false
            }, 3000);
    })
  }
};
</script>

<style>

.active{
   border-bottom: 3px solid black;
}

.msg-to-seller{
  width: 400px;
  height: 400px;
  z-index: 9999;
  background-color: aqua;
  position: fixed;
}

</style>