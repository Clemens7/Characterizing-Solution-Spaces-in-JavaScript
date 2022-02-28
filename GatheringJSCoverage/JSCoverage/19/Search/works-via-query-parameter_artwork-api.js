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

export async function retrieveObject(id) {
    const artwork = ArtworkCache.retrieve(id);
    if (artwork) 

    const url = met_api_search_object_url(id);
    const responseObject = await fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch()
    
    ArtworkCache.store(responseObject);
    return new Artwork(id, responseObject.artistDisplayName,
        responseObject.title, responseObject.objectDate, responseObject.primaryImageSmall);
}

export 

export 

function met_api_search_ids_url(artworkName) {
    const MET_API_SEARCH_IDS_URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${artworkName}`;
    return MET_API_SEARCH_IDS_URL;
}

function met_api_search_object_url(id) {
    const MET_API_SEARCH_OBJECT_URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
    return MET_API_SEARCH_OBJECT_URL;
}