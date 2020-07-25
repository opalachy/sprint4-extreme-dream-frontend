<template>
  <section>
    <p @click="routActivity()">{{exp.title}}</p>
  </section>
</template>

<script>
export default {
  props: ["exp"],
  name: "user-activity",
  methods: {
    routActivity() {
      this.$router.push("/exp/" + this.exp._id);
    },
  },
};
</script> 