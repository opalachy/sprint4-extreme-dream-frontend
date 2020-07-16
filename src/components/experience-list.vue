<template>
  <div class="experience-list">
    <h1>experience List</h1>
    <router-link to="/experience/edit/"><span>Add Activity</span></router-link>
    <ul>
      <experience-preview v-for="exp in exps" :key="exp._id" :exp="exp"></experience-preview> 
    </ul>
  </div>
</template>

<script>
import experiencePreview from '../components/experience-preview.cmp';

export default {
    props:['exps'],
    data(){
        return {

        }
    },
    components: {
        experiencePreview
    }
}
</script>