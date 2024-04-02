<template>
  <div>
    <div v-if="favoriteAlbumIds.length">
      <div v-for="albumId in favoriteAlbumIds">
        <Album :albumId="albumId" />
        </div>
      </div>
    <p v-else>You have no favorite albums.</p>
  </div>
</template>

<script>
import Album from "./Album.vue";

import { storeToRefs } from "pinia";
import { useFavoriteStore } from "../stores/favorites";

const store = useFavoriteStore();
const { getFavorites } = storeToRefs(store);

export default {
  components: {
    Album,
  },
  data() {
    return {
      favoriteAlbumIds: [],
    };
  },
  methods: {
    fetchAlbums() {
      console.log("getFavorites" + getFavorites.value)
      this.favoriteAlbumIds = getFavorites.value

    },
  },
  mounted() {
    this.fetchAlbums();
  }

};
</script>
