<template>
  <section class="app-header">
   <div v-if="msgToSeller" class="msg-to-seller">
      <h3>Hi {{loggedinUser.userName}}</h3>
      <p>{{buyer.fullName}} ordered experience from you,</p>
      <p>Check your profile for more details.</p>
      <button @click="close" >close</button>
    </div>
     


    <router-link to="/">
       <span :class="isOnHome" @click="goToHome" >
         <img src="https://res.cloudinary.com/dobvwuisl/image/upload/v1595581028/dy5miswkx05lnpmf1ao1.png" alt="">
       </span>
    </router-link>
    <div v-if="isMenuOpen" @click="toggleManu" class="screen"></div>
    <button @click="toggleManu" class="hamburger">
       <i class="fas fa-bars"></i>
    </button>
    <div class="router-header" :class="{openMenu: isMenuOpen}">
       <button v-if="loggedinUser" :class="isOnProfile"  @click="goToProfile" >My Profile</button>
      <button :class="isOnExperiences" @click="goToExperiences">Experiences</button>
      <router-link v-if="!loggedinUser" to="/login">
         <span @click="goToLogin"  :class="isOnLogin">Login</span>
      </router-link>
    
        <button v-else  class="logout-btn" @click="logout">Logout</button>
    
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
        msgToSeller: false,
        buyer: null,
        isMenuOpen: false, 
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
      this.$router.push('/login');
    },
    goToExperiences(){
      this.isMenuOpen = false;
      this.activeLink = 'experiences'
      this.$store.commit({type: "setFilter" , filterBy: {}});
      this.$router.push('/exp');
    },
    goToHome(){
      this.activeLink ='home'
      this.isMenuOpen = false;
    },
    goToProfile(){
      this.activeLink ='profile'
      this.isMenuOpen = false;
      this.$router.push(`/user/${this.loggedinUser._id}`)
    },
    goToLogin(){
      this.activeLink ='login'
      this.isMenuOpen = false;
    },
    close(){
      this.msgToSeller = false
    },
    toggleManu(){
        this.isMenuOpen = !this.isMenuOpen
    },
  },
    created() {
    const loggedinuser = this.$store.getters.loggedinUser
    if(!loggedinuser) return 
    socket.setup()
    socket.on(loggedinuser._id , (buyer)=> {
      this.buyer = buyer
         this.msgToSeller = true;
           setTimeout(() =>{
            this.msgToSeller = false
            }, 6000);
    })
  }
};
</script>

<style>



</style>