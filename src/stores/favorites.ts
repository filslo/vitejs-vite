import { defineStore, acceptHMRUpdate } from 'pinia'

export const useFavoriteStore = defineStore(
    'favorites',
    {
    state: () => ({
        favoriteAlbumIds: [] as string[],
    }),

    getters: {
        getFavorites(): string[]  {
            return this.favoriteAlbumIds ;
        },

    },

    actions: {
        addAlbum(albumdId: string) {
            console.debug(`Adding album ${albumdId} to favorites`);
            this.favoriteAlbumIds.push(albumdId)
        },

        removeAlbum(albumdId: string) {
            console.debug(`Removing album ${albumdId} from favorites`);

            const i = this.favoriteAlbumIds.lastIndexOf(albumdId)
            if (i > -1) this.favoriteAlbumIds.splice(i, 1)
        },

        toggleFavorite(albumdId: string) {
            if( this.favoriteAlbumIds.indexOf(albumdId) > -1) {
                this.removeAlbum(albumdId)
            } else {
                this.addAlbum(albumdId)
            }
        },

       isFavoriteAlbum(albumdId): boolean {
            return this.favoriteAlbumIds.indexOf(albumdId) > -1 ;
        },


    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFavoriteStore, import.meta.hot))
}