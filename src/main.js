import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SearchAlbumByArtist from './components/SearchAlbumByArtist.vue'

const routes = [
    { name : 'searchAlbum',     path: '/', component: SearchAlbumByArtist },

    { name : 'album', path: '/album/:id',//component: Album },
        component: () => import('./components/Album.vue') },
    { name : 'artist', path: '/artist/:id',
        component: () => import('./components/Artist.vue') },
    { name : 'track', path: '/track/:id',
        component: () => import('./components/Track.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount('#app')
