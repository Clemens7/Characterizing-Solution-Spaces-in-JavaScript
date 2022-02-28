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
  if (!searchTerm) 
  let artworksCache = ArtworkCache.retrieveArtworks(searchTerm);
  if (artworksCache) 
  let url = search_url(searchTerm)
  try {
    let response = await fetch(url)
    let responseJson = await response.json();
    let artworkResponse = await retrieveArtworks(responseJson.objectIDs);
    ArtworkCache.store(searchTerm, artworkResponse, responseJson.objectIDs.length);
    return artworkResponse;
  }}

export 







//Source: https://dev.to/jamesliudotcc/how-to-use-async-await-with-map-and-promise-all-1gb5
export async function retrieveArtworks(objectIDs) {
  console.log(`Retrieving results for "${objectIDs}"`);
  //limit to 100
  objectIDs = objectIDs.slice(0, 100);
  console.log(objectIDs)
  let artworks = await Promise.all(
    objectIDs.map(async objectID => {
      try {
        let url = object_url(objectID);
        let artworkResponse = await fetch(url)
        return artworkResponse.json();
      }})
  )
  artworks = artworks.map(artwork => {
    return new Artwork(artwork.objectID,
      artwork.primaryImageSmall,
      artwork.title,
      artwork.artistDisplayName,
      artwork.objectDate,
      artwork.isHighlight);
  });
  return artworks;
}

function object_url(objectID) {
  return `${API_OBJECT_BASE_URL}${objectID}`;
}

function search_url(searchTerm) {
  const SEARCH_URL = `${API_SEARCH_BASE_URL}?q=${searchTerm}&${SEARCH_CONDITION}`;
  console.log('search url: ' + SEARCH_URL);
  return SEARCH_URL;
}