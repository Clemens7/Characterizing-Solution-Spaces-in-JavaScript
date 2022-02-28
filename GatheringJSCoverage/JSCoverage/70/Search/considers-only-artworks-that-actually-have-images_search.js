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
  Cache.searchArt(searchString).then();
}



document.getElementById("cart-link").innerHTML = Cache.generateCartString();