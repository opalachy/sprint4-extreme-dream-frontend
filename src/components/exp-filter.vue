<template>
  <section class="exp-filter">
    <button @click="setOption('type')">Type</button>
    <button @click="setOption('location')">Location</button>
    <button @click="setOption('tags')">More filter</button>
    <button @click="setOption('sortBy')">sort</button>
    <!-- <button @click="sort">Sort by</button> -->
  
    <!-- <div v-show="filterOption" @click="close" class="screen"></div> -->

    <div v-show="(filterOption === 'tags')"  class="more-filter">
          
         <input  id="Family" type="checkbox" @change="choose" hidden>
       <label for="Family" >Family</label>
          
         <input id="Children" type="checkbox" @change="choose" hidden>
       <label for="Children" >Children</label>
                   
         <input id="Adventure" type="checkbox" @change="choose" hidden>
       <label for="Adventure" >Adventure</label>
          
         <input id="Sports" type="checkbox" @change="choose" hidden>
       <label for="Sports" >Sports</label>
          
         <input id="All-level" type="checkbox" @change="choose" hidden>
       <label for="All-level" >All level</label>
  
         <button @click="save">save</button>
   </div>






   <div v-show="(filterOption === 'type')"  class="type-filter">

       <input id="all-type" type="radio" v-model="filterBy.type" value="all"  hidden>
     <label for="all-type" >All</label>
     
       <input id="Ski" type="radio"  v-model="filterBy.type" value="Ski"  hidden>
     <label for="Ski" >Ski</label>
     
       <input id="Diving" type="radio"  v-model="filterBy.type" value="Diving"  hidden>
     <label for="Diving" >Diving</label>
     
       <input id="Surfing" type="radio"  v-model="filterBy.type" value="Surfing"  hidden>
     <label for="Surfing" >Surfing</label>
     
       <input id="Motorcycle" type="radio"  v-model="filterBy.type" value="Motorcycle"  hidden>
     <label for="Motorcycle" >Motorcycle</label>
     
     <button @click="save">save</button>

   </div>


   <div v-show="(filterOption === 'location')" class="location-filter">
        
       <input id="All-location" type="radio"  v-model="filterBy.location" value="all"  hidden>
     <label for="All-location" >All</label>
     
       <input id="Israel" type="radio"  v-model="filterBy.location" value="Israel"  hidden>
     <label for="Israel" >Israel</label>
     
       <input id="France" type="radio"  v-model="filterBy.location" value="France"  hidden>
     <label for="France" >France</label>
     
       <input id="Egypt" type="radio"  v-model="filterBy.location" value="Egypt"  hidden>
     <label for="Egypt" >Egypt</label>
     
       <input id="USA" type="radio"  v-model="filterBy.location" value="USA"  hidden>
     <label for="USA" >USA</label>

     <button @click="save">save</button>
     
   </div>
   <div v-show="(filterOption === 'sortBy')" class="sortBy-filter">
        
       <input id="newest" type="radio"  v-model="filterBy.sortBy" value="Newest"  hidden>
     <label for="newest" >All</label>
     
       <input id="best-deal" type="radio"  v-model="filterBy.sortBy" value="currPrice"  hidden>
     <label for="best-deal" >Best Deal</label>
    
     <button @click="save">save</button>
     
   </div>
   
   <!-- <div class="sort-filter">

   </div> -->

  </section>
</template>
 
<script>


export default {
  name: "exp-filter",
  data(){
    return {
      // lastFilterBy: null,
      filterOption: '',
      filterBy: {
        type: 'all',
        location: 'all',
        tags: [],
        sortBy: 'newest',
      }
    }
  },
  methods: {
    setOption(option){
      if(this.filterOption === option) {
        // this.filterBy.type = this.lastFilterBy.type
        return this.filterOption = '' 
      }
         if (option === 'type') this.filterOption = 'type';
         if (option === 'location') this.filterOption = 'location';
         if (option === 'tags') this.filterOption = 'tags';
         if (option === 'sortBy') this.filterOption = 'sortBy';
    },
    close(){
         this.filterOption = ''
    },
    save(){
    //  this.lastFilterBy =  this.filterBy ;
     this.filterOption = '';
     this.$emit('setFilter' , this.filterBy)
    },
    choose(ev){
      if(ev.target.checked){
        this.filterBy.tags.push(ev.target.labels[0].innerText)
    } else {
      const idx = this.filterBy.tags.findIndex(tag => tag === ev.target.labels[0].innerText);
       this.filterBy.tags.splice(idx , 1)
      }
    }
  },
  created() {
  },
  //  watch: {
  //       filterBy: {
  //       deep: true,
  //           handler(){
  //             console.log(this.filterBy.tags)
  //           }
  //       }
// }
}

</script>


<style  scoped>
  label{
     padding: 3px 7px;
  }
 .type-filter{
   padding: 10px;
   border: 1px solid black;
   z-index: 5;
 }
 .location-filter{
   padding: 10px;
   border: 1px solid black;
   z-index: 5;
 }
 .more-filter{
   padding: 10px;
   border: 1px solid black;
   z-index: 5;
 }
 .sortBy-filter{
   padding: 10px;
   border: 1px solid black;
   z-index: 5;
 }
  button{
    padding: 5px 10px; 
    background-color: aqua; 
    margin: 10px;
  }
/* .screen{
    top: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    height: 100vh;
    width: 100vw;
    background-color: #00000047;
} */
  input[type="radio"]:checked + label{ background-color: antiquewhite; } 
  input[type="checkbox"]:checked + label{ background-color: rgb(198, 223, 183); } 
</style>