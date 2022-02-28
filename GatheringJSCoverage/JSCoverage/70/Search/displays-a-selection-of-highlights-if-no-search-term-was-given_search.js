import * as Cache from './cache.js';
import { generateThumbnail } from './artmart-dom.js';

const query = window.location.search;
const queryParametrs = new URLSearchParams(query);
const searchString = queryParametrs.get('q');

if (typeof searchString != 'string' ) {
  console.log('String empty');
  // read highlights
  fetch('./highlights.json').then(resp => {
    return resp.json();
  }).then(data => {
    console.log(data);
    generateThumbnails(data.highlights);
  });

}

function generateThumbnails(ids) {
  let galleryElement = document.getElementById("gallery");

  for (const id of ids) {
    Cache.getObjectData(id).then(res => generateThumbnail(res, galleryElement));
  }
}

document.getElementById("cart-link").innerHTML = Cache.generateCartString();