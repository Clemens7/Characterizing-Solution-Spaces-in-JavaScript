import { fetchObjectFromAPI } from './cart.js';
import { calculatePrice, render, getPrintSizes } from './frame.js';
import { addNumberToNav, addToShoppingCart } from './cart.js';

document.addEventListener('DOMContentLoaded', initValues);

window.onload = async function () {
  await validatePageLoad();
  updatePrice();
  addNumberToNav();

  this.document
    .getElementsByName('printSize')[0]
    .addEventListener('change', );

  this.document
    .getElementsByName('printSize')[1]
    .addEventListener('change', );

  this.document
    .getElementsByName('printSize')[2]
    .addEventListener('change', );

  this.document
    .getElementsByName('frameStyle')[0]
    .addEventListener('change', );

  this.document
    .getElementsByName('frameStyle')[1]
    .addEventListener('change', );

  this.document
    .getElementsByName('frameStyle')[2]
    .addEventListener('change', );

  this.document
    .getElementsByName('frameStyle')[3]
    .addEventListener('change', );

  this.document
    .getElementsByName('frameWidth')[0]
    .addEventListener('change', );

  this.document
    .getElementsByName('frameWidthR')[0]
    .addEventListener('change', );

  this.document
    .getElementsByName('matWidthR')[0]
    .addEventListener('change', );

  this.document
    .getElementsByName('matWidth')[0]
    .addEventListener('change', function () {
      const value = Math.round(this.value * 10) / 10;
      if (value < 0) 
      else if (value > 10) 
      else document.getElementsByName('matWidth')[0].value = value;
      document.getElementsByName(
        'matWidthR'
      )[0].value = document.getElementsByName('matWidth')[0].value;
      updatePrice();
      renderImg();
    });

  this.document
    .getElementsByName('submitButton')[0]
    .addEventListener('click', );
};

async function validatePageLoad() {
  var urlParams = new URLSearchParams(window.location.search);
  const objectID = urlParams.get('objectID');

  if (!objectID) 

  const painting = await fetchObjectFromAPI(objectID);
  if (painting.message) 
  const imgElement = document.getElementById('preview-image');
  imgElement.src = painting.primaryImageSmall;
  const labelElement = document.getElementById('image-label');

  var artist = document.createElement('span');
  var artistStyleClass = document.createAttribute('class');
  artistStyleClass.value = 'artist';
  artist.setAttributeNode(artistStyleClass);
  artist.innerText = painting.artistDisplayName;

  var title = document.createElement('span');
  var titleStyleClass = document.createAttribute('class');
  titleStyleClass.value = 'title';
  title.setAttributeNode(titleStyleClass);
  title.innerText = painting.title;

  var date = document.createElement('span');
  var dateStyleClass = document.createAttribute('class');
  dateStyleClass.value = 'date';
  date.setAttributeNode(dateStyleClass);
  date.innerText = painting.objectDate;

  labelElement.appendChild(artist);
  labelElement.appendChild(title);
  labelElement.appendChild(document.createTextNode(', '));
  labelElement.appendChild(date);

  imgElement.onload = function () {
    const sizeS = document.getElementById('print-size-s-value');
    const sizeM = document.getElementById('print-size-m-value');
    const sizeL = document.getElementById('print-size-l-value');
    var sizes = getPrintSizes(imgElement);
    sizeS.innerText = `${sizes.S[0] / 10} x ${sizes.S[1] / 10}`;
    sizeM.innerText = `${sizes.M[0] / 10} x ${sizes.M[1] / 10}`;
    sizeL.innerText = `${sizes.L[0] / 10} x ${sizes.L[1] / 10}`;
    renderImg();
  };
}

function initValues() {
  var urlParams = new URLSearchParams(window.location.search);

  let printSize = urlParams.get('printSize');
  let frameStyle = urlParams.get('frameStyle');
  let frameWidth = urlParams.get('frameWidth');
  let matColor = urlParams.get('matColor');
  let matWidth = urlParams.get('matWidth');

  frameWidth = frameWidth / 10;
  matWidth = matWidth / 10;

  switch (printSize) {
    

    

    default:
      document.getElementById('print-size-m').checked = true;
      break;
  }

  switch (frameStyle) {
    

    

    

    default:
      document.getElementById('frame-style-natural').checked = true;
      break;
  }

  if (!frameWidth) frameWidth = 4;
  document.getElementsByName('frameWidth')[0].value = frameWidth;
  document.getElementsByName('frameWidthR')[0].value = frameWidth;

  switch (matColor) {
    

    

    

    

    default:
      document.getElementById('mat-color-mint').checked = true;
      break;
  }

  if (!matWidth) matWidth = 5.5;
  document.getElementsByName('matWidth')[0].value = matWidth;
  document.getElementsByName('matWidthR')[0].value = matWidth;
}

export function updatePrice() {
  let printSize = 'S';

  if (document.getElementsByName('printSize')[1].checked) printSize = 'M';
  if (document.getElementsByName('printSize')[2].checked) 

  let frameStyle = 'natural';

  if (document.getElementsByName('frameStyle')[0].checked)
    
  if (document.getElementsByName('frameStyle')[2].checked)
    
  if (document.getElementsByName('frameStyle')[3].checked)
    

  const frameWidth = document.getElementsByName('frameWidth')[0].value;
  const matWidth = document.getElementsByName('matWidth')[0].value;

  let price = calculatePrice(printSize, frameStyle, frameWidth, matWidth);
  document.getElementById('price').innerHTML = '€ ' + price.toFixed(2);
  renderImg();
}

function renderImg() {
  const imgElement = document.getElementById('preview-image');
  const containerElement = document.getElementById('preview-container');
  const printSize = document.getElementsByName('printSize')[0].value;
  const frameStyle = document.getElementsByName('frameStyle')[0].value;
  const frameWidth = document.getElementsByName('frameWidth')[0].value;
  const matColor = document.getElementsByName('matColor')[0].value;
  const matWidth = document.getElementsByName('matWidth')[0].value;
  render(
    imgElement,
    containerElement,
    printSize,
    frameStyle,
    frameWidth,
    matColor,
    matWidth
  );
}
