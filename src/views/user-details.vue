<template>
    <section class="user-details" v-if="user" >
        <div class="user-details-container">
            <ul class="user-profile-info">
                <router-link to="/">
                    <i class="el-icon-edit-outline">Edit your profile</i>
                </router-link>
                <li>Full Name: {{user.fullName}}</li>
                <li>{{user.info}}</li>
                <li>
                    Profile Photo:
                    <img
                        v-if="user.imgUrl"
                        style="height: 30px; width: 30px; borderRadius: 50%;"
                        :src="user.imgUrl"
                        alt
                    />
                    <i v-else class="el-icon-user"></i>
                </li>
            </ul>
        </div>
        <div v-if="creator" class="orders-list-container">
            <h4>Your orders:</h4>
            <ul class="orders-list">
                <li
                    v-if="ords"
                    class="order"
                    v-for="ord in ords"
                    :key="ord._id"
                >{{ord.exp.title}} <button @click="writeReview(ord.exp._id)"><i class="el-icon-edit-outline">Write a review</i></button></li>
                
            </ul>
            <button class="add-exp-btn" @click="add">
                <h4>Add Activity</h4>
            </button>
        </div>
        <div v-if="exps" class="activities-list-container">
            <h4 class="activities-list-header">Your Activities:</h4>
            <ul class="activities-list">
                <li class="activity" v-for="exp in exps" :key="exp._id" >
                    {{exp.title}}
                    <button v-if="creator" class="add-exp-btn" @click="edit(exp._id)">
                        <h4>Edit</h4>
                    </button>
                    <button v-if="creator" class="add-exp-btn" @click="remove(exp._id)">
                        <h4>Delete</h4>
                    </button>
                </li>
            </ul>
        </div>
        <button
            type="button"
            @click="hasHistory() ? $router.go(-1) : $router.push('/')"
            class="my-5 btn btn-outline-success"
        >&laquo; Back</button>
        <chart v-if="creator" :dataExp="dataExp" :expTitle="expTitle" />
    </section>
</template>

<script>
import { expService } from "../services/exp.service.js";
import { userService } from "../services/user.service.js";
import reviewDetails from "./review-details.vue";
import { orderService } from "../services/order.service.js";

import chart from "../components/chart.vue";
export default {
  name: "user-details",
  data() {
    return {
      exps: [],
      loggedinUser: null,
      user: null,
      ords: [],
      dataExp: [],
      expTitle:[]
    };
  },
  computed: {
    creator() {
      return  this.user._id === this.loggedinUser._id
    }
    
  },
  methods: {
    chartData(){
      this.dataExp = this.exps.map(exp => {
         return exp.participants.length
      })
      console.log(this.dataExp)
      this.expTitle = this.exps.map(exp => {
        return exp.title
      })
      console.log(this.expTitle)
    },
    hasHistory() {
      return window.history.length > 2;
    },
    add() {
      this.$router.push("/exp/edit");
    },
    edit(id) {
      this.$router.push(`/exp/edit/${id}`);
    },
    writeReview(id){
      console.log(id)
      this.$router.push(`/order/${id}`)
    },
    async remove(id) {
      try {
        await this.$store.dispatch({ type: "removeExp", id });
      } catch (err) {
        console.log("error:", err);
      }
    }
  },
  async created() {
    const userId = this.$route.params.id;
    this.user = await userService.getById(userId);
    this.loggedinUser = this.$store.getters.loggedinUser;
    const userExps = await expService.getExps({ userId: userId });
    const userOrds = await orderService.getOrders(userId);
    this.exps = userExps;
    this.ords = userOrds;
    this.chartData();
  },
  components: {
    reviewDetails,
    chart
  }
}

// Things that are only for guides / sellers and loggedinUser.id === params.id: edit button on UserExps, navigation to Dashboard
</script>
    
