const pictureElement = document.querySelector('.gallery');
const searchButton = document.querySelector('.search-button');
const searchItems = document.getElementById('search');
var count = 0;
let artworks = [];
const highlights = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];
const loc = window.location.href.split('?')[0];



const heading = document.getElementById('search-info');

if (window.location.href.split('?')[1]!=undefined)





const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', )

async function getHightlights(){
  for (const index of highlights){
    let oldKey = localStorage.getItem(index);
    if (!oldKey){
    const certainURL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + index;
    const certainResponse = await fetch(certainURL);
    const itemJSON = await certainResponse.json();

        let objSerialized = JSON.stringify(itemJSON);
        localStorage.setItem(index, objSerialized);

      const thumbElement = document.createElement('div');
      thumbElement.classList.add('thumb');

      const object0Element = document.createElement('a');
      object0Element.classList.add('object-0');
      object0Element.setAttribute('id','object-0');
      object0Element.setAttribute('href', 'config.html?objectID=' + index);
      thumbElement.appendChild(object0Element);

      const objectImage0Element = document.createElement('img');
      objectImage0Element.src = itemJSON.primaryImageSmall;
      objectImage0Element.classList.add('object-image-0');
      objectImage0Element.setAttribute('id','object-image-0');
      object0Element.appendChild(objectImage0Element);

      const museumLabelElement = document.createElement('div');
      museumLabelElement.classList.add('museum-label');
      object0Element.appendChild(museumLabelElement);

      const artistElement = document.createElement('span');
      artistElement.classList.add('artist');
      var artist = document.createTextNode(itemJSON.artistDisplayName);
      artistElement.appendChild(artist);
      museumLabelElement.appendChild(artistElement);

      const titleElement = document.createElement('span');
      titleElement.classList.add('title');
      var title = document.createTextNode(itemJSON.title + ", ");
      titleElement.appendChild(title);
      museumLabelElement.appendChild(titleElement);

      const dateElement = document.createElement('span');
      dateElement.classList.add('date');
      var date = document.createTextNode(itemJSON.objectDate);
      dateElement.appendChild(date);
      museumLabelElement.appendChild(dateElement);

      pictureElement.appendChild(thumbElement);
    }
  }}




document.addEventListener('DOMContentLoaded', event => {
  const params = (new URL (document.location)).searchParams;
  const pictureQuery = params.get('q');

  if (!pictureQuery){
    getHightlights();
    return;
  }});


