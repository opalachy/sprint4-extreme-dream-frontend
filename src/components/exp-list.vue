<template>
  <div class="exp-list">
    <h1>experiences List</h1>
    <router-link to="/exp/edit/"><span>Add Activity</span></router-link>
    <ul>
      <exp-preview v-for="exp in exps" :key="exp._id" :exp="exp"></exp-preview> 
    </ul>
  </div>
</template>

<script>
import expPreview from '../components/exp-preview.vue';

export default {
    props:['exps'],
    data(){
        return {

        }
    },
    components: {
        expPreview
    }
}
</script>