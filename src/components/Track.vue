<template>
  <nav v-if="track && !trackId && format==='full'" >
    <router-link v-if="track.idArtist" :to="{ name: 'artist', params: { id: track.idArtist } }">{{ track.strArtist }}</router-link> >
    <router-link v-if="track.idAlbum" :to="{ name: 'album',  params: { id: track.idAlbum } }">{{ track.strAlbum }}</router-link> >
    <router-link v-if="track.idTrack" :to="{ name: 'track',  params: { id: track.idTrack } }">{{ track.strTrack }}</router-link>
  </nav>
  <div v-if="track">

    <h1><router-link v-if="track.idTrack" :to="{ name: 'track',  params: { id: track.idTrack } }">{{ track.strTrack }}</router-link></h1>

    <dl>
      <dt>Artist:</dt>
      <dd><router-link v-if="track.idArtist" :to="{ name: 'artist', params: { id: track.idArtist } }">{{ track.strArtist }}</router-link></dd>
      <dt>Album:</dt>
      <dd><router-link v-if="track.idAlbum"  :to="{ name: 'album', params: { id: track.idAlbum } }">{{ track.strAlbum }}</router-link></dd>
      <dt>Track Number:</dt><dd>{{ track.intTrackNumber}}</dd>
      <dt>Duration:</dt><dd>{{ track.intDuration }} s</dd>
      <dt>Genre:</dt> <dd>{{ track.strGenre }}</dd>
      <dt>Description:</dt><dd>{{ track.strDescriptionEN }}</dd>
    </dl>
  </div>
</template>

<style>
dl {
  display: grid;
}

dt {
  grid-column-start: 1;
}

dd {
  grid-column-start: 2;
}
</style>

<script lang="ts">
import AudioDbService from "../services/AudioDbService.js";

import 'floating-vue/dist/style.css';

export default {
  props: {
    trackId: {
      type: String,
    },
  },
  watch: {
    // Watcher sur la prop 'trackId'
    trackId(newTrackId, oldTrackId) {

      if (newTrackId !== oldTrackId) {
        this.fetchTrackData(newTrackId);
      }
    }
  },

  data() {
    return {
      track: {},
      id: '',
      format : 'short',
    };
  },
  mounted() {

    if( this.trackId === undefined) {
      this.id = this.$route.params.id;
      this.format = 'full'
    } else {
      this.id =  this.trackId
    }
     this.fetchTrackData(this.id);

  },

  methods: {
    fetchTrackData(trackId) {

      if (trackId !== undefined) {
        const audioDbService = new AudioDbService();
        audioDbService.fetchTrackById(trackId)
            .then(track => {
              this.track = track;

            });
      }
      },
  },
};
</script>
