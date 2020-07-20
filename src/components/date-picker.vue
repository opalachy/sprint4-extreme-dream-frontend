
<template>
  <div class="block">
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="Add date">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    props: ['date'],
    data() {
      return {
        value: this.date,
      }
    },
  watch: {
     value(){
        this.$emit('setDay' , this.value)
     }
  },
}
</script>