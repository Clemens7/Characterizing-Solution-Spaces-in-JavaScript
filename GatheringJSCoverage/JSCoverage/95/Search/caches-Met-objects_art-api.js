import {Object} from "./object.js"
import * as ArtworkCache from './artwork-cache.js';

export 


export async function retrieveObjectIDs(searchTerm) {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`;
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        return rawData.objectIDs.slice(0, 100);
    }}

export async function retrieveObject(objectID) {
    if (!objectID) 
    let object = ArtworkCache.retrieveStorage(objectID);
    if (object) {
        return object;
    }}






