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
    return ArtworkCache.retrieve('search-' + query) }



export async function getObjectCached(id) {
    return ArtworkCache.retrieve('object-' + id) }

