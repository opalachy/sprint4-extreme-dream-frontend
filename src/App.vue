<template>
  <div id="app">
    <header-app />
    <input type="date" name="" id="" value="2018-07-22">
    <h1>Hello</h1>
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

<style>
</style>
