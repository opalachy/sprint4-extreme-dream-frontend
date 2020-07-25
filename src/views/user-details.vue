<template>
  <section class="user-details" v-if="user">
    <div class="user-details-container">
      <!-- <router-link to="/">
          <i class="el-icon-edit-outline">Edit your profile</i>
      </router-link>-->

      <img v-if="user.imgUrl" :src="user.imgUrl" />
      <i v-else class="el-icon-user"></i>

      <div class="user-details-name-info">
        <h2>{{user.fullName}}</h2>
        <p>{{user.info}}</p>
      </div>
      <button class="add-exp-btn" @click="add">Add Activity</button>
    </div>

    <div class="user-order-activities">
      <div v-if="creator" class="orders-list-container">
        <h4>Your orders:</h4>
        <ul class="orders-list">
          <li v-if="ords" class="order" v-for="ord in ords" :key="ord._id">
            <user-order :ord="ord" />
          </li>
        </ul>
      </div>

      <div v-if="exps" class="activities-list-container">
        <h4 class="activities-list-header">Your Activities:</h4>
        <ul class="activities-list">
          <li class="activity" v-for="exp in exps" :key="exp._id">
            <p @click="routActivity()">{{exp.title}}</p>  
            <button v-if="creator" class="add-exp-btn" @click="edit(exp._id)">
              <i class="el-icon-edit-outline"></i>
            </button>
            <button v-if="creator" class="delete-exp-btn" @click="remove(exp._id)">
              <i class="el-icon-delete"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <bar-chart class="chart" v-if="loaded" :cData="cData" :cLabels="cLabels" />
    <button
      type="button"
      @click="hasHistory() ? $router.go(-1) : $router.push('/')"
      class="back-btn"
    >&laquo; Back</button>
  </section>
</template>



<script>
import { expService } from "../services/exp.service.js";
import { userService } from "../services/user.service.js";
import reviewDetails from "./review-details.vue";
import { orderService } from "../services/order.service.js";
import userOrder from "../components/user-order.vue";
import barChart from "../components/bar-chart.vue";

export default {
  name: "user-details",
  data() {
    return {
      exps: [],
      loggedinUser: null,
      user: null,
      ords: [],
      loaded: false,
      cData: null,
      cLabels: null,
    };
  },
  computed: {
    creator() {
      if (!this.loggedinUser) return false;
      return this.user._id === this.loggedinUser._id;
    },
  },
  methods: {
    hasHistory() {
      return window.history.length > 2;
    },
    add() {
      this.$router.push("/exp/edit");
    },
    edit(id) {
      this.$router.push(`/exp/edit/${id}`);
    },
    writeReview(id) {
      this.$router.push(`/order/${id}`);
    },
    async remove(id) {
      try {
        await this.$store.dispatch({ type: "removeExp", id });
      } catch (err) {
        console.log("error:", err);
      }
    },
  },
  async created() {
    this.loaded = false;
    const userId = this.$route.params.id;
    this.user = await userService.getById(userId);
    this.loggedinUser = this.$store.getters.loggedinUser;
    try {
      // const { userlist } = await fetch('/api/userlist')
      const userExps = await expService.getExps({ userId: userId });
      this.exps = userExps;
      const data = this.exps.map((exp) => {
        const tickets = exp.participants.reduce((acc, participant) => {
          return acc + participant.numOfTickets;
        }, 0);
        return tickets;
      });
      this.cData = data;
      console.log(this.cData);
      const activity = this.exps.map((exp) => {
        return exp.title;
      });
      this.cLabels = activity;
      const totalNumTickets = data.reduce((acc, tickets) => {
        return acc + tickets;
      }, 0);
      console.log(totalNumTickets);
      this.loaded = totalNumTickets > 0 ? true : fale;
    } catch (err) {
      console.log("ERROR: cannot find exps");
      throw err;
    }
    const userOrds = await orderService.getOrders(userId);
    this.ords = userOrds;
  },
  components: {
    reviewDetails,
    userOrder,
    barChart,
  },
};
</script>
    
