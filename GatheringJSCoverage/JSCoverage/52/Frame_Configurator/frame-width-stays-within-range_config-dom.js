/**
 * @file Gets executed after page content is ready. Adds event listeners for inputs and performs DOM manipulation.
 */
import {FrameConfig} from "../models.js";
import {getPrintSizes, render, calculatePrice} from "../frame.js";

// Following event listeners are instead of change event on form element to fulfill tests
document.querySelectorAll('#config-form input').forEach(el => {
  el.addEventListener('change', formChanged);
});

const form = document.getElementById('config-form');
// Event Listeners for input type range and input type number
form.frameWidth.addEventListener('change', (e) => {
  const number = formatInputNumber(e.target.value, 2, 5);
  setFrameWidth(number);
});

form.frameWidthR.addEventListener('input', );

form.matWidth.addEventListener('change', );

form.matWidthR.addEventListener('input', );

// add to cart button pressed
form.addEventListener('submit', );

function formChanged() {
  renderImage();
  setPrice();
}

// Performs DOM manipulation
export function setObjectID(objectID) {
  form['object-id'].value = objectID;
}

export 

export 

export function setFrameWidth(frameWidth) {
  form.frameWidth.value = frameWidth;
  form.frameWidthR.value = frameWidth;
}

export 

export 

/**
 * @summary Sets label; loads image; sets print sizes
 * @param {Artwork} artwork The displayed artwork
 */
export async function initLabelImageSizes(artwork) {
  setLabel(artwork.artist, artwork.title, artwork.date);
  const img = document.getElementById('preview-image');
  img.src = artwork.img;
  await new Promise((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = ;
  });
  setPrintSizesText(getPrintSizes(img));
  formChanged();
}

function setPrintSizesText(sizes) {
  document.getElementById('print-size-s-label').innerHTML = `Small <br> ${sizes.S[0] / 10} × ${sizes.S[1] / 10} cm`;
  document.getElementById('print-size-m-label').innerHTML = `Medium <br> ${sizes.M[0] / 10} × ${sizes.M[1] / 10} cm`;
  document.getElementById('print-size-l-label').innerHTML = `Large <br> ${sizes.L[0] / 10} × ${sizes.L[1] / 10} cm`;

  const config = getFrameConfigFromDOM();
  const totalWidth = sizes[config.printSize][0] / 10 + config.frameWidth + config.matWidth;
  const totalHeight = sizes[config.printSize][1] / 10 + config.frameWidth + config.matWidth;

  document.getElementById('total-size').innerText = `${totalWidth.toFixed(1)} × ${totalHeight.toFixed(1)} cm`;
}

function getFrameConfigFromDOM() {
  const f = document.getElementById('config-form');
  return new FrameConfig(
    f["object-id"].value,
    f.printSize.value,
    f.frameStyle.value,
    Number.parseFloat(f.frameWidth.value),
    f.matColor.value,
    Number.parseFloat(f.matWidth.value)
  );
}

function setLabel(artistText, titleText, dateText) {
  const imageLabel = document.getElementById('image-label');
  const artist = document.createElement('span');
  const title = document.createElement('span');
  const date = document.createElement('span');
  artist.className = 'artist';
  title.className = 'title';
  date.classname = 'date';
  artist.innerText = artistText;
  title.innerText = titleText;
  date.innerText = `, ${dateText}`;
  imageLabel.appendChild(artist);
  imageLabel.appendChild(title);
  imageLabel.appendChild(date);
}

function renderImage() {
  const config = getFrameConfigFromDOM();
  render(
    document.getElementById('preview-image'),
    document.getElementById('preview-container'),
    config.printSize,
    config.frameStyle,
    config.frameWidth,
    config.matColor,
    config.matWidth
  );
}

function setPrice() {
  const config = getFrameConfigFromDOM();
  const price = calculatePrice(
    config.printSize,
    config.frameStyle,
    config.frameWidth,
    config.matWidth
  );
  document.getElementById('price').innerText = `€ ${price.toFixed(2)}`;
}

function formatInputNumber(inputNumber, min, max) {
  const num = Number.parseFloat(inputNumber);
  let number = Math.round((num + Number.EPSILON) * 10) / 10;

  if (number < min) {
    number = min;
  } else if (number > max) {
    number = max;
  }
  return number;
}
