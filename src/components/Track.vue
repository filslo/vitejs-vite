<template>
  <div>
    <h1>{{ track.strAlbum }}</h1>
    <p>{{ track.strDescriptionEN }}</p>

  </div>
</template>

<script>
import axios from 'axios';
import AudioDbService from "../services/AudioDbService.js";

export default {
  data() {
    return {
      track: {},
    };
  },
  mounted() {
    let trackId = this.$route.params.id;
    console.log("track " + trackId)

    const audioDbService = new AudioDbService();
    audioDbService.fetchTrackById(trackId)
        .then(track => {
          this.track = track;
        });

  },
};
</script>