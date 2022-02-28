import { addNumberToNav } from './cart.js';

document.addEventListener('DOMContentLoaded', function (event) {
  var urlParams = new URLSearchParams(window.location.search);
  document.getElementById('search').value = urlParams.get('q');
  if (document.getElementById('search').value) 
  searchImages();
  addNumberToNav();
});

function searchImages() {
  var searchString = document.getElementById('search').value;
  if (searchString)  else {
    var highlights = JSON.parse(
      '{ "highlights": [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105] }'
    );
    showImages(highlights, true);
  }
}

function showImages(foundObjects, highlights) {
  if (foundObjects) {
    var max = 100;
    if (!highlights )  else if (highlights) {
      max = foundObjects.highlights.length;
    }
    for (var i = 0; i < max; i++) {
      if (highlights) {
        if (!window.localStorage.getItem(foundObjects.highlights[i]))  else {
          showImage(
            JSON.parse(window.localStorage.getItem(foundObjects.highlights[i])),
            i
          );
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


