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
  if (artworksCache) {
    return artworksCache;
  }}







//Source: https://dev.to/jamesliudotcc/how-to-use-async-await-with-map-and-promise-all-1gb5
export 



