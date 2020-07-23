<template>
    <section v-if="exp" class="exp-details">
        <div v-if="bookedNow"  class="booked">
            An invitation has just been placed for this experience    
        </div>
        <div class="exp-details-container">
            <div class="exp-details-header">
                <h4 class="exp-details-title">{{exp.title}}</h4>
                  <div class="seller-top">
                    <div class="name-rate">
                        <h4>{{exp.createdBy.fullName}}</h4>
                        <p class="exp-rate"><i class="el-icon-star-on"></i>{{averageRate}} ({{exp.reviews.length}})</p>
                    </div>
                      <img class="seller-img" :src="exp.createdBy.imgUrl" />
                  </div>
            </div>
            <div class="img-container">
                <img v-for="img in exp.imgUrls" :src="img" alt />
            </div>
            <h5 class="exp-details-shortDesc">{{exp.shortDesc}}</h5>
            <div class="exp-details-main">
            <div class="exp-descs-container">
                <p class="exp-details-desc">{{exp.desc1}}</p>
                <p class="exp-details-desc">{{exp.desc2}}</p>
                <p class="exp-details-desc">{{exp.desc3}}</p>
                <p class="exp-details-desc">{{exp.desc4}}</p>
                <p class="exp-details-desc">{{exp.desc5}}</p>
                </div>
                <exp-book @booking="booking" :exp="exp" />
            </div>
            <div class="exp-details-review-list">
                <ul class="review-list">
                    <exp-review v-for="review in exp.reviews" :key="review.id" :review="review" />
                </ul>
            </div>
            <hr />
            <div class="exp-details-guide-container">
                <div class="guide-details">
                    <img class="seller-img" :src="exp.createdBy.imgUrl" />
                    <h4>{{exp.createdBy.fullName}}</h4>
                </div>
                <h4 class="exp-details-guide-info">{{exp.createdBy.info}}</h4>
               <p class="exp-rate"><i class="el-icon-star-on"></i>{{averageRate}} ({{exp.reviews.length}}) reviews</p>
            </div>
        </div>
    </section>
</template>
 
<script>
import { expService } from "../services/exp.service.js";
import expBook from "../components/exp-book.vue";
import expReview from "../components/exp-review.vue";
import socket from "../services/socket.service.js"

export default {
    name: "exp-details",
    data() {
        return {
            exp: null,
            bookedNow: false
        };
    },
    computed: {
        averageRate() {
            if (this.exp.reviews.length === 0) return 
            let sum = this.exp.reviews.reduce((acc, review) => {
                return acc + review.rate;
            }, 0);
            return (sum / this.exp.reviews.length).toFixed(1);
        },
    },
    methods: {
        booking(booked) {
            const user = this.$store.getters.loggedinUser;
            this.$store.dispatch({
                type: "booking",
                booked,
                exp: this.exp,
                user
            });
            socket.emit('show to everyone booking' , 'gggggggg')
        },
    },
    async created() {
        socket.setup()
        socket.on('booking' , msg => {
            this.bookedNow = true
           setTimeout(async () =>{
            this.bookedNow = false
            this.exp = await expService.getById(expId);
            }, 3000)
        });
        const expId = this.$route.params.id;
        this.exp = await expService.getById(expId);
    },
    components: {
        expBook,
        expReview
    }
};
</script>


<style  scoped>
.booked{
  width: 400px;
  height: 400px;
  background-color: aqua;
  position: fixed;
}

</style>