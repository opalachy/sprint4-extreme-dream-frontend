<template>
    <li  class="exp-preview container">
    
          
        <div @click="details" class="exp-preview-img">
            <img :src="exp.imgUrls[0]"  />
        </div>

        <div class="exp-preview-title-seller">
            <!-- <h4 class="exp-title">{{exp.title}}</h4> -->
            <router-link :to="`/user/${exp.createdBy._id}`" class="preview-seller">
                <img class="seller-img" :src="exp.createdBy.imgUrl" />
                <h4 class="preview-creator">{{exp.createdBy.fullName}}</h4>
            </router-link>
            <p class="exp-rate"><i class="el-icon-star-on"></i>{{averageRate}} ({{ratesCounter}})</p>
        </div>
             
        <div class="exp-preview-type-ticket">
            <h4 class="exp-type">{{exp.location}}</h4>
            <button v-if="seller" class="edit" @click.stop="edit">Edit</button>
            <h4 class="preview-left">{{left}}/{{exp.capacity}} left</h4>
        </div>
        <!-- @book="book" -->
        <p class="exp-preview-desc">{{exp.shortDesc}}</p>

        <div class="exp-preview-price-stars-rate">
            <p class="exp-price">${{exp.currPrice}}</p>
            <button v-if="seller" class="edit" @click.stop="removeExp">Delete</button>
        </div>
    </li>
</template>

<script>
export default {
    props: ["exp", "loggedinUser"],
    computed: {
        averageRate() {
            if (this.exp.reviews.length === 0) return 
            let sum = this.exp.reviews.reduce((acc, review) => {
                return acc + review.rate;
            }, 0);
            return (sum / this.exp.reviews.length).toFixed(1);
        },
        left() {
            const totalSoldTickets = this.exp.participants.reduce(
                (acc, participant) => {
                    return acc + participant.numOfTickets;
                },
                0
            );
            return this.exp.capacity - totalSoldTickets;
        },
        ratesCounter() {
            return this.exp.reviews.length;
        },
        // seller() {
        //     this.loggedinUser.fullName === this.exp.createdBy.fullName
        // }
    },
    methods: {
        details() {
            this.$router.push("/exp/" + this.exp._id);
        },
        async removeExp() {
            console.log(this.exp._id);
            await this.$store.dispatch({ type: "removeExp", id: this.exp._id });
            this.$router.push("/");
        },
        edit() {
            this.$router.push("/exp/edit/" + this.exp._id);
        }
    },
    components: {}
};
</script>
