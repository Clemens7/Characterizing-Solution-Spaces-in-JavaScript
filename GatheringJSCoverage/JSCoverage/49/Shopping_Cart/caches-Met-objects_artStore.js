import { ArtObject } from './artObject.js'
import { retrieve, store } from './search-cache.js';

export async function getArtObjectByID(artObjectID) {
    try {
        let artworkCache = retrieve("artObjects") ;
        if (artworkCache[artObjectID]) {
            return artworkCache[artObjectID];
        }}

export  


//TODO call API

