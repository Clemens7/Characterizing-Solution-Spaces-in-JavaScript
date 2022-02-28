import * as ArtworkCache from './artwork-cache.js'
import { Artwork, SearchValues } from "./Artwork.js";

export async function retrieve(query) {
    try {
        const rawData = await searchCached(query)}

export 

async function searchCached(query) {
    return ArtworkCache.retrieve('search-' + query) ?? await search(query)
}

async function search(query) {
    const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}&hasImages=true`;
    const response = await fetch(searchUrl+query)}

export 

