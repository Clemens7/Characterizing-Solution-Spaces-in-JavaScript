import {Artwork} from "./artwork.js";
import * as ArtworkCache from "./artwork-cache.js"

export const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";

export const retrieve = ;

export const retrieveFromObjectIDs = ;

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