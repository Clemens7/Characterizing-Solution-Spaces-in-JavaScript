import * as artStore from './artStore.js';
import * as searchCache from './search-cache.js';

document.addEventListener('DOMContentLoaded', event =>
{
  let q = (new URLSearchParams(location.search)).get("q");
  if (q) {
    searchArtworks(q);
  }
});

async function searchArtworks(search){
    document.getElementById('search-info').innerHTML=`Searching for “${search}”...`;

    const artworks = await artStore.getArtworksbySearch(search);}



