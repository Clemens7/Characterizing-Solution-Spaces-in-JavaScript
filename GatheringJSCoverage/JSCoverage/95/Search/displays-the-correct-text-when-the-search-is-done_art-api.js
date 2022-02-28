import {Object} from "./object.js"
import * as ArtworkCache from './artwork-cache.js';

export 


export async function retrieveObjectIDs(searchTerm) {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`;
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        return rawData.objectIDs.slice(0, 100);
    }catch (error) {
        console.log(`An error happened when trying to retrieve data from URL ${url}`);
        console.log(error);
    }
}

export 






