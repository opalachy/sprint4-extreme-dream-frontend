<template>
  <div id="app">
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
    <router-view />
  </div>
</template>

<script>
import headerApp from "./components/header-app.vue";
export default {
  components: {
    headerApp
  }
};

</script>


<style lang="stylus" scoped>
  
</style>

