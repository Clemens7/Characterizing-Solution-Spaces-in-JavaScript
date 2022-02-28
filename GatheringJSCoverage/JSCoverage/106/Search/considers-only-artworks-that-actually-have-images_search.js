import { addNumberToNav } from './cart.js';

document.addEventListener('DOMContentLoaded', function (event) {
  var urlParams = new URLSearchParams(window.location.search);
  document.getElementById('search').value = urlParams.get('q');
  if (document.getElementById('search').value) {
    document.getElementById('search').value.replace('+', ' ');
    document.getElementById('search-info').innerHTML =
      'Searching for “' + document.getElementById('search').value + '”...';
  }
  searchImages();
  addNumberToNav();
});

function searchImages() {
  var searchString = document.getElementById('search').value;
  if (searchString) {
    getJSON(
      'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' +
        searchString +
        '&hasImages=true'
    ).then();
  }
}





async function getJSON(url) {
  let response = await fetch(url);}
