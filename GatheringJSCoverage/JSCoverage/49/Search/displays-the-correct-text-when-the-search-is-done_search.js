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

    const artworks = await artStore.getArtworksbySearch(search);
    console.log(artworks);
    const gallery = document.getElementById('gallery');
    gallery.innerHTML="";
    for (let i=0;i<Math.min(100,artworks.length);i++) 
    if (artworks.length==1)
    else{
      document.getElementById('search-info').innerHTML=`Found ${artworks.length} artworks for “${search}”`;
    }
}



