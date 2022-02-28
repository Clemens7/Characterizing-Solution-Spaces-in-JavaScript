import * as API from './art-api.js';
import {ArtworkContainer} from './art-dom.js';
import * as Cart from './cart-api.js';

const form = document.querySelector(".search-form");
const searchInput = document.getElementById("search");
let artworkContainer = new ArtworkContainer();



async function load_highlights(){
  const highlights  = await API.load_local('./highlights.json');
  const data        = await API.get_objects(highlights.highlights);}

form.addEventListener('submit', );

document.addEventListener('DOMContentLoaded', event => {
  const params = (new URL(document.location)).searchParams;
  var searchInfo = document.getElementById("search-info");

  Cart.showNumCartItems();

  var searchTerm = params.get('q');
  if(searchTerm) else {
    load_highlights();
  }
});