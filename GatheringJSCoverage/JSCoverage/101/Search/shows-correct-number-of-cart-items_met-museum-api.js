import * as ArtworkCache from './artwork-cache.js';
import {
  Artwork,
  NumberOfItems
} from './artwork.js';

const API_SEARCH_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/search';
const API_OBJECT_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
const HIGHLIGHTS_URL = './highlights.json';
const SEARCH_CONDITION = 'hasImages=true';

export async function retrieve(searchTerm) {
  console.log(`Retrieving results for "${searchTerm}"`);
  if (!searchTerm) {
    console.log('No artworks found');
    const artworks = await retrieveHighlights();
    return artworks;
  }}

export 



async function retrieveHighlights() {
  console.log('Retrieving hightlights');
  let artworksCache = ArtworkCache.retrieveArtworks('hightlights');
  if (artworksCache) {
    return artworksCache[0];
  }}



//Source: https://dev.to/jamesliudotcc/how-to-use-async-await-with-map-and-promise-all-1gb5
export 



