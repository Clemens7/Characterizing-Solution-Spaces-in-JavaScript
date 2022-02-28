import {calculatePrice, getPrintSizes, render} from "./frame.js";
import {object as fetchObject} from "./api.js";
import {cartElements} from "./cart-display.js";
import {add, CObject} from "./cart.js";

cartElements();

/**
 * @return {Map<string, string>}
 */
function getQueryParams() {
  return location.search
    .substring(1)
    .split('&')
    .map(it => it.split('='))
    .reduce((map, [key, value]) => map.set(key, value), new Map())
}

function printSizeToString([width, height]) {
  return `${Math.round(width) / 10} × ${Math.round(height) / 10} cm`;
}



function linkInputs(i1, i2) {
  i1.addEventListener('change', );
  i2.addEventListener('change', );
}

/**
 * @param input: HTMLInputElement
 * @param min: number
 * @param max: number
 * @param precision: number
 */
function inputMinMax(input, min, max, precision = 1) {
  input.addEventListener('change', );
}

function getRadioValue(name) {
  return document.querySelector(`input[type="radio"][name="${name}"]:checked`).value;
}

function pround(value, precision = 0) {
  const p = Math.pow(10, precision);
  return Math.round(value * p) / p;
}

function getCartItem() {
  return new CObject(
    objectId,
    getRadioValue('printSize'),
    getRadioValue('frameStyle'),
    document.getElementById('frame-width-input').value * 10,
    getRadioValue('matColor'),
    document.getElementById('mat-width-input').value * 10
  );
}

function updatePreview() {
  const img = document.getElementById('preview-image'),
    container = document.getElementById('preview-container'),
    cartItem = getCartItem(),
    printSizes = getPrintSizes(img)[cartItem.printSize],
    price = calculatePrice(
      cartItem.printSize,
      cartItem.frameStyle,
      cartItem.frameWidth,
      cartItem.matWidth
    ).toFixed(2),
    totalWidth = pround(printSizes[0] / 10 + 0.2 * (cartItem.frameWidth + cartItem.matWidth), 1),
    totalHeight = pround(printSizes[1] / 10 + 0.2 * (cartItem.frameWidth + cartItem.matWidth), 1);

  render(
    img,
    container,
    cartItem.printSize,
    cartItem.frameStyle,
    cartItem.frameWidth,
    cartItem.matColor,
    cartItem.matWidth
  );

  document.getElementById('price').innerText = `€ ${price}`;
  document.getElementById('total-size').innerText = `${totalWidth} × ${totalHeight} cm`;
}

const queryParams = getQueryParams();
const objectId = queryParams.get('objectID') ;

linkInputs(
  document.getElementById('frame-width-input-r'),
  document.getElementById('frame-width-input')
);
linkInputs(
  document.getElementById('mat-width-input-r'),
  document.getElementById('mat-width-input')
);

inputMinMax(document.getElementById('frame-width-input'), 2, 5);
inputMinMax(document.getElementById('mat-width-input'), 0, 10);

document.querySelectorAll('input')
  .forEach(el => el.addEventListener('change', ));

if (queryParams.has('printSize'))
  document.getElementById('print-size-' + queryParams.get('printSize').toLowerCase()).checked = true;
if (queryParams.has('frameStyle'))
  document.getElementById('frame-style-' + queryParams.get('frameStyle').toLowerCase()).checked = true;
if (queryParams.has('frameWidth'))
  ['frame-width-input', 'frame-width-input-r']
    .forEach(it => document.getElementById(it).value = queryParams.get('frameWidth') / 10);
if (queryParams.has('matColor'))
  document.getElementById('mat-color-' + queryParams.get('matColor').toLowerCase()).checked = true;
if (queryParams.has('matWidth'))
  ['mat-width-input', 'mat-width-input-r']
    .forEach(it => document.getElementById(it).value = queryParams.get('matWidth') / 10);

document.getElementById('config-form').addEventListener('submit', );

function getObject(id) {
  const cached = localStorage.getItem(id);
  if (cached) 
  else return fetchObject(objectId).then(response => {
    if (response.ok) return response.json();) 
  });
}

getObject(objectId).then(object => {
  console.log(object);
  if (!localStorage.getItem(object.objectID)) {
    localStorage.setItem(object.objectID, JSON.stringify(object));
  }

  const img = document.getElementById('preview-image');
  img.src = object.primaryImageSmall;
  img.onload = () => {
    const printSizes = getPrintSizes(img);
    document.getElementById('print-size-s-label').innerHTML = 'Small<br>' + printSizeToString(printSizes.S);
    document.getElementById('print-size-m-label').innerHTML = 'Medium<br>' + printSizeToString(printSizes.M);
    document.getElementById('print-size-l-label').innerHTML = 'Large<br>' + printSizeToString(printSizes.L);
    updatePreview();
  };

  const artistNode = document.createElement("b"),
    descriptionNode = document.createElement("i");
  artistNode.innerText = object.artistDisplayName;
  descriptionNode.innerText = object.title;
  document.getElementById('image-label').append(
    artistNode,
    document.createElement('br'),
    descriptionNode,
    document.createTextNode(`, ${object.objectDate}`)
  );
});
