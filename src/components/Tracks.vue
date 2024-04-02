<template>
  <nav>
  </nav>
  <div>
    <h2>Liste des titres</h2>
    <ul>
      <li v-for="track in tracks" :key="track.idTrack">

        <router-link :to="{ name: 'track', params: { id: track.idTrack } }">
          {{ track.intTrackNumber }} - {{ track.strTrack }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import AudioDbService from "../services/AudioDbService.js";

export default {
  data() {
    return {
      tracks: [],
    };
  },
  mounted() {
    let albumId = this.$route.params.id;
    console.log("tracks " + albumId)

    const audioDbService = new AudioDbService();
    audioDbService.fetchAlbumTracksById(albumId)
        .then(tracks => {
          this.tracks = tracks;
        });

  },
};
</script>