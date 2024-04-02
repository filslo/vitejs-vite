<template>
  <div>
    <h1>Search Artist albums</h1>
    <form @submit.prevent="searchAlbums">
      <label>
        Artist Name:
        <input type="text" v-model="artistNameInput">
      </label>
      <button type="submit">Search</button>
    </form>
    <Artist :artistName="artistName"/>
  </div>
</template>

<script>
import Artist from "./Artist.vue"
import Layout from "../layouts/default.vue"


export default {
  components: {
    Layout,
    Artist
  },

  data() {
    return {
      artistNameInput: '',
      artistName: '',
      albums: [],
    };
  },
  methods: {
    async searchAlbums() {
      this.artistName = this.artistNameInput;

    },
  },

};
</script>
