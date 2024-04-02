import FloatingVue from "floating-vue"
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import "./style.css"

import App from './App.vue'
import SearchAlbumByArtist from "./components/SearchAlbumByArtist.vue"

const routes = [
    { name : 'searchAlbum',     path: '/', component: SearchAlbumByArtist },
    { name : 'album', path: '/album/:id',//component: Album },
        component: () => import('./components/Album.vue') },
    { name : 'artist', path: '/artist/:id',
        component: () => import('./components/Artist.vue') },
    { name : 'track', path: '/track/:id',
        component: () => import('./components/Track.vue') },
    { name : 'favorites', path: '/favorites',
        component: () => import('./components/Favorites.vue') },
    { name : 'ratings', path: '/ratings',
        component: () => import('./components/Ratings.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(createPinia())
    .use(router)
    .use(FloatingVue)
    .mount('#app')
