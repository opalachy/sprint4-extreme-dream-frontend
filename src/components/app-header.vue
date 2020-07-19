<template>
  <section class="app-header">
    <router-link to="/">Home</router-link>
    <div class="router-header">
      <router-link to="/exp">Experiences</router-link>
      <router-link to="/login">Login</router-link>
    </div>
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