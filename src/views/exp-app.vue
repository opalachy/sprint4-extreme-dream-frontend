<template>
    <section class="exp-app exp-main">
        <h2 class="app-title">Our Experiences</h2>

        <!-- <div class="hero-img">
    <img src="" alt="Loading...">
        </div>-->

        <exp-filter @setFilter="setFilter" />
        <exp-list :exps="exps" :loggedinUser="loggedinUser" />
    </section>
</template>
 

<script>
import expList from "../components/exp-list.vue";
import expFilter from "../components/exp-filter.vue";

export default {
    name: "exp-app",
    computed: {
        exps() {
            return this.$store.getters.exps;
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser;
        }
    },
    methods: {
        setFilter(filterBy) {
            this.$store.commit({ type: "setFilter", filterBy });
            this.$store.dispatch({ type: "loadExps" });
        }
    },
    created() {
        this.$store.dispatch({ type: "loadExps" });
    },
    components: {
        expList,
        expFilter
    }
}
</script>

