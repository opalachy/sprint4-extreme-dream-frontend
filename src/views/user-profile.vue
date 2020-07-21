<template>
    <section class="user-profile">
        <h3 class="welcome-user">Welcome {{loggedinUser.fullName}}</h3>
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
    </section>
</template>

<script>
import { expService } from "../services/exp.service.js";
import { userService } from "../services/user.service";
export default {
    name: "user-profile",
    data() {
        return {
            exps: "",
            loggedinUser: "",
            user: ""
        };
    },
    computed: {
        creator() {
            return this.user._id === this.loggedinUser._id ? true : false;
        }
    },
    methods: {
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
        // console.log("exp id: ", myExps[0]._id);
        console.log("sellerExps", sellerExps);
        this.exps = sellerExps;
    }
};
</script>
    