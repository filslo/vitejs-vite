<template>
  <div v-if="album">
    <nav v-if="format==='full'" >
      <router-link v-if="album.idArtist" :to="{ name: 'artist', params: { id: album.idArtist } }"> {{ album.strArtist }} </router-link> >
      <router-link v-if="album.idAlbum"  :to="{ name: 'album', params: { id: album.idAlbum } }">{{ album.strAlbum }}</router-link>
    </nav>
  <div>
    <img v-if="album.idArtist" :src="album.strAlbumThumb"
         alt="albumThumb"
         height="100px"
         width="150px"/>
    <h1>
      <router-link v-if="album.idAlbum" :to="{ name: 'album',  params: { id: album.idAlbum } }">{{ album.strAlbum }} ({{album.strArtist}})</router-link>
      <StarIcon v-if="format==='full'"
                v-tooltip="favoriteTooltipMessage(album.idAlbum)"
                @click="favoritesStore.toggleFavorite(album.idAlbum)"
                :class="isFavorite(album.idAlbum) ? 'favorite' : 'noFavorite'"
                class="icon text-yellow-500"/>
      </h1>

      <p >Your rating:
        <star-rating
          v-model:rating="rating"
          :inline="true"
          :star-size="20"
          :read-only="format!=='full'"
          v-tooltip="commentInput"/>
      </p>
    <p>
      <form v-if="format==='full'" @submit.prevent="setComment(this.album.idAlbum)" style="display: inline-flex;">
          <textarea
              v-model="commentInput"
              placeholder="What do think of the album?"
          ></textarea>
        <button type="submit">Leave a comment</button>
      </form>
    </p>

      <p v-if="format==='full'">{{ album.strDescriptionEN }}</p>
      <Tracks v-if="format==='full'"/>

    </div>
  </div>
</template>

<style>
.icon {
  width: 30px;
  height: 30px;
  color: #222;
  margin-left: 12px;
  cursor: pointer;
}

.favorite {
  color : yellow;
}

.noFavorite {
  color: blue;
}

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
import { StarIcon } from "@heroicons/vue/24/solid/index.js";
import StarRating from "vue-star-rating"

import Tracks from "./Tracks.vue";

import AudioDbService from "../services/AudioDbService.js";

import { useFavoriteStore } from "../stores/favorites";
import { useRatingStore } from "../stores/rating";
import { useCommentStore } from "../stores/comments";


export default {
  components: {
    StarIcon,
    StarRating,
    Tracks
  },
  props: {
    albumId: {
      type: String,
    },
  },
  watch: {
    // Watcher sur la prop 'albumId'
    albumId(newAlbumId, oldAlbumId) {
      console.debug(`album ${newAlbumId}`);

      if (newAlbumId !== oldAlbumId) {
        this.fetchAlbumData(newAlbumId);
      }
    },
    rating(newRating, oldRating) {
      if (oldRating !== newRating) {
        this.setRating(newRating);
      }
    }
  },

  data() {
    return {
      album: undefined,
      tracks: [],
      favoritesStore: useFavoriteStore(),
      format: 'short',
      commentInput: '',
      commentsStore: useCommentStore(),
      rating: undefined,
      ratingStore: useRatingStore(),
    };
  },

  mounted() {
    let id;
    if (this.albumId === undefined) {
      id = this.$route.params.id;
      this.format = 'full'

    } else {
      id = this.albumId;

    }
    if (id !== undefined) {
      console.debug("looking for album" +id+ " "+this.albumId)
      this.fetchAlbumData(id);
    }
  },
  methods: {

    fetchAlbumData(albumId) {

      const audioDbService = new AudioDbService();

      audioDbService.fetchAlbumById(albumId)
          .then(album => {
            if (album !== undefined) {
              // undefined is returned when the album is not found
              this.album = album;
              this.commentInput = this.commentsStore.getAlbumComment(this.album.idAlbum);
              this.rating = this.ratingStore.getAlbumRating(this.album.idAlbum);

            } else {
              console.warn(`Album not found: ${albumId}`);

              this.album = undefined;
            }
          });
    },

    favoriteTooltipMessage(albumId) {
      if (this.isFavorite(albumId)) {
        return "Remove from favorites";
      } else {
        return "Add to favorites"
      }
    },

    isFavorite(albumId) {
      return this.favoritesStore.isFavoriteAlbum(albumId);
    },

    setComment(albumId) {
      if (this.commentInput !== undefined) {
        this.commentsStore.addAlbumComment(this.album.idAlbum, this.commentInput);
      }
    },

    setRating(rating) {
      if (rating !== undefined) {
        this.ratingStore.addAlbumRating(this.album.idAlbum, rating);
      }

    },
  }
};
</script>
