import { Keywords } from './objectsArtwork.js';
import * as ArtworkCache from './artwork-cache.js';
import { writeNumberOfCartItems } from './global.js';

let searchKeywords = "";
let defaultPage = true;

var urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('q') & urlParams.get('q') != "") {
    defaultPage = false;
    const searchInput = urlParams.get('q');
    searchKeywords = searchInput.split(',');
    console.log(searchKeywords);
    document.getElementById("search-info").innerHTML = "Searching for “" + searchKeywords + "”...";
    searchArtwork(searchKeywords);
}

writeNumberOfCartItems(document.getElementById('cart-link'));

async function searchArtwork(searchKeywords) {
    console.log("Searched stuff are: " + searchKeywords);
    const searchResults = await retrieve(searchKeywords); //get results (all ids)
    const responseArtworkIDs = await searchResults.objectIDs;
    gallery.innerHTML = '';
    loadIds(responseArtworkIDs);
}


async function loadIds(data) {
    if (data == null) {
        document.getElementById("search-info").innerHTML = "Found 0 artworks for “" + searchKeywords + "”";
    }
}









async function retrieve(searchKeywords) {
    let artworks = ArtworkCache.retrieve(searchKeywords);
    if (artworks) 
    const url = api_url(searchKeywords);
    try {
      const response = await fetch(url);
      const rawData = await response.json();
      ArtworkCache.store(searchKeywords, rawData);
      return rawData;
    }}
  
  function api_url(searchKeywords) {
    const urlwithkeys = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${Keywords.serialize(searchKeywords)}`
    //return 'https://cors-anywhere.herokuapp.com/' + url;
    return urlwithkeys;
  }
