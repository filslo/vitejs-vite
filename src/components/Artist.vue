<template>
  <div>
    <div v-if="artist && albums">
      <h1 v-if="artistName"> {{albums.length}} albums found for {{ artistName }}</h1>
      <h1 v-if="artist"> {{ artist }}</h1>

      <ul v-if="albums.length"> {{albums.length}} albums
        <li v-for="album in albums" :key="album.idAlbum" class="no-bullets">
          <div v-if="album">
            <router-link :to="{ name: 'album', params: { id: album.idAlbum } }">
              <img :src="album.strAlbumThumb"
                   alt="albumThumb"
                   height="100px"
                   width="100px"
                   crossorigin="anonymous"/>
              <p>{{ album.strArtist  }} -{{ album.strAlbum }}</p>
            </router-link>

          </div>
        </li>
      </ul>
      <p v-else>No albums found.</p>
    </div>
  </div>

</template>

<script>

import AudioDbService from "../services/AudioDbService";


export default {
  components: {
  },

  props: {
    artistName: {
      type: String,
    },
  },
  watch: {
    // Watcher sur la prop 'artistName'
    artistName(newArtist, oldArtist) {
      if (newArtist !== oldArtist) {
        this.fetchAlbums();
      }
    }
  },
  data() {
    return {
      artist: undefined,
      albums: undefined,
      open: false,
      selectedAlbumId :'',
      itemPerPage: 5,

    };
  },
  methods: {
    async fetchAlbums() {

      if( this.artistName === undefined) {
        this.artist = this.$route.params.id;
      } else {
        this.artist = this.artistName;
      }
      if (this.artist.length !== 0) {

        const audioDbService = new AudioDbService();
        audioDbService.fetchAlbumsByArtist(this.artist)
            .then(albums => {
              console.debug(`found ${albums.length} albums`)

              this.albums = albums;

              if( this.albums && this.albums.length > 0) {
                this.artist =  this.albums[0].strArtist
              }

            });
      }

    },

  },
  mounted() {
    this.fetchAlbums();
  }

};
</script>
