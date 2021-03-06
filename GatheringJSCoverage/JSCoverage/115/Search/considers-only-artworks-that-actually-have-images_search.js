import { loadObject, metAPI } from './metApi.js';

const searchInfo = document.getElementById('search-info');
const gallery = document.getElementById('gallery');
const API = metAPI;

function displayObjects(objectIDs) {
  Promise.all(objectIDs.map(id => loadObject(id, API))).then();
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
