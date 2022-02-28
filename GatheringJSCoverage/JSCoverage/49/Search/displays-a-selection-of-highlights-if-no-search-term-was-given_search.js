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
      highlights = await Promise.all(data["highlights"].map(artStore.getArtObjectByID));
      searchCache.store("highlights", highlights);
    }

    const section = document.getElementById('gallery');
    section.innerHTML="";
    for(let artwork of highlights){
        section.appendChild(createArtworkElement(artwork));
    }
   
}

function createArtworkElement(artwork){
    const article = document.createElement('article');
    article.innerHTML=
    `<div class="thumb">
    <a href="config.html">
      <img src="${artwork.previewImage}" alt="${artwork.artObjectID}" id="object-image-0">
      <div class="museum-label">
        <span class="artist">${artwork.artist}</span>
        <span class="title">${artwork.title}</span>,
        <span class="date">${artwork.year}</span>
      </div>
    </a>
  </div>`;
  return article;
}