<template>
    <section class="home-page">
        <div class="hero-img">
          <div class="search-container">
            
                <input list="exp-list" placeholder="What Is Your Favor Experience"/>
                <datalist id="exp-list">
                    <option value="Ski" />
                    <option value="Sky Diving" />
                    <option value="Bunjee" />
                    <option value="Diving" />
                    <option value="Surffing" />
                </datalist>
          
            <button class="search-btn" @click="searchExp()">Search</button>
          </div>
            
        </div>
        <div class="cards-container">
            <div class="type-container">
                <h2>Best Sellers</h2>
                <button @click="goToPopular">See All</button>
            </div>
            <exp-list v-if="bestExps" :exps="bestExps" />
            <div class="type-container">
                <h2>Popular Ski Experience</h2>
                <button @click="goToSki">See All</button>
            </div>
            <exp-list v-if="popSki" :exps="popSki" />
            <div class="type-container">
                <h2>Popular In France</h2>
                <button @click="goToFrance">See All</button>
            </div>
            <exp-list v-if="popFrance" :exps="popFrance" />
        </div>
    </section>
</template>

<script>
// @ is an alias to /src
import expList from "../components/exp-list.vue";

export default {
    name: "Home-page",
    data() {
        return {
            bestExps: null,
            popSki: null,
            popFrance: null
        };
    },
    methods:{
        goToSki(){
          this.$router.push('/exp')
        },    
        goToFrance(){
          this.$router.push('/exp')
        },    
        goToPopular(){
          this.$router.push('/exp')
        },    
           
    },
    async created() {
        const exps = await this.$store.dispatch({ type: "loadExps" });
        const currExps = exps.slice(0, 3);
        this.bestExps = currExps;
        this.popSki = currExps;
        this.popFrance = currExps;
    },
    components: {
        expList
    }
};
</script>
