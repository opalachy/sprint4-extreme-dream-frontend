<template>
    <section v-if="exp" class="exp-details">
        <div v-if="!exp">
        <h2>{{exp.title}}</h2>
            <div class="img-container">
                 <img class="img1" :src="exp.imgUrls[0]" alt="">             
                 <img class="img2" :src="exp.imgUrls[0]" alt="">             
                 <img class="img3" :src="exp.imgUrls[0]" alt="">             
                 <img class="img4" :src="exp.imgUrls[0]" alt="">             
                 <img class="img5" :src="exp.imgUrls[0]" alt="">             
            </div>
            <p class="exp-desc">{{exp.desc}}</p>
                <img :src="exp.createdBy.imgUrl" alt="">
            <p>{{exp.createdBy.info}}</p>
        </div>
            <exp-book/>
    </section>
</template>

<script>
import {expService} from '../services/exp.service.js';
import expBook from '../components/exp-book.vue';


export default {

    data(){
        return {
          exp : null
        }
    },
    computed:{
        seller(){
            this.user._id === this.exp.createdBy._id
        }
    },
    methods:{
      
    },
    components: {
       expBook
    },
   async created(){
       const expId = this.$route.params.id;
       const exp =  await expService.getById(expId);
       this.exp = exp
    }
}
</script>