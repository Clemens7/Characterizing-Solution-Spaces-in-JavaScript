import {Artwork} from "./artwork.js";
import * as ArtworkCache from "./artwork-cache.js"

export const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";

export const retrieve = ;

export const retrieveFromObjectIDs = objectIDs => {
    return objectIDs.map(async objectID => retrieveFromObjectID(objectID))
};

export const retrieveFromObjectID = async objectID => {
    try {
        const response = await fetch(`${BASE_URL}objects/${objectID}`);};