import * as ArtworkCache from './artwork-cache.js'
import { Artwork, SearchValues } from "./Artwork.js";

export 

export 





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