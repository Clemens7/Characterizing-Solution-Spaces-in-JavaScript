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
  ids.map(objectID => getObject(objectID).then(appendArtworkElement));
}

function appendArtworkElement(artwork) {
  //create outer DIv
  const outerDiv = document.createElement('div');
  outerDiv.setAttribute('class', 'thumb');
  //create ref
  const ref = document.createElement('a');
  ref.setAttribute('href', 'config.html?objectID=' + artwork.objectID);
  ref.setAttribute('id', 'object-' + artwork.objectID);
  //create img
  const img = document.createElement('img');
  img.setAttribute('src', artwork.primaryImageSmall);
  img.setAttribute('alt', artwork.title);
  img.setAttribute('id', 'object-image' + artwork.objectId);
  //create innerDiv
  const innerDiv = document.createElement('div');
  innerDiv.setAttribute('class', 'museum-label');
  //create span for artist
  const artistSpan = document.createElement('span');
  artistSpan.setAttribute('class', 'artist');
  artistSpan.innerText = artwork.artistDisplayName;
  //create span for title
  const titleSpan = document.createElement('span');
  titleSpan.setAttribute('class', 'title');
  titleSpan.innerText = artwork.title + ', ';
  //create span for date
  const dateSpan = document.createElement('span');
  dateSpan.setAttribute('class', 'date');
  dateSpan.innerText = artwork.objectDate;
  //get html together
  ref.appendChild(img);
  innerDiv.appendChild(artistSpan);
  innerDiv.appendChild(titleSpan);
  innerDiv.appendChild(dateSpan);
  ref.appendChild(innerDiv);
  outerDiv.appendChild(ref);
  document.getElementById("gallery").appendChild(outerDiv);
}


