import { retrieveCart, fetchObject, showCartItems } from "./common.js";
import { calculatePrice, getPrintSizes, render } from './frame.js';

const queryParams = new URLSearchParams(window.location.search);

const container = document.getElementById('preview-container');
const preview = document.getElementById('preview-image');
const description = document.getElementById('image-label');

const objectID = queryParams.get('objectID');

const params = {
  printSize: document.querySelector(`input[name=printSize]:checked`).value,
  frameWidth: document.querySelector(`input[name=frameWidth]`).value*10,
  frameStyle: document.querySelector(`input[name=frameStyle]:checked`).value,
  matWidth: document.querySelector(`input[name=matWidth]`).value*10,
  matColor: document.querySelector(`input[name=matColor]:checked`).value,
}

const loadPicture = async (objectID) => {
    await fetchObject(objectID)
      .then((data) => {
        if (data.message !== undefined) 
        setPreview(data.primaryImageSmall);
        setDescription(data);
      }).catch();    
}

const setPreview = (link) => {
  preview.setAttribute('src', link);
  // for configurator only on this place possible
  renderPrintSize(getPrintSizes(preview));
  renderTotalSize(getSelectedPrintSize());
  renderTotalPrice(calculatePrice(params.printSize, params.frameStyle, params.frameWidth, params.matWidth));  

  preview.onload = () => {
    render(preview, container,  params.printSize, params.frameStyle, params.frameWidth, params.matColor, params.matWidth);
  }
}

const setDescription = (data) => {
  let span = description.querySelectorAll('span');
  span[0].textContent = data.artistDisplayName;
  span[1].textContent = data.title;
  span[2].textContent = data.objectDate;
}

const setPrintSize = (queryValue) => {
  let value = queryValue.toLowerCase();
  params.printSize = queryValue;
  document.getElementById(`print-size-${value}`).checked=true;
}
const setFrameWidth = (queryValue) => {
  let value = validateFrameWidth(queryValue);
  document.querySelector(`input[name=frameWidth]`).value = value;
  document.querySelector(`input[name=frameWidthR]`).value = value;
}
const setFrameStyle = (queryValue) => {
  params.frameStyle = queryValue;
  document.getElementById(`frame-style-${queryValue}`).checked=true;
}
const setMatWidth = (queryValue) => {
  let value = validateMatWidth(queryValue);
  document.querySelector(`input[name=matWidth]`).value = value;
  document.querySelector(`input[name=matWidthR]`).value = value;
}
const setMatColor = (queryValue) => {
  params.matColor = queryValue;
  document.getElementById(`mat-color-${queryValue}`).checked=true;
}

const updateQueryParams = () => {
  let queryPrintSize = queryParams.get('printSize');
  let queryFrameWidth = queryParams.get('frameWidth');
  let queryFrameStyle = queryParams.get('frameStyle');
  let queryMatWidth = queryParams.get('matWidth');
  let queryMatColor = queryParams.get('matColor');
  if(queryPrintSize !== null) {
    setPrintSize(queryPrintSize);
  }
  if(queryFrameWidth !== null) {
    setFrameWidth(queryFrameWidth);
  }
  if(queryFrameStyle !== null) {
    setFrameStyle(queryFrameStyle);
  }
  if(queryMatWidth !== null) {
    setMatWidth(queryMatWidth);
  }
  if(queryMatColor !== null) {
    setMatColor(queryMatColor);
  }
}

window.updateRange = 

window.updateNumber = 

function validateFrameWidth(queryValue) {
  if(queryValue >= 50)  else if(queryValue <= 20)  else {
    params.frameWidth = Math.round(queryValue);
    return Math.round(params.frameWidth)/10;
  }
}

function validateMatWidth(queryValue) {
  if(queryValue >= 100)  else if(queryValue <= 0)  else {
    params.matWidth = Math.round(queryValue);
    return Math.round(params.matWidth)/10;
  }
}

function renderPrintSize(printSizes) {
  let small = document.getElementById('print-size-s-label');
  small.innerHTML = `Small<br>${printSizes.S[0]/10} x ${printSizes.S[1]/10} cm`;
  let medium = document.getElementById('print-size-m-label');
  medium.innerHTML = `Medium<br>${printSizes.M[0]/10} x ${printSizes.M[1]/10} cm`;
  let large = document.getElementById('print-size-l-label');
  large.innerHTML = `Large<br>${printSizes.L[0]/10} x ${printSizes.L[1]/10} cm`;
}

function renderTotalSize(printSize) {
  let size = document.getElementById('total-size');
  let totalW = Number(printSize[0])*10+params.frameWidth+params.matWidth;
  let totalH = Number(printSize[1])*10+(params.frameWidth)+(params.matWidth);
  size.innerHTML = `${totalW/10} x ${totalH/10} cm`;
}

function getSelectedPrintSize() {
  let id = document.querySelector(`input[name=printSize]:checked`).id;
  let label = document.getElementById(`${id}-label`);
  let numbers = label.textContent.replace(/^\D+|\D.-/g, "");
  let result = numbers.match(/\d+/g);
  if(result.length === 4)  else if(result.length === 3)  else {
    return ([`${result[0]}`, `${result[1]}`]);
  }
}

function renderTotalPrice(totalPrice) {
  let price = document.getElementById('price');
  price.innerHTML = `€ ${(totalPrice/100).toFixed(2)}`;
}

if (objectID === null || objectID === '') 
updateQueryParams();
showCartItems();
loadPicture(objectID);

var fieldsets = document.querySelectorAll('fieldset');
var last = fieldsets[fieldsets.length-1];
fieldsets.forEach(fieldset => {
  if(fieldset !== last) {
    fieldset.addEventListener('change', )
  }
})

let form = document.getElementById('config-form');
document.addEventListener('submit', );
form.addEventListener('submit', );

