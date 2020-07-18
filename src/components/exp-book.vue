
<template>
  <div class="exp-book">
    <!-- <h2>Choose</h2> -->
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
        dayPicker: null,
        numOfTicket: 1
      }
    },
    methods:{
      book(){
        if(!this.dayPicker) return
        console.log('numOfTicket: ' , this.numOfTicket ,'DAYPICKER: ' ,this.dayPicker)
      },
      setDay(day){
        this.dayPicker = day
        // this.dayPicker = day.getTime();
        console.log(this.dayPicker)
      },
      setTicket(numOfTicket){
        this.numOfTicket = numOfTicket;
      }
    },
    computed: {
      bookPrice(){
         return '$' + this.exp.currPrice * this.numOfTicket 
      }
    },
    components: {
       datePicker,
       selectCapacity
   },
}
</script>