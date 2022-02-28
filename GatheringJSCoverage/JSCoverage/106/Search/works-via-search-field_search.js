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
    if (!highlights && foundObjects.total && foundObjects.total < 100) {
      max = foundObjects.total;
    }
    for (var i = 0; i < max; i++) {
      if (highlights)  else {
        if (!window.localStorage.getItem(foundObjects.objectIDs[i])) {
          getJSON(
            'https://collectionapi.metmuseum.org/public/collection/v1/objects/' +
              foundObjects.objectIDs[i]
          ).then((data) => {
            showImage(data, i);
            window.localStorage.setItem(data.objectID, JSON.stringify(data));
          });
        }
      }
    }
  }
}

function showImage(foundObject, i) {
  var gallery = document.getElementById('gallery');
  if (foundObject) {
    var thumb = document.createElement('div');
    var thumbStyleClass = document.createAttribute('class');
    var href = document.createAttribute('href');
    var imgSrc = document.createAttribute('src');
    var imgAlt = document.createAttribute('alt');

    thumbStyleClass.value = 'thumb';
    thumb.setAttributeNode(thumbStyleClass);

    var link = document.createElement('a');
    href.value = './config.html?objectID=' + foundObject.objectID;
    var linkId = document.createAttribute('id');
    linkId.value = 'object-' + i;
    link.setAttributeNode(href);
    link.setAttributeNode(linkId);

    var img = document.createElement('img');
    var imgId = document.createAttribute('id');
    imgSrc.value = foundObject.primaryImageSmall;
    imgAlt.value = foundObject.title;
    imgId.value = 'object-image-' + i;
    img.setAttributeNode(imgSrc);
    img.setAttributeNode(imgAlt);
    img.setAttributeNode(imgId);

    var label = document.createElement('div');
    var labelStyleClass = document.createAttribute('class');
    labelStyleClass.value = 'museum-label';
    label.setAttributeNode(labelStyleClass);

    var artist = document.createElement('span');
    var artistStyleClass = document.createAttribute('class');
    artistStyleClass.value = 'artist';
    artist.setAttributeNode(artistStyleClass);
    artist.innerText = foundObject.artistDisplayName;

    var title = document.createElement('span');
    var titleStyleClass = document.createAttribute('class');
    titleStyleClass.value = 'title';
    title.setAttributeNode(titleStyleClass);
    title.innerText = foundObject.title;

    var date = document.createElement('span');
    var dateStyleClass = document.createAttribute('class');
    dateStyleClass.value = 'date';
    date.setAttributeNode(dateStyleClass);
    date.innerText = foundObject.objectDate;

    label.appendChild(artist);
    label.appendChild(title);
    label.appendChild(document.createTextNode(', '));
    label.appendChild(date);

    link.appendChild(img);
    link.appendChild(label);

    thumb.appendChild(link);

    gallery.appendChild(thumb);
  }
}

async function getJSON(url) {
  let response = await fetch(url);
  let json = await response.json();
  return json;
}
