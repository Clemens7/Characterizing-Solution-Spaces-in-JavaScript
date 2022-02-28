import { loadObject, metAPI } from './metApi.js';

const searchInfo = document.getElementById('search-info');
const gallery = document.getElementById('gallery');
const API = metAPI;

function displayObjects(objectIDs) {
  Promise.all(objectIDs.map()).then(function (objects) {

    gallery.innerHTML = '';

    objects.forEach();
  });
}

async function search(term) {
  searchInfo.textContent = `Searching for “${term}”...`;
  let res = await fetch(API + '/search?hasImages=true&q=' + term);
  let objectIDs = ((await res.json()).objectIDs ?? []).slice(0, 100);
  searchInfo.textContent = `Found ${objectIDs.length} artwork${objectIDs.length == 1  : 's'} for “${term}”`;
  displayObjects(objectIDs);
}

let params = (new URL(document.location)).searchParams;

if (params.get('q')) {
  document.getElementById('search').value = params.get('q');
  search(params.get('q'));
}

const number = JSON.parse(localStorage.getItem('cart') ?? '[]').length;
document.getElementById('cart-link').textContent = `Cart (${number})`;
