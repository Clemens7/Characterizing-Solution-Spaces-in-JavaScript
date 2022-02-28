import {Picture} from './Picture.js';
import * as PictureCache from './PictureCache.js'
//parameter q is the string to search for
export async function api_search(q) {
    //No Caching for search

    const url = api_url_search(q);
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        const objectIDs = rawData.objectIDs;
        return objectIDs;
    }}

//parameter objectID is the ID of a single object
export 

function api_url_search(q) {
    const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${escape(q)}&hasImages=true`;
    return API_URL;
}


