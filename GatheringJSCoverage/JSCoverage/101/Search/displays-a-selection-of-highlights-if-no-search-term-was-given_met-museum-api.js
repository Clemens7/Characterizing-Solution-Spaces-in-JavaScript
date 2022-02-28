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
  if (artworksCache) 
  const highlights = await retrieveHighlightsFromFile();
  const objectIDs = highlights.highlights;
  let artworks = await retrieveArtworks(objectIDs);
  ArtworkCache.store('hightlights', artworks, artworks.length);
  return artworks;
}

async function retrieveHighlightsFromFile() {
  try {
    let highlights = await fetch(HIGHLIGHTS_URL);
    let highlightsJson = highlights.json();
    return highlightsJson;
  }}

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

