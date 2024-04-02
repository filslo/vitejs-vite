
<script setup>
</script>


<template>
  <div>
    <h1>Recherche d'album par artiste</h1>
    <form @submit.prevent="searchAlbums">
      <label>
        Nom de l'artiste :
        <input type="text" v-model="artistNameInput">
      </label>
      <button type="submit">Rechercher</button>
    </form>
    <Artist :artistName="artistName"/>
  </div>
</template>

<script>
import axios from 'axios';
import Artist from './Artist.vue'

export default {
  data() {
    return {
      artistNameInput: '',
      artistName: '',
      albums: [],
    };
  },
  methods: {
    searchAlbums() {
      this.artistName = this.artistNameInput;
    },
  },

components: {
  Artist
},
};
</script>
