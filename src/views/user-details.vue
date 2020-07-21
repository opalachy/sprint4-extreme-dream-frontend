<template>
    <section class="user-details" v-if="user">
        <div class="user-details-container">
            <ul class="user-profile-info">
                <router-link to="/">
                    <i class="el-icon-edit-outline">Edit your profile</i>
                </router-link>
                <li>Full Name: {{user.fullName}}</li>
                <li>About You: {{user.info}}</li>
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
        <div v-if="creator" class="ordes-container">
        <h4>Your orders</h4>
          </div>
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
        <button
            type="button"
            @click="hasHistory() ? $router.go(-1) : $router.push('/')"
            class="my-5 btn btn-outline-success"
        >&laquo; Back</button>
    </section>
</template>

<script>
import { expService } from "../services/exp.service.js";
import { userService } from "../services/user.service";
import { orderService } from "../services/order.service";
export default {
    name: "user-details",
    data() {
        return {
            exps: null,
            loggedinUser: null,
            user: null
            // value:''
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
        this.loggedinUser = this.$store.getters.loggedinUser;
        console.log('loogedin: ', this.loggedinUser);
        const sellerExps = await expService.getSellerExps({ sellerId: userId });
        // const userOrds = await oredrService.getOrdersById(userId);
        // console.log("exp id: ", myExps[0]._id);
        console.log("sellerExps", sellerExps);
        this.exps = sellerExps;
    }
};
</script>
    