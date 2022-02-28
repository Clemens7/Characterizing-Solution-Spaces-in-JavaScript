import { Artwork } from './artwork.js';
import * as ArtworkCache from './artwork-cache.js'

const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';
var artworks = [];
export 
export 

export 

export async function getSingleImageData(objid) {
  let obj = await ArtworkCache.retrieve(objid);
  if (!obj) {
    let response = await fetch(MET_BASE_URL + 'objects/' + objid);
    let rawData = await response.json();
    obj = new Artwork(rawData.objectID, rawData.artistDisplayName, rawData.title, rawData.objectDate, rawData.primaryImageSmall, '/config.html?objectID=' + objid);
    ArtworkCache.store(objid, obj);
  }
  return obj;
}
export 
export 

