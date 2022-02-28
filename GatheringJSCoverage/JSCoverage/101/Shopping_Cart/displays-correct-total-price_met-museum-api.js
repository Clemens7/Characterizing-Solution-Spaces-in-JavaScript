import * as ArtworkCache from './artwork-cache.js';
import {
  Artwork,
  NumberOfItems
} from './artwork.js';

const API_SEARCH_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/search';
const API_OBJECT_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
const HIGHLIGHTS_URL = './highlights.json';
const SEARCH_CONDITION = 'hasImages=true';

export 

export async function retrieveUsingObjectID(objectID) {
  let artworksCache = ArtworkCache.retrieveArtwork(objectID);
  console.log(`artworksCache:  ${JSON.stringify(artworksCache)}`);
  if (artworksCache) 
  let artworkResponse = await retrieveArtwork(objectID);
  console.log(`artwork ${JSON.stringify(artworkResponse)}`);
  ArtworkCache.storeArtwork(artworkResponse);
  return artworkResponse;
}

async function retrieveArtwork(objectID) {
  const url = `${API_OBJECT_BASE_URL}${objectID}`;
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  }}





//Source: https://dev.to/jamesliudotcc/how-to-use-async-await-with-map-and-promise-all-1gb5
export 



