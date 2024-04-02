import axios from 'axios';
import config from '../config';
import { useLoadingStore } from "../stores/loading";

export default class AudioDbService {

    constructor() {

        this.client = axios.create({
            baseURL: `${config.apiUrl}${config.apiKey}`,
            headers: {
                'x-cors-api-key': config.proxyCorsApiKey
            }

        });

        const loadingStore = useLoadingStore()


        this.client.interceptors.request.use(function (config) {
            // Show spinner
            loadingStore.loading = true;
            return config
        }, function (error) {
            loadingStore.loading = false;

            return Promise.reject(error);

        });

        this.client.interceptors.response.use(function (response) {
            // Hide spinner
            loadingStore.loading = false;

            return response;
        }, function (error) {
            loadingStore.loading = false;

            return Promise.reject(error);
        });

    }

    async fetchAlbumsByArtist(artistName) {
        const url = `/searchalbum.php?s=${encodeURIComponent(artistName)}`;
        return await this.client.get(url)
            .then(response => {
                console.debug(`Fetched artist albums: ${artistName}`);

                if (response.data.album && response.data.album.length > 0) {
                    return response.data.album;
                } else {
                    return [];
                }
            })
            .catch(error => {
                console.error('Error fetching albums:', error);
                return [];
            });
    }

    fetchAlbumById(albumId) {
        if (albumId !== undefined) {
            const url = `/album.php?m=${albumId}`;
            return this.client.get(url)
                .then(response => {
                    console.debug(`Fetching  album: ${albumId}`);

                    if (response.data.album && response.data.album.length > 0) {
                        return response.data.album[0];
                    } else {
                        console.warn(`Album not found: ${albumId}`);
                        return undefined;
                    }
                } )
                .catch(error => {
                    console.error('Error fetching album:', error);
                    return [];
                });
        }
    }

    fetchAlbumTracksById(albumId) {
        console.debug(`Looking for tracks for AlbumId: ${albumId}`)
        const url = `/track.php?m=${albumId}`;
        return this.client.get(url)
            .then(response =>
                response.data.track || []
            )
            .catch(error => {
                console.error('Error fetching album tracks:', error);
                return [];
            });
    }


    fetchTrackById(trackId) {
        const url = `/track.php?h=${trackId}`;
        return this.client.get(url)
            .then(response => {
                    if (response.data.track && response.data.track.length > 0) {
                        return response.data.track[0]; // Assuming the API returns an array
                    } else {
                        throw new Error('Track not found');
                    }
                }
            )
            .catch(error => {
                console.error('Error fetching track:', error);
                return [];
            });
    }

}
