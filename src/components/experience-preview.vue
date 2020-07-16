<template>
  <div class="experience-preview">
    <li>
      <router-link :to="'/experience/details/' + experience._id">
        <p>{{experience.name}} </p>
        </router-link>
        <br/>
        <span> ${{experience.price}}</span>
        <br/>
        <img v-if="experience.imgUrl" :src="experience.imgUrl" height="200px" />
        <router-link :to="'/experience/edit/' + experience._id"><span class="edit"> Edit</span></router-link>
    </li>

  </div>
</template>

<script>


export default {
  props:['experience'],
    data(){
        return {

        }
    },
    components: {

    }
}
</script>