import {search, highlights, getObject} from "./api.js";
import {cartElements} from "./cart-display.js";

cartElements();

let params = (new URL(document.location)).searchParams.get('q');
if (!params) 
artworkSearch(params);

async function artworkSearch(q) {
  document.getElementById("search").value = q;
  document.getElementById('gallery').innerText = '';
  const searchInfo = document.getElementById('search-info');
  let ids = [];
  if (q!='') {
    searchInfo.innerHTML = 'Searching for “' + q + '”...';
    ids = await search(q);
    searchInfo.innerHTML = `Found ${ids.length} artwork${ids.length == 1  : 's'} for &ldquo;${q}&rdquo;`;
  }
  ids.map();
}




