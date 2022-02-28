import { loadObject, metAPI } from './metApi.js';

const searchInfo = document.getElementById('search-info');
const gallery = document.getElementById('gallery');
const API = metAPI;

function displayObjects(objectIDs) {
  Promise.all(objectIDs.map(id => loadObject(id, API))).then();
}



let params = (new URL(document.location)).searchParams;

if (params.get('q'))  else {
  (async function () {
    let res = await fetch('highlights.json');
    let data = await res.json();
    displayObjects(data.highlights);
  })();
}

const number = JSON.parse(localStorage.getItem('cart') ?? '[]').length;
document.getElementById('cart-link').textContent = `Cart (${number})`;
