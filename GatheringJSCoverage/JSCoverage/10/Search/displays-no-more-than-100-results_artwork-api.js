import {Artwork} from "./artwork.js";
import * as ArtworkCache from "./artwork-cache.js"

export const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";

export const retrieve = async searchTerm => {
    const cachedArtworks = ArtworkCache.retrieve(searchTerm);
    if (cachedArtworks) 
    try {
        const response = await fetch(`${BASE_URL}search?hasImages=true&q=${searchTerm}`);
        const jsonResponse = await response.json();
        if (jsonResponse.objectIDs === null || jsonResponse.objectIDs.length === 0) 
        const artworks = await Promise.all(retrieveFromObjectIDs(jsonResponse.objectIDs.slice(0, 100)));
        ArtworkCache.store({searchTerm, searchResult: {artworks, quantity: jsonResponse.total}})
        return {artworks, quantity: jsonResponse.total};
    }};

export const retrieveFromObjectIDs = objectIDs => {
    return objectIDs.map(async objectID => retrieveFromObjectID(objectID))
};

export const retrieveFromObjectID = async objectID => {
    try {
        const response = await fetch(`${BASE_URL}objects/${objectID}`);
        const jsonArtwork = await response.json();
        return new Artwork(
            jsonArtwork.primaryImageSmall,
            jsonArtwork.objectName,
            jsonArtwork.artistDisplayName,
            jsonArtwork.title,
            jsonArtwork.objectDate,
            jsonArtwork.objectID
        );
    }};