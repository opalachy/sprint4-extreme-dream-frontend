
<template>
  <div class="exp-book">
      <date-picker @setDay="setDay" />
      <select-capacity :participants="exp.participants"  :capacity="exp.capacity" @setTicket="setTicket"/>
      <p>{{bookPrice}}</p>
      <el-button class="book-btn" @click.native="book">Really your dream</el-button>
      <!-- <button @click="book">Really your dream</button> -->
  </div>
</template>

<script>
import datePicker from './date-picker.vue';
import selectCapacity from './select-capacity.vue';
// import elButton from 
export default {
  props: ['exp'],
   data() {
      return {
        booking: {
          dayPicker: null,
          numOfTickets: 1
        }
      }
    },
    methods:{
      book(){
        this.$emit('booking' , this.booking)
      },
      setDay(day){
        this.booking.dayPicker = day.getTime()
      },
      setTicket(numOfTickets){
        this.booking.numOfTickets = numOfTickets;
      }
    },
    computed: {
      bookPrice(){
         return '$' + this.exp.currPrice * this.booking.numOfTickets 
      }
    },
    components: {
       datePicker,
       selectCapacity
   },
}
</script>
