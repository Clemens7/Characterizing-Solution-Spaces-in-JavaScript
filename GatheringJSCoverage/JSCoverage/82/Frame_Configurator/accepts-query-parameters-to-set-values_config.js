import { whenImageLoaded, arrayQuerySelector, navigate, redirect } from './configutils.js';
import { BoundForm } from './forms.js';
import { getPrintSizes, render, calculatePrice } from '../frame.js';
import {getStoredObject} from "./cache.js";
import {retrieveObject} from "./met.js";
import {cacheObject} from "./cache.js";
import {storeInCart} from "./cache.js";
import {getCartLength} from "./cache.js";

document.querySelector('#cart-link').innerHTML = ((getCartLength() === 0) ? "Cart" );
const search = new URLSearchParams(window.location.search);
const objectID = search.get('objectID');
if (!objectID) 
const keys = ['printSize', 'frameStyle', 'frameWidth', 'matColor', 'matWidth'];
const form = setupForm(document.querySelector('#config-form'), search);
updatePrice();
const object$ = getObject(+objectID);
object$.then(object => setupPreview(object), );
form.element.addEventListener('change', updatePreview);
form.element.addEventListener('change', updatePrice);
form.element.addEventListener('submit', addToCart);

function getObject(objectID) {
  let artwork = getStoredObject(objectID);
  if (artwork !== null)  else {
    return retrieveObject(objectID).then(object => {
      if (object.primaryImageSmall) {
        cacheObject(object);
        return object;
      }
    });
  }
}



function setupForm(element, initialValues) {
  const form = new BoundForm(element);
  for (const key of keys) {
    let value = initialValues.get(key);
    if (value !== null) {
      if (key.endsWith('Width')) {
        value /= 10;
      }
      form.setValue(key, value);
    }
  }
  return form;
}

function setupPreview(object) {
  const preview = document.querySelector('#preview-container');
  const [image, artist, title, date] = arrayQuerySelector(preview, 'img', '.artist', '.title', '.date');
  image.setAttribute('src', object.primaryImageSmall);
  image.setAttribute('alt', object.title);
  artist.innerText = object.artistDisplayName;
  title.innerText = object.title;
  date.innerText = object.objectDate;
  whenImageLoaded(image).then();
}









function updatePrice() {
  const output = document.querySelector('#price');
  const { printSize, frameStyle, frameWidth, matWidth } = form.getValue();
  const price = calculatePrice(printSize, frameStyle, frameWidth * 10, matWidth * 10).toFixed(2);
  output.innerText = `€ ${price}`;
}
