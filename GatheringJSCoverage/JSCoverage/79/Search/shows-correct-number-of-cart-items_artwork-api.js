import { Artwork } from './artwork.js';
import * as ArtworkCache from './artwork-cache.js'

const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';
var artworks = [];
export 
export async function retrieveImageData(searchedArtworks) {
  await Promise.all(searchedArtworks.map((oid) => retrieveSingleImageData(oid)));
  return (artworks);
}

export async function retrieveSingleImageData(objid) {
  let obj = await ArtworkCache.retrieve(objid);
  if (!obj) 
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