<template>
  <section class="app-header">
    <router-link to="/">Home</router-link>|
    <router-link to="/exp">Experiences</router-link>|
    <router-link to="/login">Login</router-link>|
    <router-link to="/signup">Signup</router-link>
  </section>
</template>

<script>
export default {
  name: "app-header",
  data() {
    return {};
  }
};
</script>

<style>
</style>