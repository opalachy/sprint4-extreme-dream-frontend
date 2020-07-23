<template>
  <section class="exp-filter">
    <button class="filter-btn" :class="isOnType" @click="setOption('type')">Type</button>
    <button class="filter-btn" :class="isOnLocation" @click="setOption('location')">Location</button>
    <button class="filter-btn" :class="isOnTags" @click="setOption('tags')">More filters</button>
    <button class="filter-btn" :class="isOnSortBy" @click="setOption('sortBy')">sort</button>
  
    <div v-show="filterOption" @click="close" class="screen"></div>

   
   <div v-show="(filterOption === 'type')"  class="type-filter filter-modal">
      <h2>Select experience</h2>          
      <div class="label-container">
        <div v-for="type in types" :key="type.idVal">
          <input :id="type.idVal" type="radio" v-model="filterBy.type" :value="type.idVal"  hidden>
          <label :for="type.idVal" >{{type.txt}}</label>
        </div>
      </div>
      <button class="save-filter-btn" @click="save">save</button>
   </div>

   <div v-show="(filterOption === 'location')"  class="location-filter filter-modal">
      <h2>Select locatin</h2>        
      <div class="label-container">
        <div v-for="location in locations" :key="location.idVal">
          <input :id="location.idVal" type="radio" v-model="filterBy.location" :value="location.idVal" hidden >
          <label :for="location.idVal" >{{location.txt}}</label>
        </div>
      </div>
      <button class="save-filter-btn" @click="save">save</button>
   </div>

   <div v-show="(filterOption === 'tags')"  class="more-filter filter-modal">
      <h2>More filters</h2>         
      <div class="label-container">
        <div v-for="tag in tags" :key="tag.idVal">
          <input :id="tag.idVal" type="checkbox"  @change="choose" :value="tag.idVal" hidden>
          <label :for="tag.idVal" >{{tag.txt}}</label>
        </div>
      </div>
      <button class="save-filter-btn" @click="save">save</button>
   </div>
   
  <div v-show="(filterOption === 'sortBy')"  class="sortBy-filter filter-modal">
      <h2>Sort</h2>        
      <div class="label-container">
        <div v-for="sort in sortBy" :key="sort.idVal">
          <input :id="sort.idVal" type="radio" v-model="filterBy.sortBy" :value="sort.idVal"  hidden>
          <label :for="sort.idVal" >{{sort.txt}}</label>
        </div>
      </div>
      <button class="save-filter-btn" @click="save">save</button>
   </div>

   
  </section>
</template>
 
<script>


export default {
  name: "exp-filter",
  data(){
    return {
      types: [
          {idVal: 'all-type' , txt: 'All'} ,
          {idVal: 'Diving' , txt: 'Diving'},
          {idVal: 'Ski' , txt: 'Ski'} ,
          {idVal: 'Surfing' , txt: 'Surfing'},
          {idVal: 'Offroad' , txt: 'Offroad'} ,
          {idVal: 'Motorcross' , txt: 'Motorcross'}
       ],
       locations: [
          {idVal: 'all-location' , txt: 'All'} ,
          {idVal: 'Israel' , txt: 'Israel'},
          {idVal: 'France' , txt: 'France'} ,
          {idVal: 'Egypt' , txt: 'Egypt'},
          {idVal: 'USA' , txt: 'USA'} ,
       ],
       tags: [
          {idVal: 'Family' , txt: 'Family'} ,
          {idVal: 'Children' , txt: 'Children'},
          {idVal: 'Adventure' , txt: 'Adventure'} ,
          {idVal: 'Sports' , txt: 'Sports'},
          {idVal: 'All-level' , txt: 'All levels'} ,
       ],
       sortBy: [
          {idVal: 'newest' , txt: 'Newest'} ,
          {idVal: 'currPrice' , txt: 'Best Deals'}, 
       ],
      filterOption: '',
      filterBy: {
        type: 'all-type',
        location: 'all-location',
        tags: [],
        sortBy: 'newest',
      }
    }
  },
  computed:{
    isOnType(){
      return {isActive: this.filterOption === 'type'}
    },
    isOnLocation(){
      return {isActive: this.filterOption === 'location'}
    },
    isOnTags(){
      return {isActive: this.filterOption === 'tags'}
    },
    isOnSortBy(){
      return {isActive: this.filterOption === 'sortBy'}
    },
  },
  methods: {
    setOption(option){
      if(this.filterOption === option) {
        // this.filterBy.type = this.lastFilterBy.type
        return this.filterOption = '';
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
     this.$emit('setFilter' , this.filterBy);
     this.filterBy = JSON.parse(JSON.stringify(this.filterBy));
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
  //   /    }
// }
}

</script>




