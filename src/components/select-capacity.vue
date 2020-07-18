<template>
  <el-select v-model="value" placeholder="1 Ticket">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    props: ['participants' , 'capacity'],
    data() {
      return {
        options: [{
          value: 1,
          label: '1 Ticket',
          disabled: false
        }, {
          value: 2,
          label: '2 Tickets',
          disabled: false
        }, {
          value: 3,
          label: '3 Tickets',
           disabled: false
        }, {
          value: 4,
          label: '4 Tickets',
          disabled: false
        }, {
          value: 5,
          label: '5 Tickets',
          disabled: false
        }],
        value: 1,
      }
    },
    created(){
      const numberOfSoldTickets = this.participants.reduce((acc , participant) => {
          return acc + participant.numOfTickets
      }, 0);
      const numberOfAvailableTickets =  this.capacity - numberOfSoldTickets;
      this.options = this.options.map((option) => {
        option.disabled  = (option.value > numberOfAvailableTickets) ? true : false;
        return option
      })
    },
     watch: {
     value(){
        this.$emit('setTicket' , this.value)
     }
  },
}
</script>
