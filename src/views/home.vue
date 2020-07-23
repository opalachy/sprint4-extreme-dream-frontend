<template>
    <section class="home-page">
        <div class="hero-img"> 
            <div class="app-title">  
              <h1 class="ex-dream">ExDreme</h1>  
              <h2>Outdoor experiences around the world</h2>  
            </div>
          <div class="search-container">
                <input v-model="choosedType" list="exp-list" placeholder="Choose your next Experience"/>
                <datalist  id="exp-list">
                    <option v-for="type in expTypes" :key="type" :value="type" />
                </datalist>
          
            <button class="search-btn" @click="searchExp()"><i class="fas fa-search"></i> </button>
          </div>
            
        </div>
        <div class="cards-container">

            <!-- <template v-for="topic in topics">
                <div class="type-container">
                    <h2>{{topic.name}}</h2>
                    <router-link :to="topic.to" >See all</router-link>
                </div>
                <exp-list :exps="topic.exps" />
            </template>     -->

            <div class="type-container">
                <h2>Best Deals</h2>
                <button @click="goToPopular">See All</button>
            </div>
            <exp-list v-if="bestDeals" :exps="bestDeals" />
            <div class="type-container">
                <h2>Popular Ski Experience</h2>
                <button @click="goToSki">See All</button>
            </div>
            <exp-list v-if="popSki" :exps="popSki" />
            <div class="type-container">
                <h2>Popular In France</h2>
                <button @click="goToFrance">See All</button>
            </div>
            <exp-list v-if="inFrance" :exps="inFrance" />
        </div>
    </section> 
</template>

<script>
// @ is an alias to /src
import expList from "../components/exp-list.vue";
import socket from "../services/socket.service.js"
     
                    // <!-- <option value="Ski" />
                    // <option value="Sky Diving" />
                    // <option value="Bunjee" />
                    // <option value="Diving" />
                    // <option value="Surffing" /> -->

export default {
    name: "Home-page",
    data() {
        return {
            expTypes: ['Ski', 'Skydiving' ,'Bunjee' ,'Diving' , 'Surffing' ,'Rock Climb','Sky diving','Motorcross' ,'Snapling'],
            choosedType: null,
            bestDeals: null,
            popSki: null,
           inFrance: null
        };
    },
    methods:{
        goToSki(){
          this.$store.commit({type: 'setFilter' , filterBy : { type: 'Ski'}});
          this.$router.push('/exp');
        },    
        goToFrance(){
          this.$store.commit({type: 'setFilter' , filterBy:  {location: 'France'}});
          this.$router.push('/exp')
        },    
        goToPopular(){
          this.$store.commit({type: 'setFilter' , filterBy: {sortBy: 'currPrice'}});
          this.$router.push('/exp')
        }, 
        searchExp(){
            if(!this.choosedType) return 
            console.log(this.choosedType);
            this.$store.commit({type: 'setFilter' , filterBy : {type: this.choosedType}});
            this.$router.push('/exp');
        },
           
    },
    async created() {
        
        this.$store.commit({ type : "setFilter" , filterBy: {sortBy : 'currPrice'}})
        await this.$store.dispatch({ type: "loadExps" });
        let exps = this.$store.getters.exps
        this.bestDeals = exps.slice(0, 4);

        this.$store.commit({ type : "setFilter" , filterBy: {type : 'Ski'}})
        await this.$store.dispatch({ type: "loadExps" });
        exps = this.$store.getters.exps
        this.popSki = exps.slice(0, 4);
 
        this.$store.commit({ type : "setFilter" , filterBy: {location : 'France'}})
        await this.$store.dispatch({ type: "loadExps" });
        exps = this.$store.getters.exps
        this.inFrance = exps.slice(0, 4);
 






        // this.bestExps = currExps;
        // this.popSki = currExps;
        // this.popFrance = currExps;
        // this.$store.commit({ type : "setFilter" , filterBy: {}})
        // await this.$store.dispatch({ type: "loadExps" });
        // const exps = this.$store.getters.exps
        // const currExps = exps.slice(0, 4);
        // this.bestExps = currExps;
        // this.popSki = currExps;
        // this.popFrance = currExps;
    },
    components: {
        expList
    }
};
</script>
