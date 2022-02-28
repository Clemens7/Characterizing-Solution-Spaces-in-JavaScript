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



let params = (new URL(document.location)).searchParams;

if (params.get('q'))  else {
  (async function () {
    let res = await fetch('highlights.json');
    let data = await res.json();
    displayObjects(data.highlights);
  })();
}

const number = JSON.parse(localStorage.getItem('cart') 