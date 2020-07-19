<template>
    <section v-if="exp" class="exp-details">
        <div class="exp-details-container">
            <div class="exp-details-header">
                <h4 class="exp-details-title">{{exp.title}}</h4>
                <img
                    class="seller-img"
                    :src="exp.createdBy.imgUrl"
                    style="width: 50px; height: 50px; border-radius: 50%"
                />
            </div>
            <div class="img-container">
                <img v-for="img in exp.imgUrls" :src="img" alt />
            </div>
            <div class="exp-details-main">
                <p class="exp-details-desc">{{exp.desc}}</p>
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
                <h4 class="reviews-num">
                    <i class="el-icon-star-on"></i>
                    {{exp.reviews.length}} reviews
                </h4>
            </div>
        </div>
    </section>
</template>
 
<script>
import { expService } from "../services/exp.service.js";
import expBook from "../components/exp-book.vue";
import expReview from "../components/exp-review.vue";

export default {
    name: "exp-details",
    data() {
        return {
            exp: null
        };
    },
    computed: {},
    methods: {
        booking(booked) {
            const user = this.$store.getters.loggedinUser;
            this.$store.dispatch({
                type: "booking",
                booked,
                exp: this.exp,
                user
            });
        }
    },
    async created() {
        const expId = this.$route.params.id;
        const exp = await expService.getById(expId);
        this.exp = exp;
    },
    components: {
        expBook,
        expReview
    }
};
</script>
