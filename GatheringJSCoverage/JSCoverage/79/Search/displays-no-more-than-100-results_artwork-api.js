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
      const rawData = await response.json();
      if (rawData.total > 0) {
        let searchedArtworks = await rawData.objectIDs;
        searchedArtworks = await searchedArtworks.slice(0, 100);
        ArtworkCache.store(searchTerm, searchedArtworks);
        return retrieveImageData(searchedArtworks);
      }
    }
  }}
export async function retrieveImageData(searchedArtworks) {
  await Promise.all(searchedArtworks.map((oid) => retrieveSingleImageData(oid)));
  return (artworks);
}

export async function retrieveSingleImageData(objid) {
  let obj = await ArtworkCache.retrieve(objid);
  if (!obj) {
    let response = await fetch(MET_BASE_URL + 'objects/' + objid);
    let rawData = await response.json();
    obj = new Artwork(rawData.objectID, rawData.artistDisplayName, rawData.title, rawData.objectDate, rawData.primaryImageSmall, '/config.html?objectID=' + objid);
    ArtworkCache.store(objid, obj);
  }
  artworks.push(obj);
}

export 
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
export async function createArtworkElement(artwork, target) {
  const artContainer = document.createElement('div');
  artContainer.setAttribute('class', 'thumb');
  const a = document.createElement('a')
  a.setAttribute('href', artwork.url);
  a.setAttribute('id', 'object-' + artwork.objectid);

  const image = document.createElement('img');
  image.setAttribute('src', artwork.thumbnail);
  image.setAttribute('alt', artwork.title);
  image.setAttribute('id', 'object-image-' + artwork.objectid);

  const museumlabel = document.createElement('div');
  museumlabel.setAttribute('class', 'museum-label');

  createMuseumLabel(artwork,museumlabel);

  a.appendChild(image);
  a.appendChild(museumlabel);
  artContainer.appendChild(a);

  target.appendChild(artContainer);
}

function textElement(tag, text) {
  const element = document.createElement(tag);
  element.innerText = text;
  return element;
}