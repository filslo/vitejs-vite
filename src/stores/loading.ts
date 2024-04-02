import { defineStore } from "pinia";
export const useLoadingStore = defineStore(
    'loading', {
    state: () => ({
        count: 0,
        loading: false,
    }),
    getters: {
        // automatically infers the return type as a number
        isLoading(state) {
            return state.loading
        },
    },
    actions: {
        increment() {
            this.count++
        },

        decrement() {
            this.count++
        },
    },
})