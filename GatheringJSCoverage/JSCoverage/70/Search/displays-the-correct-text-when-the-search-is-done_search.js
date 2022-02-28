import * as Cache from './cache.js';
import { generateThumbnail } from './artmart-dom.js';

const query = window.location.search;
const queryParametrs = new URLSearchParams(query);
const searchString = queryParametrs.get('q');

if (typeof searchString != 'string' || searchString.length === 0) 

else {
  document.getElementById("search").value = searchString;
  document.getElementById("search-info").innerHTML = `Searching for \u201C${searchString}\u201D...`;

  console.log(searchString);
  Cache.searchArt(searchString).then(response => {
    const number = response.total;
    let artworks;
    if (number == 1)  else {
      artworks = "artworks";
    }
    document.getElementById("search-info").innerHTML = `Found ${number} ${artworks} for \u201C${searchString}\u201D`;
    generateThumbnails(response.objectIDs);
  });
}

function generateThumbnails(ids) {
  let galleryElement = document.getElementById("gallery");

  for (const id of ids) }

document.getElementById("cart-link").innerHTML = Cache.generateCartString();