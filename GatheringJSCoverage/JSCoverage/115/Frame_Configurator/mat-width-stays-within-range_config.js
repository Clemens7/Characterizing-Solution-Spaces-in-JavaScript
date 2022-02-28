import { loadObject, metAPI } from './metApi.js';
import { getNumberOfItems, addToCart } from './cartManagement.js';
import Artwork from './Artwork.js';
import {
  renderImg,
  renderLabel,
  renderPrintSizes,
  renderTotalSize,
  renderPrice
} from './configHelpers.js';
import {
  isValidFrameWidth,
  isValidMatWidth,
  correctFrameWidthValue,
  correctMatWidthValue
} from './configFromValidation.js';

const queryParams = new URL(location).searchParams;
const objectID = queryParams.get('objectID');
if (!objectID) 
const artwork = new Artwork(objectID, queryParams);

const form = document.getElementById('config-form');
const cartLink = document.getElementById('cart-link');

// =================== initialising form and cart link =========================
const initFormParams = () => {
  form['printSize'].value = artwork.printSize;
  form['frameStyle'].value = artwork.frameStyle;
  form['frameWidth'].value = artwork.frameWidth / 10;
  form['matColor'].value = artwork.matColor;
  form['matWidth'].value = artwork.matWidth / 10;
}
initFormParams();
cartLink.textContent = `Cart (${getNumberOfItems()})`;
// =============================================================================

loadObject(objectID, metAPI).then(object => {
  // If loadObject returns object with key message it was not successful
  if (object.message) 

  // ================ preview and config form HTML elements ====================
  const container = document.getElementById('preview-container');
  const img = document.getElementById('preview-image');
  img.src = object.primaryImageSmall;
  img.alt = object.objectName;

  const sizesContainer = document.getElementById('print-sizes');
  const sizeSLabel = document.getElementById('print-size-s-label');
  const sizeMLabel = document.getElementById('print-size-m-label');
  const sizeLLabel = document.getElementById('print-size-l-label');
  const frameWidthNumber = document.querySelector('input[name="frameWidth"]');
  const frameWidthSlider = document.querySelector('input[name="frameWidthR"]');
  const stylesContainer = document.querySelector('.frame-style-row');
  const matWidthNumber = document.querySelector('input[name="matWidth"]');
  const matWidthSlider = document.querySelector('input[name="matWidthR"]');
  const colorContainer = document.querySelector('.mat-color-row');
  const price = document.getElementById('price');
  const totalSize = document.getElementById('total-size');
  const addToCartButton = document.querySelector('.buy');
  // ===========================================================================

  // =================== initial rendering of the remaining site ===============
  renderLabel(object);
  renderPrice(artwork);
  img.addEventListener('load', () => {
    renderPrintSizes(img, sizeSLabel, sizeMLabel, sizeLLabel);
    renderImg(img, container, artwork);
    renderTotalSize(img, artwork, totalSize);
  });
  // ===========================================================================

  sizesContainer.addEventListener('change', );

  frameWidthNumber.addEventListener('change', );

  frameWidthSlider.addEventListener('change', );

  stylesContainer.addEventListener('change', );

  matWidthNumber.addEventListener('change', () => {
    if (!isValidMatWidth(matWidthNumber)) {
      matWidthNumber.value = correctMatWidthValue(matWidthNumber);
    }
    matWidthSlider.value = matWidthNumber.value;
    artwork.matWidth = matWidthNumber.value * 10;
    renderImg(img, container, artwork);
    renderPrice(artwork);
    renderTotalSize(img, artwork, totalSize);
  });

  matWidthSlider.addEventListener('change', );

  colorContainer.addEventListener('change', );

  addToCartButton.addEventListener('click', );
});







