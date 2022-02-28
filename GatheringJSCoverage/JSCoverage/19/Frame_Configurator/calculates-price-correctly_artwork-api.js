import { Artwork } from './artwork.js';
import * as ArtworkCache from './artwork-cache.js';

export 

export 

export 

export async function retrieveObjectErrorHandling(id) {
    const artwork = ArtworkCache.retrieve(id);
    if (artwork) 

    const url = met_api_search_object_url(id);
    const responseObject = await fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch();

    if(responseObject.message != null)
    ArtworkCache.store(responseObject);
    return new Artwork(id, responseObject.artistDisplayName,
        responseObject.title, responseObject.objectDate, responseObject.primaryImageSmall);
}



function met_api_search_object_url(id) {
    const MET_API_SEARCH_OBJECT_URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
    return MET_API_SEARCH_OBJECT_URL;
}