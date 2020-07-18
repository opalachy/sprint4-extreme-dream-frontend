
<template>
  <div class="exp-book">
      <date-picker @setDay="setDay" />
      <h2>Number Of Tickets</h2>
      <select-capacity :participants="exp.participants"  :capacity="exp.capacity" @setTicket="setTicket"/>
      <p>{{bookPrice}}</p>
      <button @click="book">Really your dream</button>
  </div>
</template>

<script>
import datePicker from './date-picker.vue';
import selectCapacity from './select-capacity.vue';
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