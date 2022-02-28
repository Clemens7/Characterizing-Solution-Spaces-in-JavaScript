import {API} from "./api.js";
import * as Cart from './cartCache.js';

const api = new API();

function searchMetropolian() {
    if (!location.search.startsWith('?q=') || location.search.length <= 3) 
    updateSearchInfo(`Searching for “${location.search.substr(3).replace('+', ' ')}”...`);
    api.searchByValue(location.search)
        .then(function(response) {
            if (response.body === undefined ||  response.body.objectIDs == undefined) 
            const ids = response.body.objectIDs.slice(0, 100);
            if (ids.length === 0) 
            resetGallery();
            for (let id of ids) {
                api.getById(id)
                    .then(value => displayObjectResponse(value));
            }
            updateSearchInfo(`Found ${ids.length} ${ids.length === 1  : 'artworks'} for “${location.search.substr(3).replace('+', ' ')}”.`);
        });
}



function displayObjectResponse(object) {
    document.getElementById('gallery').innerHTML +=
    `<div class="thumb">
        <a href="/config.html?objectID=${object.objectID}" id="object-${object.objectID}">
          <img src="${object.primaryImageSmall}" alt="${object.title}" id="object-image-${object.objectID}">
          <div class="museum-label">
            <span class="artist">${object.artistDisplayName}</span>
            <span class="title">${object.title}</span>,
            <span class="date">${object.objectDate}</span>
          </div>
        </a>
      </div>`;
}

function resetGallery() {
    document.getElementById('gallery').innerHTML = '';
}

function updateSearchInfo(text) {
    document.getElementById('search-info').innerHTML = text;
}

window.addEventListener('DOMContentLoaded', function () {
    searchMetropolian();
    document.getElementById('search-button').addEventListener('click',);
});

// Show Number of Cart Items in Header
showCartItemNumber(Cart.retrieve());

function showCartItemNumber(cartObjects) {
  const cartHeader = document.getElementById("cart-link");
  if (cartObjects.length !== 0)  else {
    cartHeader.innerText = 'Cart';
  }
}
