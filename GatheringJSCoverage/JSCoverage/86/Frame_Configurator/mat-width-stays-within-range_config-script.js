import { retrieveData } from './search-api.js';
import * as SearchCache from './search-cache.js' ;
import * as Frame from './frame.js';

const museumLabel = document.getElementById('image-label');

let slider = document.querySelectorAll('input[type=range]');
let numberBox = document.querySelectorAll('input[type=number]');
let sizeSelector = document.querySelectorAll('input[name=printSize]');
let frameSelector = document.querySelectorAll('input[name=frameStyle]');
let matSelector = document.querySelectorAll('input[name=matColor]');
let objectID = 39799;
let printSize = 'M';
let frameStyle = 'classic';
let frameWidth = 4.0;
let matColor = 'mint';
let matWidth = 5.5;

document.addEventListener('DOMContentLoaded', async () => {
  SearchCache.cartCache();

  const params = (new URL(document.location)).searchParams;
  if (params.get('objectID')) {
    objectID = params.get('objectID');
  }
  if (params.get('printSize')) 
  if (params.get('frameStyle')) 
  if (params.get('frameWidth')) 
  if (params.get('matColor')) 
  if (params.get('matWidth')) 

  sizeSelector.value = printSize;
  document.getElementById('print-size-s').checked = printSize === 'S';
  document.getElementById('print-size-m').checked = printSize === 'M';
  document.getElementById('print-size-l').checked = printSize === 'L';

  document.getElementById('frame-style-classic').checked = frameStyle === 'classic';
  document.getElementById('frame-style-natural').checked = frameStyle === 'natural';
  document.getElementById('frame-style-shabby').checked = frameStyle === 'shabby';
  document.getElementById('frame-style-elegant').checked = frameStyle === 'elegant';

  document.getElementById('mat-color-ivory').checked = matColor === 'ivory';
  document.getElementById('mat-color-mint').checked = matColor === 'mint';
  document.getElementById('mat-color-wine').checked = matColor === 'wine';
  document.getElementById('mat-color-indigo').checked = matColor === 'indigo';
  document.getElementById('mat-color-coal').checked = matColor === 'coal';

  slider[0].value = Math.min(Math.max(frameWidth, 2), 5);
  numberBox[0].value =  Math.min(Math.max(frameWidth, 2), 5);
  slider[1].value = Math.min(Math.max(matWidth, 0), 10);
  numberBox[1].value = Math.min(Math.max(matWidth, 0), 10);

  //fetch onjectdata by passing objectID into API endpoint
  const artwork = await retrieveData(objectID);
  //check if object exists or if object has image
  if (!artwork || !artwork['primaryImageSmall']) 
  domCreate(artwork);

  //return calculated printSize by passing html img-Object
  const previewImage = document.getElementById('preview-image');
  previewImage.addEventListener('load', () => {
    const printSizes = Frame.getPrintSizes(previewImage);
    document.getElementById('print-size-s-label').innerHTML = `Small<br>${printSizes['S'][0]/10} × ${printSizes['S'][1]/10} cm`;
    document.getElementById('print-size-m-label').innerHTML = `Medium<br>${printSizes['M'][0]/10} × ${printSizes['M'][1]/10} cm`;
    document.getElementById('print-size-l-label').innerHTML = `Large<br>${printSizes['L'][0]/10} × ${printSizes['L'][1]/10} cm`;
  });

  Frame.render(document.getElementById('preview-image'), document.getElementById('preview-container'), printSize, frameStyle, frameWidth, matColor, matWidth);
  setPrice();
});

for (let i=0; i<sizeSelector.length; i++) {
  sizeSelector[i].addEventListener('input', );
}

for (let i=0; i<frameSelector.length; i++) {
  frameSelector[i].addEventListener('input', );
}

for (let i=0; i<matSelector.length; i++) {
  matSelector[i].addEventListener('input', );
}

numberBox[0].addEventListener('input', );

numberBox[1].addEventListener('input', event => {
  slider[1].value = numberBox[1].value;
  constrainMatWidth(numberBox[1].value);
});

slider[0].addEventListener('input', );

slider[1].addEventListener('input', );



function constrainMatWidth(newMatWidth) {
  matWidth = Math.min(Math.max(newMatWidth, 0), 10);
}

addEventListener('input', event => {
  Frame.render(document.getElementById('preview-image'), document.getElementById('preview-container'), printSize, frameStyle, frameWidth, matColor, matWidth);
  setPrice();
});

function setPrice() {
  document.getElementById('price').innerHTML = `€ ${Frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2)}`;
  let {width, height} = Frame.calculateSize(printSize, frameWidth, matWidth);
  document.getElementById('total-size').innerHTML = `${width} × ${height} cm`;
}

//prevents input field to change page on submit ( enterkey )
const form = document.getElementById('config-form');
form.addEventListener('keypress', event => {
  event.key == 'Enter'  : true;
});

function domCreate(artwork){
  const imageContainer = document.getElementById('preview-container');
  const item = document.createElement('img');
  item.src = artwork['primaryImageSmall'];
  item.alt = artwork['title'];
  item.id = "preview-image";
  imageContainer.prepend(item);
  museumLabel.innerHTML =`<span class="artist">${artwork.artistDisplayName}</span>
  <span class="title">${artwork.title}</span>,
  <span class="date">${artwork.objectDate}</span>`;
}
