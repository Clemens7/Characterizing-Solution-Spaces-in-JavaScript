import * as API from './art-api.js';
import {ArtworkContainer} from './art-dom.js';
import * as Cart from './cart-api.js';

const form = document.querySelector(".search-form");
const searchInput = document.getElementById("search");
let artworkContainer = new ArtworkContainer();

async function search(term){
  const info = document.getElementById("search-info");
  info.innerHTML = `Searching for “${term}”...`;

  const IDs = await API.search(term);
  if(!IDs) 

  const data = await API.get_objects(IDs);
  //console.log(data);
  if (term == "none" || term == "null") else if (IDs.length > 1){
    info.innerHTML = `Found ${IDs.length} artworks for “${term}”`;
  }
  artworkContainer.addArtworks(data);
}



form.addEventListener('submit', );

document.addEventListener('DOMContentLoaded', event => {
  const params = (new URL(document.location)).searchParams;
  var searchInfo = document.getElementById("search-info");

  Cart.showNumCartItems();

  var searchTerm = params.get('q');
  if(searchTerm){
    search(searchTerm);
  }
});