<template>
    <section class="home-page">
        <div class="hero-img">
          <div class="search-container">
            <!-- <el-button class="book-btn" @click.native="book">Really your dream</el-button> -->
                <input v-model="choosedType" list="exp-list" placeholder="What Is Your Favor Experience"/>
                <datalist  id="exp-list">
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
            choosedType: null,
            bestExps: null,
            popSki: null,
            popFrance: null
        };
    },
    methods:{
        goToSki(){
          const filterBy = {
              type: 'Ski'
          };
          this.$store.commit({type: 'setFilter' , filterBy});
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
        }   
           
    },
    async created() {
        this.$store.commit({ type : "setFilter" , filterBy: {}})
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
