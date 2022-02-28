import { Artwork } from './artwork.js';
import * as ArtworkCache from './artwork-cache.js';

export async function retrieveIds(artworkName) {
    const url = met_api_search_ids_url(artworkName);
    const responseObject = await fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch();
    return responseObject;
}

export 

export 

export 

function met_api_search_ids_url(artworkName) {
    const MET_API_SEARCH_IDS_URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${artworkName}`;
    return MET_API_SEARCH_IDS_URL;
}

