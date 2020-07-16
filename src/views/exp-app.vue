<template>
  <section class="exp-app exp-main">
    <h2> Our Experiences </h2>
    <!-- <div class="hero-img">
    <img src="" alt="Loading...">
    </div> -->  
    <p></p>
    <!-- <exp-filter @filter="setFilter" /> -->
    <exp-list :exps="exps"/>
  </section>
</template>
 

<script>

import expList from '../components/exp-list.vue';
// import toyFilter from '@/components/exp-filter.vue';

export default {
  name: 'exp-app',
  computed: {
    exps() {
      return this.$store.getters.exps
    }
  },
  methods: {
    async remove(id) {
      try {
        await this.$store.dispatch({ type: 'removeExp', id })
      } catch (err) {
        console.log('error:', err);
      }
      //  this.$store.dispatch({ type: 'removeToy', id })
      //           .then(() => {
      //               eventBus.$emit(SHOW_MSG, { txt: 'Toy removed successfully!', type: 'danger' });
      //           })
    },
    // setFilter(filterBy) {
    //     this.$store.commit({ type: 'setFilter', filterBy: _.cloneDeep(filterBy) })
    //     this.$store.dispatch({ type: 'loadToys' })
    // },
  },
  created() {
      this.$store.dispatch({ type: 'loadExps' })
  },
  components: {
    expList,
    // expFilter
  }
}

</script>