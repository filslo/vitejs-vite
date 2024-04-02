<template>
  <div>
    Ici {{ artist }}
    <ul v-if="albums.length">
      <li v-for="album in albums" :key="album.idAlbum">
        <router-link :to="{ name: 'album', params: { id: album.idAlbum } }">
          {{ album.strAlbum }}
        </router-link>
        <button @click="open = true; this.selectedAlbumId=album.idAlbum; console.log(this.selectedAlbumId)">Open Modal</button>
      </li>
    </ul>
    <p v-else>Aucun album trouvé.</p>
  </div>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!{{selectedAlbumId}}</p>
      <button @click="open = false">Close</button>
     <!-- <Album :albumId="selectedAlbumId" />-->
    </div>
  </Teleport>
</template>

<script>
import AudioDbService from '../services/AudioDbService';
import Album from './Album.vue';

import axios from 'axios';


export default {
  props: {
    artistName: {
      type: String,
    },
  },
  watch: {
    // Watcher sur la prop 'artist'
    artistName(newArtist, oldArtist) {
      if (newArtist !== oldArtist) {
        this.fetchAlbums();
      }
    }
  },
  data() {
    return {
      artist: '',
      albums: [],
      open: false,
      selectedAlbumId :'',
    };
  },
  methods: {
    fetchAlbums() {      //axios.get(`https://cors-anywhere.herokuapp.com/https://theaudiodb.com/api/v1/json/2/searchalbum.php?s=${encodeURIComponent(this.artistName)`)
      console.log('artistName ' + this.artistName)
      if( this.artistName == undefined) {
        this.artist = this.$route.params.id;
      } else {
        this.artist = this.artistName;
      }

      if (this.artist.length != 0) {
        //only search artist if a name has been provided
        //  axios.get(` /api/searchalbum_${this.artist.toLowerCase().replace(' ', '')}.json`)

        const audioDbService = new AudioDbService();
        audioDbService.fetchAlbumsByArtist(this.artist)
            .then(albums => {
              this.albums = albums;
            });
     /*   axios.get(`https://proxy.cors.sh/https://theaudiodb.com/api/v1/json/2/searchalbum.php?s=${encodeURIComponent(this.artistName)}`,
            {  headers: {
          'x-cors-api-key': 'temp_4dd3323541f678dc246f095805f2acfc'
        }}).then(response => {
              console.log(response.data)
              if (response.data?.album !== undefined) {
                this.albums = response.data.album;
                console.log("ic")
              } else {
                ;console.log("undefined")
                // No albums found
                this.albums = [];
              }
            })
            .catch(error => {
              console.log(error);
            });*/
      }
    },
  },
  mounted() {
    this.fetchAlbums();
  }

};
</script>
