<template>
    <ul class="exp-list">
      <exp-preview v-for="exp in exps" :key="exp._id" :exp="exp"></exp-preview> 
    </ul>
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