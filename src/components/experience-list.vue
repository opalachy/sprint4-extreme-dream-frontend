<template>
  <div class="experience-list">
    <h1>experience List</h1>
    <router-link to="/experience/edit/"><span>Add Activity</span></router-link>
    <ul>
      <experience-preview v-for="experience in experiences" :key="experience._id" :experience="experience"></experience-preview> 
    </ul>
  </div>
</template>

<script>
import experiencePreview from '../components/experience-preview.cmp';

export default {
    props:['experiences'],
    data(){
        return {

        }
    },
    components: {
        experiencePreview
    }
}
</script>