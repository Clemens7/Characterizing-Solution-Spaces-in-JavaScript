import * as artStore from './artStore.js';
import * as searchCache from './search-cache.js';

document.addEventListener('DOMContentLoaded', event =>
{
  let q = (new URLSearchParams(location.search)).get("q");
  if (q)  else {
    noSearchArtworks();
  }
});



async function noSearchArtworks(){
    let highlights = searchCache.retrieve("highlights");

    if (!highlights) {
      const resp = await fetch('./highlights.json');
      const data = await resp.json();
      highlights = await Promise.all(data["highlights"].map(artStore.getArtObjectByID));}

