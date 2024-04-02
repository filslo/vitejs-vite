<template>
  <router-link :to="{ name: 'artist', params: { id: album.strArtist } }"> Go to artist </router-link>

  <div>
    <h1>{{ album.strAlbum }}</h1>
    <img :src="album.strAlbumThumb" alt="albumThumb" class="logo"/>

    <p>{{ album.strDescriptionEN }}</p>
    <Tracks/>

  </div>
</template>

<script>
import axios from 'axios';
import AudioDbService from "../services/AudioDbService.js";
import Tracks from './Tracks.vue'

export default {
  props: {
    albumId: {
      type: String,
    },
  },
  data() {
    return {
      album: {},
      tracks: [],
    };
  },
  mounted() {
    let id = this.$route.params.id;
    if( this.albumId == undefined) {
      id = this.$route.params.id;
    } else {
      id = this.albumId;
    }
    console.log("go " + id)

    const audioDbService = new AudioDbService();
    audioDbService.fetchAlbumById(id)
        .then( album=> {
          this.album = album;
        });
  },
};
</script>
