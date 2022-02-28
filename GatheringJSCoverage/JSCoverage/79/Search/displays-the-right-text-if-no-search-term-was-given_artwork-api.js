import { Artwork } from './artwork.js';
import * as ArtworkCache from './artwork-cache.js'

const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';
var artworks = [];
export 
export async function retrieveImageData(searchedArtworks) {
  await Promise.all(searchedArtworks.map((oid) => retrieveSingleImageData(oid)));}

export async function retrieveSingleImageData(objid) {
  let obj = await ArtworkCache.retrieve(objid);
  if (!obj) {
    let response = await fetch(MET_BASE_URL + 'objects/' + objid);
    let rawData = await response.json();}

export 
export 
export 

