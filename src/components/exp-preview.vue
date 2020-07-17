<template>
  <li @click="details" class="exp-preview container">
    <div class="exp-preview-img" v-bind:style="{ backgroundImage: 'url(' + exp.imgUrls[0] + ')' }"></div>
    <div class="exp-preview-title-seller"> 
        <h4 class="exp-title">{{exp.title}}</h4>
        <div class="preview-seller">
            <h4 class="preview-creator">{{exp.createdBy.fullName}}</h4>
            <img
              class="seller-img"
              :src="exp.createdBy.imgUrl"
              style="width: 50px; height: 50px; border-radius: 50%"
            />
        </div>
    </div>    

    <div class="exp-preview-type-ticket"> 
        <h4 class="exp-type">{{exp.type}}</h4>
        <h4 class="preview-creator" @book="book">{{remain}} tickets left out of {{exp.capacity}}</h4> <!-- //Todo: Book -->
    </div>  

    <p class="exp-preview-desc">{{exp.shortDesc}}</p>

    <div class="exp-preview-price-stars-rate">
      <p class="exp-price">${{exp.currPrice}}</p>
      <p class="exp-rate"><i class="el-icon-star-on"></i>{{averageRate}}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: ["exp"],
  data() {
    return {
      remain: this.exp.capacity
    }
  },
  computed: {
    averageRate() {
        let sum = this.exp.reviews.reduce((acc, review) => {
            return acc + review.rate;
        }, 0);
        return (sum / this.exp.reviews.length).toFixed(1);   
    },
    book(){
      this.remain = this.exp.capacity - this.exp.participants.length
    }
  },
  methods: {
    details() {
      this.$router.push("/exp/" + this.exp._id);
    }
  },
  components: {

  }
}
</script>
