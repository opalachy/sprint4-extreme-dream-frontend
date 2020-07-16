<template>
  <div id="app">
    <header-app/>
    <router-view/>
  </div>
</template>

<script>
import headerApp from './components/header-app.cmp.vue'
export default{
    components:{
      headerApp
    }
}
</script>

<style>

</style>
