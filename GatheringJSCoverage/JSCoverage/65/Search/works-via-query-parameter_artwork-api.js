import * as ArtworkCache from './artwork-cache.js'
import { Artwork, SearchValues } from "./Artwork.js";

export async function retrieve(query) {
    try {
        const rawData = await searchCached(query)
        let n = Math.min(100, rawData.objectIDs.length)

        // Get the first 100 objectIds and retrieve their objects from the api
        return rawData.objectIDs.slice(0, n).map(getObjectCached)
    }}

export 

async function searchCached(query) {
    return ArtworkCache.retrieve('search-' + query) ?? await search(query)
}

async function search(query) {
    const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}&hasImages=true`;
    const response = await fetch(searchUrl+query)
    if(response.status != 200) 
    const search = await response.json()
    ArtworkCache.store('search-' + query, search)
    return search
}

export async function getObjectCached(id) {
    return ArtworkCache.retrieve('object-' + id) ?? await getObject(id)
}

async function getObject(id) {
    const objectUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
    const response = await fetch(objectUrl+id)
    if(response.status != 200) 
    const object = await response.json()
    ArtworkCache.store('object-' + id, object)
    return object
}