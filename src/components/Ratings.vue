<template>
  <div>
    <div v-if="bestRatingAlbumIds.length">
      <div v-for="albumId in bestRatingAlbumIds">
        <Album :albumId="albumId" />
        </div>
      </div>
    <p v-else>You have no rated albums.</p>
  </div>
</template>

<script>
import Album from "./Album.vue";
import {useRatingStore} from "../stores/rating";

const ratingStore = useRatingStore()

export default {
  components: {
    Album,
  },
  data() {
    return {
      bestRatingAlbumIds: [],
    };
  },
  methods: {
    fetchAlbums() {
      this.bestRatingAlbumIds = ratingStore.getAlbumsPerRating()
    },
  },
  mounted() {
    this.fetchAlbums();
  }

};
</script>
