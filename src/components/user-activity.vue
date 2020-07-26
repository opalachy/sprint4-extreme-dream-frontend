<template>
  <section class="user-activity">
    <h4 class="user-activity-title" @click="routActivity()">{{exp.title}} starting at {{expDate}}</h4>
    <button v-if="creator" class="add-exp-btn" @click="edit(exp._id)">
      <i class="el-icon-edit-outline"></i>
    </button>
    <button v-if="creator" class="delete-exp-btn" @click="remove(exp._id)">
      <i class="el-icon-delete"></i>
    </button>
    <ul>
      <li v-if="isParticipant" v-for="participant in this.exp.participants" :key="participant._id">
        <p @click="routUser(participant._id)" class="name-num-tickets"><span class="user-activity-user-name">-{{participant.fullName}}</span> ordered {{participant.numOfTickets}} {{(participant.numOfTickets>1)? 'tickets': 'ticket'}} on <span>{{ participant.createdAt | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span> </p>
      </li>
    </ul>
  </section>
</template>

<script>
import moment from "moment";
export default {
  props: ["exp", 'creator'],
  name: "user-activity",
  data() {
    return {};
  },
  methods: {
    routActivity() {
      this.$router.push("/exp/" + this.exp._id);
    },
    edit(expId){
      this.$emit('edit', expId)
    },
    delete(expId){
      this.$emit('delete', expId)
    },
    routUser(id){
      this.$emit('loadUser', id)
      // this.$router.push('/')
      // setTimeout(()=> {
      //   this.$router.push(`/user/${id}`)

      // },500) 
    }
  },
  computed: {
    expDate() {
      return moment(this.exp.date).format("DD/MM/YY");
    },
    isParticipant() {
      return this.exp.participants.length > 0;
    },
  },
};

// <router-link :to="'/user/' + participant._id"></router-link>
</script> 