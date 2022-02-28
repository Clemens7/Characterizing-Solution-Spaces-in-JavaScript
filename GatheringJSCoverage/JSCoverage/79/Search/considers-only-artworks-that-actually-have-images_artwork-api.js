import { Artwork } from './artwork.js';
import * as ArtworkCache from './artwork-cache.js'

const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';
var artworks = [];
export async function retrieve(searchTerm) {
  artworks = [];
  let objects = await ArtworkCache.retrieve(searchTerm);
  if (objects)  else {
    try {
      const response = await fetch(MET_BASE_URL + 'search?hasImages=true&q=' + searchTerm);
    }
  }}
export 

export 

export 
export 
export 

