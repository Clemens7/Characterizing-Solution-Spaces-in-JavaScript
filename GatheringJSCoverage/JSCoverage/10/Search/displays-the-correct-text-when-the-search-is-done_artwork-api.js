import {Artwork} from "./artwork.js";
import * as ArtworkCache from "./artwork-cache.js"

export const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";

export const retrieve = async searchTerm => {
    const cachedArtworks = ArtworkCache.retrieve(searchTerm);
    if (cachedArtworks) 
    try {
        const response = await fetch(`${BASE_URL}search?hasImages=true&q=${searchTerm}`);
        const jsonResponse = await response.json();
        if (jsonResponse.objectIDs === null ) {
            return;
        }};

export const retrieveFromObjectIDs = ;

export const retrieveFromObjectID = 