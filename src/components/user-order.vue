<template>
    <section>
        <p>{{ord.exp.title}}</p>
        <button @click="writeReview(ord.exp._id)">
            <i class="el-icon-edit-outline"> Write a review</i>
        </button>
        <ul class="ord-location-date">
          <li>{{ord.exp.location}}</li>
          <li>{{expDate}}</li>
        </ul>
   </section>
</template>

<script>
import moment from "moment";
export default {
    props: ['ord'],
    name:'user-order',
    computed: {
        datePass(){
          return (Date.now() > this.ord.exp.date)
        },
       expDate(){
           return moment(this.ord.exp.date).format('DD/MM/YY')    
        } 
    },
    methods:{
        writeReview(expId){
            this.$emit('writeReview', expId)
        }
    }
}
</script>