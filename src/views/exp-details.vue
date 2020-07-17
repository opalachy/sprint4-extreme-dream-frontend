<template>
  <section v-if="exp" class="exp-details">
    <div class="img-container">
        <img v-for="img in exp.imgUrls" :src="img" alt="">
        
    </div>
  </section>
</template>
 
<script>

import { expService } from '../services/exp.service.js';

export default {
  name: "exp-details",
  data(){
      return {
         exp: null
      }
  },
  computed: {
  },
  methods: {
  
  }, 
  async created() {
    const expId = this.$route.params.id
    const exp = await expService.getById(expId)
    this.exp = exp
  },

}
</script>
