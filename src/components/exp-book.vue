
<template>
  <div class="exp-book">
    <!-- <date-picker @setDay="setDay" /> -->
    <p class="exp-book-price-header">
      <span v-if="origPrice" class="exp-book-origPrice">${{exp.origPrice}}</span>
      <span class="exp-book-currPrice"> ${{exp.currPrice}}</span>/
      <span class="exp-book-person">person</span>
    </p>
    <div class="exp-book-selector-amount-wrapper">

    <select-capacity
      :participants="exp.participants"
      :capacity="exp.capacity"
      @setTicket="setTicket"
    />
    <p class="exp-book-price">{{bookPrice}}</p>
    </div>
    <p v-if="bookingIsDone">Thank you for buying</p>
    <el-button :class="{offbooked: isBooking}" class="book-btn" @click.once="book">
      <span v-if="show">Book</span>
      <i v-else class="el-icon-loading"></i>
    </el-button>
    <!-- <button @click="book">Really your dream</button> -->
  </div>
</template>

<script>
import datePicker from "./date-picker.vue";
import selectCapacity from "./select-capacity.vue";
// import socket from "../services/socket.service.js"

// import elButton from
export default {
  props: ["exp"],
  data() {
    return {
      booking: {
        dayPicker: null,
        numOfTickets: 1
      },
      isBooking: false,
      show:true,
      bookingIsDone:false
    };
  },
  methods: {
    book() {
      this.$emit("booking", this.booking);
      this.show = false;
      setTimeout(() => {
        this.isBooking = true
        this.show = true;
        this.bookingIsDone = true
      }, 1500);
      clearInterval;
    },
    // show() {
    //   return true;
    // },
    setDay(day) {
      this.booking.dayPicker = day.getTime();
    },
    setTicket(numOfTickets) {
      this.booking.numOfTickets = numOfTickets;
    }
  },
  computed: {
    bookPrice() {
      return "$" + this.exp.currPrice * this.booking.numOfTickets;
    },
    origPrice() {
      if (+this.exp.origPrice > +this.exp.currPrice) return true;
    },
  },
  components: {
    datePicker,
    selectCapacity
  },
  created() {}
};
</script>


