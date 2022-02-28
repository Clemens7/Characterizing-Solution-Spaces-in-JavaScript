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
export async function createMuseumLabel(artwork,target){
  const artistlabel = textElement('span', artwork.artist);
  artistlabel.setAttribute('class', 'artist');

  const titlelabel = textElement('span', artwork.title);
  titlelabel.setAttribute('class', 'title');

  const datelabel = textElement('span', artwork.date);
  datelabel.setAttribute('class', 'date');

  target.appendChild(artistlabel);
  target.appendChild(titlelabel);
  target.appendChild(document.createTextNode(", "));
  target.appendChild(datelabel);
}
export 

function textElement(tag, text) {
  const element = document.createElement(tag);
  element.innerText = text;
  return element;
}