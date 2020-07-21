<template>
    <section class="user-profile">
        <h3 class="welcome-user">Welcome {{loggedinUser.fullName}}</h3>
         <ul class="user-profile-info">
            <router-link to="/"><i class="el-icon-edit-outline">Edit your profile</i></router-link>
            <li>Full Name: {{user.fullName}}</li>
            <li>About You: {{user.info}}</li>
            <label>Password: <input type="password" v-model="value" /></label>
            <li>Profile Photo: <img style="height: 50px; width: 50px; borderRadius: 50%;" src="https://glimakra.com/wp-content/uploads/2017/08/Johan-Kauppi-Designer-Portrait-2017.jpg" alt=""><i v-if="!user.imgUrl" class="el-icon-user"></i></li>
          </ul>
        <h4>Your orders</h4>
        <button v-if="creator" class="add-exp-btn" @click="add">
            <h4>Add Activity</h4>
        </button>
        <h4 class="activities-list-header">Your Activities:</h4>
        <ul class="activities-list">
            <li v-if="exps" class="activity" v-for="exp in exps" :key="exp._id" :exp="exp">
                {{exp.title}}
                <button v-if="creator" class="add-exp-btn" @click="edit(exp._id)">
                    <h4>Edit</h4>
                </button>
                <button v-if="creator" class="add-exp-btn" @click="remove(exp._id)">
                    <h4>Delete</h4>
                </button>
                <!-- </router-link> -->
            </li>
        </ul>
        <button type="button" @click="hasHistory() ? $router.go(-1) : $router.push('/')" class="my-5 btn btn-outline-success">
      &laquo; Back
    </button>
    </section>
</template>

<script>
import { expService } from "../services/exp.service.js";
import { userService } from "../services/user.service";
import { orderService } from "../services/order.service";
export default {
  name: "user-profile",
  data() {
    return {
      exps: "",
      loggedinUser: "",
      user: "",
      value:''
    };
  },
  computed: {
    creator() {
      return this.user._id === this.loggedinUser._id ? true : false;
    }
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
    console.log("user: ", this.user);
    console.log("userId: ", this.user._id);
    this.loggedinUser = this.$store.getters.loggedinUser;
    console.log("loggedinUser: ", this.loggedinUser._id);
    const sellerExps = await expService.getSellerExps({ sellerId: userId });
    const userOrds = await oredrService.getOrdersById(userId);
    // console.log("exp id: ", myExps[0]._id);
    console.log("sellerExps", sellerExps);
    this.exps = sellerExps;
    this.value = this.user.password 
  }

}
</script>
    