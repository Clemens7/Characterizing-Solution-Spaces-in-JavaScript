import { Artwork } from './artwork-model.js';
import * as CACHE from '../search/artwork-cache.js';

export async function getArtworkByObjectId(objectId) {
    let artworkCached = CACHE.retrieve(objectId);
    if (artworkCached) 

    const url = artwork_id_url(objectId);
    const response = await fetch(url);
    if (!response.ok) 
    const rawData = await response.json();}

export 

export async function getArtworksByObjectIds(artworkIds) {
    let artworks = [];

    for (let id of artworkIds) {
        let art = await getArtworkByObjectId(id);}


export 

export 


function artwork_id_url(objectId) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
}


