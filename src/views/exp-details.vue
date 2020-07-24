<template>
    <section v-if="exp" class="exp-details">
        <!-- <div v-if="bookedNow"  class="booked-now">
            <p> The purchase was successful </p>  
            <button @click="closeBookingMsg">Close</button>
        </div> -->
        
        
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
                <p class="exp-details-desc">{{exp.desc}}</p>
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
import socket from "../services/socket.service.js";

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
       async booking(booked) {
            this.bookedNow = true
            setTimeout(() => {
                this.bookedNow = false
            }, 7000)
            const user = this.$store.getters.loggedinUser;
            await this.$store.dispatch({
                type: "booking",
                booked,
                exp: this.exp,
                user
            });
            socket.emit('booking' , this.exp.createdBy._id)
        },
        closeBookingMsg(){
            this.bookedNow = false
        }
    },
    async created() {
        const expId = this.$route.params.id;
        this.exp = await expService.getById(expId);
        socket.setup()
        socket.on('update exp' ,async (msg) => {
            this.exp = await expService.getById(expId);
        });
    },
    components: {
        expBook,
        expReview
    }
};
</script>


<style  scoped>
/* .booked-now {
  width: 200px;
  height: 200px;
  background-color: aqua;
  position: fixed;
  font-size: 30px;
} */

</style>