<template>
  <div id="app">
    <header-app />
    <input type="date" name="" id="" value="2018-07-22">
    <router-view />
  </div>
</template>

<script>
import headerApp from "./components/header-app.cmp.vue";
export default {
  components: {
    headerApp
  }
};
</script>

<style>
</style>
