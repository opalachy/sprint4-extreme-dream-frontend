<template>
    <li @click="details"  class="exp-preview">
        <div class="preview-img">
            <img  :src="exp.imgUrls[0]" style="width: 400px;" />
        </div>
        <p class="exp-title">{{exp.title}} </p>
        <p class="exp-creator">{{exp.createdBy.fullName}}</p>
            <img class="seller-img" :src="exp.createdBy.imgUrl" style="width: 50px; height: 50px; border-radius: 50%" />    
        <p class="exp-desc">{{exp.shortDesc}}</p> 
        <div class="">
            <p class="exp-price"></p>
            <p class="exp-rate">{{averageRate}}</p>
        </div>
        <!-- <router-link v-if="seller" :to="'/exp/edit/' + exp._id"><span class="edit"> Edit</span></router-link> -->
        <router-link  :to="'/exp/edit/' + exp._id"><span class="edit"> Edit</span></router-link>
    </li>
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
            },
            details(){
                this.$router.push('/exp/'+ this.exp._id)
            }


        
    },
    components: {

    }
}
</script>