import { defineStore, acceptHMRUpdate } from 'pinia'

export const useRatingStore = defineStore(
    'rating',
    {
    state: () => ({
        albumRatings : new Map<string, number>(),
    }),

    getters: {
        getAlbumRatings(): Map<string, number>  {

            return this.albumRatings ;
        },
    },

    actions: {
        addAlbumRating(albumId: string, rating: number) {
            if( albumId !== undefined) {
                this.albumRatings.set(albumId, rating);

            }

        },

        removeAlbumRating(albumdId: string) {
            console.debug(`Removing rating to album ${albumdId}`);
            this.albumRatings.delete(albumdId);
        },

        getAlbumRating(albumdId): number {
            return this.albumRatings.get(albumdId);
        },
        getAlbumsPerRating(): string[] {

            const sorted = new Map([... this.albumRatings.entries()].sort((a, b) => b[1] - a[1]));
            return Array.from(sorted.keys());

        }

    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRatingStore, import.meta.hot))
}