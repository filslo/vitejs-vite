import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCommentStore = defineStore(
    'comments',
    {
    state: () => ({
        albumComments : new Map<string, string>(),
    }),

    getters: {
        getAlbumComments(): Map<string, string>  {
            return this.albumComments ;
        },

    },

    actions: {
        addAlbumComment(albumdId: string, comment: string) {
            if(albumdId !== undefined) {
                console.debug(`Set comment ${comment} album ${albumdId}`);
                this.albumComments.set(albumdId, comment);
            }
        },

        removeAlbumComment(albumdId: string) {
            console.debug(`Removing comment for album ${albumdId}`);
            this.albumComments.delete(albumdId);
        },

        getAlbumComment(albumdId): number {
            console.debug(`get comment for album ${albumdId}`);

            return this.albumComments.get(albumdId);
        },

    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCommentStore, import.meta.hot))
}