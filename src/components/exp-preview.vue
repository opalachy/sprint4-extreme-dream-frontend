<template>
  <section class="exp-preview">
    <li>
        <router-link :to="'/exp/details/' + exp._id">
        <div class="preview-img">
            <img :src="exp.imgUrls[0]" height="200px"/>
        </div>
        <p class="exp-title">{{exp.title}} </p>
        <p class="exp-creator">{{exp.createdBy.fullName}}</p>
        <div class="seller-img">
            <img :src="exp.createdBy.imgUrl" height="40px"/>    
        <div>
        <p class="exp-desc">{{exp.shortDesc}}</p> 
        <span class="exp-price"></span>
        <span class="exp-rate">{{averageRate}}</span>
        </router-link>
        <router-link v-if="seller" :to="'/exp/edit/' + exp._id"><span class="edit"> Edit</span></router-link>
    </li>
        

  </section>
</template>

<script>


export default {
  props:['exp','user'],
    data(){
        return {

        }
    },
    computed:{
        seller(){
            this.user._id === this.exp.createdBy._id
        }
    },
    methods:{
        // not belong to here - go to store maybe
            averageRate(){
                var sum;
                this.exp.reviews.forEach(review =>{
                    sum += review.rate
                })
                return sum / this.exp.reviews.length
            }

        
    },
    components: {

    }
}
</script>