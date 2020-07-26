<template>
  <section class="user-details" v-if="user">
    <div class="user-details-container">
      <img class="user-details-img" v-if="user.imgUrl" :src="user.imgUrl" />
      <i v-else class="el-icon-user"></i>

      <div class="user-details-name-info">
        <h2>{{user.fullName}}</h2>
        <p>{{user.info}}</p>
      </div>
      <button class="add-exp-btn" @click="add">Add Activity</button>
    </div>

    <div class="user-order-activities">
      <div v-if="creator" class="orders-list-container">
        <h4>Orders:</h4>
        <ul class="orders-list">
          <li v-if="ords" class="order" v-for="ord in ords" :key="ord._id">
            <user-order @writeReview="writeReview" :ord="ord" />
          </li>
          <router-link v-else to="/exp">No Orders Yet, Go Choose The First One</router-link>
        </ul>
      </div>

      <div v-if="exps" class="activities-list-container">
        <h4 class="activities-list-header">Activities:</h4>
        <ul class="activities-list">
          <li class="activity" v-for="exp in exps" :key="exp._id">
            <user-activity :exp="exp" @delete="remove" @edit="edit" :creator="creator" @loadUser="loadUser"/>
          </li>
        </ul>
      </div>
    </div>
    <!-- <bar-chart
      class="chart"
      v-if="loaded"
      :cData="cData"
      :cLabels="cLabels"
      :width="300"
      :height="400"
    /> -->
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
import userActivity from "../components/user-activity.vue";
import barChart from "../components/bar-chart.vue";


export default {
  name: "user-details",
  data() {
    return {
      exps: [],
      loggedinUser: null,
      user: null,
      ords: [],
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
    writeReview(expId) {
      this.$router.push(`/order/${expId}`);
    },
    async remove(id) {
      try {
        await this.$store.dispatch({ type: "removeExp", id });
      } catch (err) {
        console.log("error:", err);
      }
    },
    async loadUser(userId) {
      this.loaded = false;
      // const userId = this.$route.params.id;
      this.user = await userService.getById(userId);
      this.loggedinUser = this.$store.getters.loggedinUser;
      try {
        const userExps = await expService.getExps({ userId: userId });
        this.exps = userExps;
        const data = this.exps.map((exp) => {
          const tickets = exp.participants.reduce((acc, participant) => {
            return acc + participant.numOfTickets;
          }, 0);
          return tickets;
        });
        this.cData = data;
        const activity = this.exps.map((exp) => {
          return exp.title;
        });
        this.cLabels = activity;
        const totalNumTickets = data.reduce((acc, tickets) => {
          return acc + tickets;
        }, 0);
        this.loaded = totalNumTickets > 0 ? true : false;
      } catch (err) {
        console.log("ERROR: cannot find exps");
        throw err;
      }
      const userOrds = await orderService.getOrders(userId);
      this.ords = userOrds;
    },
  },
  created(){
    const userId = this.$route.params.id;
    this.loadUser(userId)
  },
  components: {
    reviewDetails,
    userOrder,
    barChart,
    userActivity,
  },
};
</script>
    
