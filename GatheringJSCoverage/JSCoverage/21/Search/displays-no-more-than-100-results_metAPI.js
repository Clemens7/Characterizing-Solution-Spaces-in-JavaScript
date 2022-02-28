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
export async function api_getObject(objectID) {
    let picture = PictureCache.retrieve(objectID);
    if(picture) 


    const url = api_url_getObject(objectID);

    try {
        const response = await fetch(url);
        const rawData = await response.json();
        //check if there is no data
        if(rawData.message)
        picture = new Picture(
                rawData.objectID,
                rawData.objectDate,
                rawData.primaryImageSmall,
                rawData.title,
                rawData.artistDisplayName
                );
        //Store In Cache
        PictureCache.store(objectID, picture);
        return picture;
    }}

function api_url_search(q) {
    const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${escape(q)}&hasImages=true`;
    return API_URL;
}

function api_url_getObject(objectID){
    const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
    return API_URL;
}
