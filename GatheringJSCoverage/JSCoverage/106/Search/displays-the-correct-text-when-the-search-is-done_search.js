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
    ).then((data) => {
      if (data.total == 1)  else {
        document.getElementById('search-info').innerHTML =
          'Found ' + data.total + ' artworks for “' + searchString + '”';
      }
      showImages(data);
    });
  }
}

function showImages(foundObjects, highlights) {
  if (foundObjects) {
    var max = 100;
    if (!highlights && foundObjects.total )  else if (highlights) 
    for (var i = 0; i < max; i++) {
      if (highlights)  else {
        if (!window.localStorage.getItem(foundObjects.objectIDs[i])) 
      }
    }
  }
}



async function getJSON(url) {
  let response = await fetch(url);
  let json = await response.json();
  return json;
}
