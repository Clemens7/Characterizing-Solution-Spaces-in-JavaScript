import * as ArtworkCache from './artwork-cache.js'
import { Artwork, SearchValues } from "./Artwork.js";

export 

export async function highlights() {
    const response = await fetch("./highlights.json");
    const rawData = await response.json();
    //const ids = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];
    return rawData.highlights.map(getObjectCached)
}





export async function getObjectCached(id) {
    return ArtworkCache.retrieve('object-' + id) }

