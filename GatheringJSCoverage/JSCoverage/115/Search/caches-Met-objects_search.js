import { loadObject, metAPI } from './metApi.js';

const searchInfo = document.getElementById('search-info');
const gallery = document.getElementById('gallery');
const API = metAPI;

function displayObjects(objectIDs) {
  Promise.all(objectIDs.map(id => loadObject(id, API))).then(function (objects) {

    gallery.innerHTML = '';

    objects.forEach(obj => {
      gallery.innerHTML += `
          <div class="thumb">
            <a href="config.html?objectID=${obj.objectID}" id="object-${obj.objectID}">
              <img src="${obj.primaryImageSmall}" alt="picture" id="object-image-${obj.objectID}">
              <div class="museum-label">
                <span class="artist">${obj.artistDisplayName}</span>
                <span class="title">${obj.title}</span>,
                <span class="date">${obj.objectDate}</span>
              </div>
            </a>
          </div>`
    });
  });
}

async function search(term) {
  searchInfo.textContent = `Searching for “${term}”...`;
  let res = await fetch(API + '/search?hasImages=true&q=' + term);
  let objectIDs = ((await res.json()).objectIDs  : 's'} for “${term}”`;
  displayObjects(objectIDs);
}

let params = (new URL(document.location)).searchParams;

if (params.get('q')) {
  document.getElementById('search').value = params.get('q');
  search(params.get('q'));
}

const number = JSON.parse(localStorage.getItem('cart') ?? '[]').length;
document.getElementById('cart-link').textContent = `Cart (${number})`;
