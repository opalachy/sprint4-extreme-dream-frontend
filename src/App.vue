<template>
  <div id="app">
<<<<<<< HEAD
    <app-header />
=======
    <header-app />
    <h1>Hello</h1>
    <div class="block">
      <span class="demonstration">Default</span>
      <el-date-picker v-model="value1" type="date" placeholder="Pick a day"></el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">Picker with quick options</span>
      <el-date-picker
        v-model="value2"
        type="date"
        placeholder="Pick a day"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </div>
>>>>>>> 28d71c49d6e16b28e56f640bb9cc1993193afb64
    <router-view />
    <footer-app />
  </div>
</template>

<script>
import appHeader from "./components/app-header.vue";
import footerApp from "./components/footer-app.vue";
export default {
  components: {
    appHeader,
    footerApp
  }
};

</script>


<style lang="stylus" scoped>
  
</style>

