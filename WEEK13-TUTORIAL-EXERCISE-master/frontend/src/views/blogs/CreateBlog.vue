<template>
  <div class="container is-widescreen">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">
          <!-- <%= error.code + ': ' + error.sqlMessage %> -->
          <!---->
          {{ error }}
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Create new Blog</p>
      </div>
    </section>
    <section class="px-6">
      <input
        class="mb-5"
        multiple
        type="file"
        accept="image/png, image/jpeg, image/webp"
        @change="selectImages"
      />

      <div v-if="images" class="columns is-multiline">
          <div v-for="(image, index) in images" :key="image.id" class="column is-one-quarter">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="showSelectImage(image)" alt="Placeholder image" />
              </figure>
            </div>
            <footer class="card-footer">
              <a @click="deleteSelectImage(index)" class="card-footer-item has-text-danger">Delete</a>
            </footer>
          </div>
        </div>
      </div>

      <div class="field mt-5">
        <label class="label">Title</label>
        <div class="control">
          <input v-model="$v.titleBlog.$model" class="input" type="text" placeholder="Text input" />
        </div>
        <template v-if="$v.titleBlog.$error">
          <p class="help is-danger" v-if="!$v.titleBlog.required">This field is required</p>
          <p class="help is-danger" v-if="!$v.titleBlog.minLength">Must be at least 10 character</p>
          <p class="help is-danger" v-if="!$v.titleBlog.maxLength">Must be at most 25 character</p>
          <p class="help is-danger" v-if="!$v.titleBlog.alpha">Must be alphabet characters</p>
        </template>
      </div>

      <div class="field">
        <label class="label">Content</label>
        <div class="control">
          <textarea v-model="$v.contentBlog.$model" class="textarea" placeholder="Textarea"></textarea>
        </div>
        <template v-if="$v.contentBlog.$error">
          <p class="help is-danger" v-if="!$v.contentBlog.required">This field is required</p>
          <p class="help is-danger" v-if="!$v.contentBlog.minLength">Must be at least 50 character</p>
        </template>
      </div>
      
      <div class="field">
        <label class="label">Reference</label>
        <div class="control">
          <input class="input" type="url" v-model="$v.reference.$model" placeholder="e.g. https://www.google.com">
        </div>
        <template v-if="$v.reference.$error">
          <p class="help is-danger" v-if="!$v.reference.url">Must be valid url</p>
        </template>
      </div>

      <div class="control mb-3">
        <label class="radio">
          <input v-model="statusBlog" type="radio" name="answer" value="status_private" />
          Private
        </label>
        <label class="radio">
          <input v-model="statusBlog" type="radio" name="answer" value="status_public" />
          Public
        </label>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input v-model="pinnedBlog" type="checkbox" />
            Pinned
          </label>
        </div>
      </div>

      <hr>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">วันที่โพสต์</label>
            <div class="control">
              <input class="input" type="date" v-model="$v.start_date.$model">
            </div>
              <p class="help is-danger" v-if="!$v.start_date.requiredIf">This field is required</p>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">วันสิ้นสุดโพสต์</label>
            <div class="control">
              <input class="input" type="date" v-model="$v.end_date.$model">
            </div>
              <p class="help is-danger" v-if="!$v.end_date.requiredIf">This field is required</p>
              <p class="help is-danger" v-if="!$v.end_date.checkDate">End date must be greater than or equal to start date</p>
          </div>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button @click="submit" class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button @click="$router.go(-1)" class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import axios from "@/plugins/axios";
import {
alpha,
maxLength,
minLength,
required,
requiredIf,
url,
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      blog: {},
      error: null,
      images: [], // array of image
      titleBlog: null,
      contentBlog: null,
      pinnedBlog: false,
      statusBlog: "status_public",
      reference: null,
      start_date: "",
      end_date: "",
    };
  },
  validations: {
    titleBlog: {
      required: required,
      alpha: alpha,
      minLength: minLength(10),
      maxLength: maxLength(25),
    },
    contentBlog: {
      required: required,
      minLength: minLength(50),
    },
    reference: {
      url: url,
    },
    start_date: {
      requiredIf: requiredIf(function () {
        return this.end_date;
      }),
    },
    end_date: {
      requiredIf: requiredIf(function () {
        return this.start_date;
      }),
      checkDate: function (value) {
        return !value || !this.start_date || new Date(value) >= new Date(this.start_date);
      },
    },
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = new FormData();
        formData.append("title", this.titleBlog);
        formData.append("content", this.contentBlog);
        formData.append("pinned", this.pinnedBlog ? 1 : 0);
        this.reference ? formData.append("reference", this.reference) : false;
        this.start_date ? formData.append("start_date", this.start_date) : false;
        this.end_date ? formData.append("end_date", this.end_date) : false;
        formData.append("status", this.statusBlog);
        this.images.forEach((image) => {
          if (image.size > 1024 * 1024) {
            throw new Error("Image is too large");
          }
          formData.append("myImage", image);
        });
        console.log(formData);
        axios
          .post("http://localhost:3000/blogs", formData)
          .then((res) => this.$router.push({ name: "home" }))
          .catch((e) => console.log(e.response.data));
      }
    },
  },
};
</script>

<style>
</style>