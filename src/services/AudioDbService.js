import axios from 'axios';
import config from '../config';

export default class AudioDbService {
    constructor() {
        this.client = axios.create({
            baseURL: `${config.apiUrl}${config.apiKey}`,
            headers: {
                'x-cors-api-key': config.proxyCorsApiKey
            }

        });
    }

    fetchAlbumsByArtist(artistName) {
        const url = `/searchalbum.php?s=${encodeURIComponent(artistName)}`;
        return this.client.get(url)
            .then(response => {
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
        const url = `/album.php?m=${albumId}`;
        return this.client.get(url)
            .then(response =>
                response.data.album[0] || []
            )
            .catch(error => {
                console.error('Error fetching album:', error);
                return [];
            });
    }

    fetchAlbumTracksById(albumId) {
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
