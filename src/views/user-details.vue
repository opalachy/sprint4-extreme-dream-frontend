<template>
  <section v-if="user" class="user-profile">
      <img
        v-if="user.imgUrl"
        style="height: 50px; width: 50px; borderRadius: 50%;"
        :src="user.imgUrl"
        alt
      />
      <i v-else class="el-icon-user"></i>
      <ul class="user-profile-info">
        <!-- <router-link to="/">
              <i class="el-icon-edit-outline">Edit your details</i>
        </router-link>-->
        <li>Full Name: {{user.fullName}}</li>
        <li>About You: {{user.info}}</li>
      </ul>

    <div v-if="creator" class="order-list-creator-container">
        <h4 v-if="creator">Your orders:</h4>
        <ul class="orders-list">
          <li v-if="ords" class="order" v-for="ord in ords" :key="ord._id" :ord="ord">{{ord.exp.title}}</li>
        </ul>
        <button class="add-exp-btn" @click="add">
          <h4>Add Activity</h4>
        </button>
    </div>

    <div v-if="exps" class="activities-container">
      <h4 class="activities-list-header">Your Activities:</h4>
      <ul class="activities-list">
        <li class="activity" v-for="exp in exps" :key="exp._id" :exp="exp">
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
    <!-- <chart v-if="creator" :dataExp="dataExp" :expTitle="expTitle" /> -->
  </section>
</template>

<script>
import { expService } from "../services/exp.service.js";
import { userService } from "../services/user.service.js";
import { orderService } from "../services/order.service.js";
// import chart from "../components/chart.vue";
export default {
  name: "user-details",
  data() {
    return {
      exps: [],
      loggedinUser: null,
      user: null,
      ords: [],
      // dataExp: [],
      // expTitle:[]
    };
  },
  computed: {
    creator() {
      console.log(this.user._id)
      console.log(this.loggedinUser._id)
      return  this.user._id === this.loggedinUser._id ? true: false 
    },
    // chartData(){
    //   this.exps.forEach(exp => {
    //      this.dataExp.push(exp.participants.length)
    //   })
    //   console.log(this.dataExp)
    //   this.exps.forEach(exp => {
    //      this.expTitle.push(this.expTitle)
    //   })
    // }
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
    const userExps = await expService.getUserExps({ userId: userId });
    const userOrds = await orderService.getOrders(userId);
    this.exps = userExps;
    this.ords = userOrds;
    // this.chartData();
  },
  components: {
    // chart
  }
}
// Things  that are for everyone to see: "sellerExps" = UserExps
// Things that are for loggedinUser.id === params.id: orderExps
// Things that are only for guides / sellers and loggedinUser.id === params.id: edit button on UserExps, navigation to Dashboard
</script>
    
