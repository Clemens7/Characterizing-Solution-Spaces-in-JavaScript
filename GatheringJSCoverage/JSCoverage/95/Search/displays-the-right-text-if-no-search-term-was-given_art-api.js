import {Object} from "./object.js"
import * as ArtworkCache from './artwork-cache.js';

export 


export 

export async function retrieveObject(objectID) {
    if (!objectID) 
    let object = ArtworkCache.retrieveStorage(objectID);
    if (object) 
    try {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
        const object = await response.json();}






