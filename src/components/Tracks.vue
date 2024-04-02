<template>
  <div>
    <h2>Tracks</h2>

      <ul>
        <li v-for="track in tracks" :key="track.idTrack" class="no-bullets">
         <router-link :to="{ name: 'track', params: { id: track.idTrack } }">
            {{ track.intTrackNumber }} - {{ track.strTrack }}
          </router-link>
        </li>
      </ul>

  </div>
</template>

<script lang="ts">
import { StarIcon } from "@heroicons/vue/24/solid";

import AudioDbService from "../services/AudioDbService.js";

import { useFavoriteStore } from "../stores/favorites";

import 'floating-vue/dist/style.css'

export default {
  components: {
    StarIcon,
  },
  data() {
    return {
      tracks: [],
      favoritesStore : useFavoriteStore(),
    };
  },
  mounted() {
    let albumId = this.$route.params.id;

    //this.loadingStore.loading = true;

    if( albumId !== undefined) {
      const audioDbService = new AudioDbService();
      audioDbService.fetchAlbumTracksById(albumId)
          .then(tracks => {

            this.tracks = tracks;

          });
    }
  },
  methods: {},
};
</script>