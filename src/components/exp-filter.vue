<template>
  <section class="exp-filter">
    <button @click="type">Type</button>
    <button @click="destination">Destination</button>
    <button @click="more">More filter</button>
    <button @click="sort">Sort by</button>
  </section>
</template>
 

<script>


export default {
  name: "exp-filter",
  data(){
    return {
      filterBy: {
          
      }
    }
  },
  computed: {
    
  },
  methods: {
    type(){
       
    },
    destination(){

    },
    more(){

    },
    sort(){

    },
  },
  created() {

  }
}

</script>