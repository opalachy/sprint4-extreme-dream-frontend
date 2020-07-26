<template>
  <section class="exp-filter">
    <!-- <div class="filter-btn-container"> -->
    <button class="filter-btn" :class="isOnType" @click="setOption('type')">Type</button>
    <button class="filter-btn" :class="isOnLocation" @click="setOption('location')">Country</button>
    <button class="filter-btn" :class="isOnTags" @click="setOption('tags')">More filters</button>
    <button class="filter-btn" :class="isOnSortBy" @click="setOption('sortBy')">sort</button>
    <!-- </div> -->
    <div v-show="filterOption" @click="close" class="screen"></div>
 
   <div v-show="(filterOption === 'type')"  class="type-filter filter-modal">
      <h2>Select experience</h2>          
      <div class="label-container">
        <div v-for="type in types" :key="type.id">
          <input :id="type.id" type="radio" v-model="filterBy.type" :value="type.id"  hidden>
          <label :for="type.id" >{{type.txt}}</label>
        </div>
      </div>
      <button class="save-filter-btn" @click="save">save</button>
   </div>

   <div v-show="(filterOption === 'location')"  class="location-filter filter-modal">
      <h2>Select locatin</h2>        
      <div class="label-container">
        <div v-for="location in locations" :key="location.id">
          <input :id="location.id" type="radio" v-model="filterBy.location" :value="location.id" hidden >
          <label :for="location.id" >{{location.txt}}</label>
        </div>
      </div>
      <button class="save-filter-btn" @click="save">save</button>
   </div>

   <div v-show="(filterOption === 'tags')"  class="more-filter filter-modal">
      <h2>More filters</h2>         
      <div class="label-container">
        <div v-for="tag in tags" :key="tag.id">
          <input :id="tag.id" type="checkbox"  @change="choose" :value="tag.id" hidden>
          <label :for="tag.id" >{{tag.txt}}</label>
        </div>
      </div>
      <button class="save-filter-btn" @click="save">save</button>
   </div>
   
  <div v-show="(filterOption === 'sortBy')"  class="sortBy-filter filter-modal">
      <h2>Sort</h2>        
      <div class="label-container">
        <div v-for="sort in sortBy" :key="sort.id">
          <input :id="sort.id" type="radio" v-model="filterBy.sortBy" :value="sort.id"  hidden>
          <label :for="sort.id" >{{sort.txt}}</label>
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
          {id: 'all-type' , txt: 'All'} ,
          {id: 'Diving' , txt: 'Diving'},
          {id: 'Ski' , txt: 'Ski'} ,
          {id: 'Surfing' , txt: 'Surfing'},
          {id: 'Offroad' , txt: 'Offroad'} ,
          {id: 'Motorcross' , txt: 'Motorcross'},
          {id: 'Rock-climb' , txt: 'Rock Climb'},
          {id: 'Bungee' , txt: 'Bungee'},
          {id: 'Rappelling' , txt: 'Rappelling'},
          
       ],
       locations: [
          {id: 'all-location' , txt: 'All'},
          {id: 'Israel' , txt: 'Israel'},
          {id: 'France' , txt: 'France'},
          {id: 'Egypt' , txt: 'Egypt'},
          {id: 'USA' , txt: 'USA'},
          {id: 'Switzerland' , txt: 'Switzerland'},
          {id: 'Bulgaria' , txt: 'Bulgaria'},
          {id: 'Italy' , txt: 'Italy'},
          {id: 'Hawaii' , txt: 'Hawaii'},
          {id: 'South-africa' , txt: 'South Africa'},
          {id: 'Thailand' , txt: 'Thailand'}
       ],
       tags: [
          {id: 'Africa' , txt: 'Africa'},
          {id: 'America' , txt: 'America'},
          {id: 'Asia' , txt: 'Asia'},
          {id: 'Europe' , txt: 'Europe'},
          {id: 'Adventure' , txt: 'Adventure'},
          {id: 'Adults' , txt: 'Adults'},
          {id: 'All-levels' , txt: 'All levels'},
          {id: 'All-year ' , txt: 'All year '} ,
          {id: 'Animals' , txt: 'Animals'},
          {id: 'Children' , txt: 'Children'},
          {id: 'Danger' , txt: 'Danger'},
          {id: 'Desert' , txt: 'Desert'},
          {id: 'Expert' , txt: 'Expert'},
          {id: 'Family' , txt: 'Family'},
          {id: 'Loud' , txt: 'Loud'},
          {id: 'Ropes' , txt: 'Ropes'},
          {id: 'Sports' , txt: 'Sports'},
          {id: 'Summer' , txt: 'Summer'} ,
          {id: 'Sun' , txt: 'Sun'} ,
          {id: 'View' , txt: 'View'},
          {id: 'Water' , txt: 'Water'},
          {id: 'Winter' , txt: 'Winter'},
       ],
       sortBy: [
          {id: 'newest' , txt: 'Newest'} ,
          {id: 'currPrice' , txt: 'Best Deals'}, 
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
}

</script>




