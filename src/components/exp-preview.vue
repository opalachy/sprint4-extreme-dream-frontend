<template>
  <li @click="details" class="exp-preview">
    <div class="preview-img">
      <img :src="exp.imgUrls[0]" style="width: 100%;" />
    </div>
    <p class="exp-title">{{exp.title}}</p>
    <p class="exp-creator">{{exp.createdBy.fullName}}</p>
    <img
      class="seller-img"
      :src="exp.createdBy.imgUrl"
      style="width: 50px; height: 50px; border-radius: 50%"
    />
    <p class="exp-desc">{{exp.shortDesc}}</p>
    <div class>
      <p class="exp-price"></p>
      <p class="exp-rate">{{averageRate}}</p>
    </div>
    
  </li>
</template>

<script>
export default {
  props: ["exp"],
  data() {
    return {};
  },
  computed: {
    averageRate() {
        let sum = this.exp.reviews.reduce((acc, review) => {
            return acc + review.rate;
        }, 0);
        return (sum / this.exp.reviews.length).toFixed(1);
        
    }
  },
  methods: {
    // not belong to here - go to store maybe
    details() {
      this.$router.push("/exp/" + this.exp._id);
    }
  },
  components: {}
};
</script>