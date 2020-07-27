
<template>
  <div class="exp-book">
    <p class="exp-book-price-header">
      <span v-if="origPrice" class="exp-book-origPrice">${{exp.origPrice}}</span>
      <span class="exp-book-currPrice"> ${{exp.currPrice}}/</span>
      <span class="exp-book-person">person</span>
    </p>
    <div class="exp-book-selector-amount-wrapper">

    <select-capacity
      :numberOfSoldTickets="numberOfSoldTickets"
      :capacity="exp.capacity"
      @setTicket="setTicket"
    />
    <p class="exp-book-price">{{bookPrice}}</p>
    </div>
    <p v-if="bookingIsDone">Thank you for buying</p>
    <el-button :class="{offbooked: isBooking}" class="book-btn" @click.once="book" >
      <span v-if="show">Book</span>
      <i v-else class="el-icon-loading"></i>
    </el-button>
  </div>
</template>

<script>
import datePicker from "./date-picker.vue";
import selectCapacity from "./select-capacity.vue";


export default {
  props: ["exp"],
  data() {
    return {
      booking: {
        dayPicker: null,
        numOfTickets: 1
      },
      numberOfSoldTickets: 0,
      isBooking: false,
      show:true,
      bookingIsDone:false
    };
  },
  methods: {
    book() {
      if(this.isFull) return
      this.show = false;
      setTimeout(() => {
        this.isBooking = true
        this.show = true;
        this.bookingIsDone = true
        this.$emit("booking", this.booking);
      }, 1500);
    },
    setDay(day) {
      this.booking.dayPicker = day.getTime();
    },
    setTicket(numOfTickets) {
      this.booking.numOfTickets = numOfTickets;
    },

  },
  computed: {
    bookPrice() {
      return "$" + this.exp.currPrice * this.booking.numOfTickets;
    },
    origPrice() {
      if (+this.exp.origPrice > +this.exp.currPrice) return true;
    },
    isFull(){   
      return (this.numberOfSoldTickets === this.exp.capacity)
    },
  },
  components: {
    datePicker,
    selectCapacity
  },
  created() {
       this.numberOfSoldTickets = this.exp.participants.reduce((acc , participant) => {
        return acc + participant.numOfTickets
      }, 0);
      console.log(this.numberOfSoldTickets)
      if(this.isFull) this.isBooking = true
  }
};
</script>


