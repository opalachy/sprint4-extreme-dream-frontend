<template>
  <section class="exp-edit" v-if="expToEdit">
    <h1>{{ (expToEdit._id) ? 'Edit exp' : 'Add exp' }}</h1>
    <form @submit.prevent="saveExp">
      <label>
        Date:
        <date-picker @setDay="setDay" :date="expToEdit.date" />
      </label>
      <label>
        Location:
        <el-input
          class="el-input"
          required
          placeholder="Experience location"
          v-model="expToEdit.location"
        ></el-input>
      </label>
      <br />
      <label>
        Title:
        <el-input
          class="el-input"
          required
          placeholder="Experience title"
          v-model="expToEdit.title"
        ></el-input>
      </label>
      <br />
      <label>
        Type:
        <el-input class="el-input" required placeholder="Experience type" v-model="expToEdit.type"></el-input>
      </label>
      <br />
      <label>
        Upload/Have at least 5 images: {{loaded}}
        <input
          :required="isNotEnoughImg"
          type="file"
          placeholder="Experience image"
          @change="onUploadImg"
        />
      </label>
      <br />
      <div class="exp-edit-imgs-container">
        <div class="exp-edit-imgs" v-for="(img, idx ) in expToEdit.imgUrls">
          <img :src="img" style="height: 50px; width: 50px;" />
          <button @click.prevent="deleteImg(idx)">x</button>
        </div>
      </div>
      <el-input
        class="el-input"
        required
        type="textarea"
        :rows="2"
        placeholder="Please input short description"
        v-model="expToEdit.shortDesc"
      ></el-input>
      <br />
      <br />
      <el-input
        class="el-input"
        required
        type="textarea"
        :rows="2"
        placeholder="Please input long description"
        v-model="expToEdit.desc"
      ></el-input>
      <br />
      <label>
        Capacity:
        <el-input
          class="el-input"
          required
          type="number"
          placeholder="Max participants"
          v-model="expToEdit.capacity"
        ></el-input>
      </label>
      <br />
      <br />
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
      <br />
      <br />
      <label>
        Price:
        <el-input-number
          v-model="expToEdit.origPrice"
          controls-position="right"
          :min="0"
          placeholder="origPrice"
        ></el-input-number>
      </label>
      <br />
      <br />
      <label>
        Price with discount:
        <el-input-number
          v-model="expToEdit.currPrice"
          controls-position="right"
          :min="0"
          placeholder="currPrice"
        ></el-input-number>
      </label>
      <br />

      <button :disabled="disabled">Save</button>
    </form>
    <button 
  type="button"    
  @click="hasHistory() 
    ? $router.go(-1) 
    : $router.push('/')" class="my-5 btn btn-outline-success">&laquo; 
  Back
</button><br />
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
      loaded: "",
      loadCount: 0,
      expToEdit: null
    };
  },
  components: {
    datePicker
  },
  computed: {
    isNotEnoughImg() {
      return this.expToEdit.imgUrls < 5;
    }
  },
  methods: {
    hasHistory() {
      return window.history.length > 2;
    },
    async loadExp() {
      let expId = this.$route.params.id;
      if (expId) {
        const exp = await expService.getById(expId);
        this.expToEdit = JSON.parse(JSON.stringify(exp));
      } else {
        this.expToEdit = expService.getEmptyExp();
      }
    },
    setDay(day) {
      if (day !== null || this.expToEdit.date !== null) this.disabled = false;
    },
    async saveExp() {
      if (!this.expToEdit.title) return;
      await this.$store.dispatch({ type: "saveExp", exp: this.expToEdit });
      this.$router.push("/");
      this.loadExp();
    },
    async removeExp() {
      const savedExp = await this.$store.dispatch({
        type: "removeExp",
        id: this.expToEdit._id
      });
      this.$router.push("/");
      this.loadExp();
    },
    deleteImg(idx) {
      this.expToEdit.imgUrls.splice(idx, 1);
    },
    async onUploadImg(ev) {
      if (this.expToEdit.imgUrls.length >= 30) return;
      var res = await uploadImg(ev);
      this.expToEdit.imgUrls.push(res.url);
      if (this.loadCount === 0) {
        this.loaded = "1 image was loaded";
        this.loadCount++;
      } else {
        this.loadCount++;
        this.loaded = this.loadCount + " images were loaded";
      }
      return this.expToEdit.imgUrls;
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
