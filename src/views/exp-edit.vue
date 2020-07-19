<template>
  <section class="exp-edit" v-if="expToEdit">
    <h1>{{ (expToEdit._id) ? 'Edit exp' : 'Add exp' }}</h1>
    <form @submit.prevent="saveExp">
      <label>
        Date:
        <date-picker @setDay="setDay" />
      </label>
      <label>
        Location:
        <el-input required placeholder="Experience location" v-model="expToEdit.location"></el-input>
      </label>
      <label>
        Title:
        <el-input required placeholder="Experience title" v-model="expToEdit.title"></el-input>
      </label>
      <label>
        Type:
        <el-input required placeholder="Experience type" v-model="expToEdit.type"></el-input>
      </label>
      <label>
        Upload at least 5 images: {{loaded}}
        <input required type="file" placeholder="Experience image" @change="onUploadImg"/>
      </label><br/>
      <el-input
        required
        type="textarea"
        :rows="2"
        placeholder="Please input short description"
        v-model="expToEdit.shortDesc"
      ></el-input>
      <el-input
        required
        type="textarea"
        :rows="2"
        placeholder="Please input long description"
        v-model="expToEdit.desc"
      ></el-input>
      <label>
        Capacity:
        <el-input required type="number" placeholder="Max participants" v-model="expToEdit.capacity"></el-input>
      </label>
      <label>
        Category:
        <el-select v-model="expToEdit.tags" placeholder="Choose Category">
          <el-option value="family">Family</el-option>
          <el-option value="children">Children</el-option>
          <el-option value="all level">All level</el-option>
          <el-option value="adventure">Adventure</el-option>
          <el-option value="sports">Sports</el-option>
        </el-select>
      </label>
      <label>
        Price:
        <el-input-number
          v-model="expToEdit.origPrice"
          controls-position="right"
          :min="0"
          placeholder="origPrice"
        ></el-input-number>
      </label>
      <label>
        Price with discount:
        <el-input-number
          v-model="expToEdit.currPrice"
          controls-position="right"
          :min="0"
          placeholder="currPrice"
        ></el-input-number>
      </label>

      <button :disabled="disabled" >Save</button>
      <pre>{{expToEdit}}</pre>
    </form>
    <button v-if="expToEdit._id" @click="removeExp">Delete Experience</button>
  </section>
</template>

<script>
import { uploadImg } from "../services/imgUpload.service";
import { expService } from "../services/exp.service.js";
import datePicker from "../components/date-picker";

export default {
  data() {
    return {
        disabled: true,
        loaded: '',
        loadCount: 0,
      expToEdit: null,
      exp: 
        {
          title: "",
          shortDesc: "",
          desc: "",
          createdBy: {
            _id: "",
            fullName: "",
            info: "",
            imgUrl: ""
          },
          type: "",
          currPrice: "",
          origPrice: "",
          tags: [],
          participants: [],
          location: "",
          date: "",
          capacity: "",
          imgUrls: [],
          reviews: []
        }
    };
  },

  components: {
    datePicker
  },
  methods: {
    loadExp() {
      let expId = this.$route.params.id;
      if (expId) {
        expService.getById(expId).then(exp => {
          this.expToEdit = JSON.parse(JSON.stringify(exp));
        });
      } else {
        this.expToEdit = expService.getEmptyExp();
      }
    },
    setDay(day) {
      this.expToEdit.date = day.getTime();
      if (day !== null) this.disabled = !this.disabled
      console.log(this.expToEdit.date)
    },
    saveExp() {
      if (!this.expToEdit.title) return;
      this.$store
        .dispatch({ type: "saveExp", exp: this.expToEdit })
        .then(savedexp => {
          this.$router.push("/");
          this.loadExp();
        });
    },
    removeExp() {
      this.$store
        .dispatch({ type: "removeExp", id: this.expToEdit._id })
        .then(savedexp => {
          this.$router.push("/");
          this.loadExp();
        });
    },
    async onUploadImg(ev) {
        if (this.expToEdit.imgUrls.length >= 5) return 
      var res = await uploadImg(ev);
      this.expToEdit.imgUrls.push(res.url);
      if (this.loadCount === 0){
          this.loaded = '1 image was loaded'
          this.loadCount++;
      }else {
          this.loadCount++;
          this.loaded = this.loadCount + ' images were loaded'
      }
    }
  },
  created() {
    this.loadExp();
  },
  watch: {
    "$route.params.expId"() {
      this.loadExp();
    }
  }
};
</script>
