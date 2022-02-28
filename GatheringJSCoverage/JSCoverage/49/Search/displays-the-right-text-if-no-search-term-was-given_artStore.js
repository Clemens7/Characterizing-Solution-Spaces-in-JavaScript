import { ArtObject } from './artObject.js'
import { retrieve, store } from './search-cache.js';

export async function getArtObjectByID(artObjectID) {
    try {
        let artworkCache = retrieve("artObjects") || {};
        if (artworkCache[artObjectID]) 
        const resp = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artObjectID}`);}

export  


//TODO call API

