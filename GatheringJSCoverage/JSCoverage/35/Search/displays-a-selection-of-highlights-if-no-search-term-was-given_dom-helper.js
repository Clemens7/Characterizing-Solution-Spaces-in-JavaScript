import { readCartSizeFromCache } from './cache.js';
import { Artwork, Configuration } from './classes.js';
import { calculatePrice, render } from './frame.js';

/**
 * @returns {HTMLElement}
 */


const h = createHtmlNode;

/**
 * @param artwork {Artwork}
 */
export function createThumb(artwork) {
  const { objectID, primaryImageSmall, artistDisplayName, title, objectDate } = artwork;
  const thumb = document.createElement('div');
  thumb.setAttribute('class', 'thumb');

  const a = document.createElement('a');
  a.setAttribute('href', `config.html?objectID=${objectID}`);
  a.setAttribute('id', `object-${objectID}`);

  const img = document.createElement('img');
  img.setAttribute('src', primaryImageSmall);
  img.setAttribute('alt', title);
  img.setAttribute('id', `object-image-${objectID}`);

  const label = document.createElement('div');
  label.setAttribute('class', 'museum-label');

  const artistSpan = document.createElement('span');
  artistSpan.setAttribute('class', 'artist');
  artistSpan.innerText = artistDisplayName;

  const titleSpan = document.createElement('span');
  titleSpan.setAttribute('class', 'title');
  titleSpan.innerText = `${title},`;

  const dateSpan = document.createElement('span');
  dateSpan.setAttribute('class', 'date');
  dateSpan.innerText = " " + objectDate;

  label.appendChild(artistSpan);
  label.appendChild(titleSpan);
  label.appendChild(dateSpan);

  a.appendChild(img);
  a.appendChild(label);

  thumb.appendChild(a);

  return thumb;
}

const printSizeLabels = {
  'S': 'Small',
  'M': 'Medium',
  'L': 'Large',
};

/**
 * @param item {Configuration}
 */


/**
 * @param index {number}
 * @param item {Configuration}
 * @param artwork {Artwork}
 * @param onDelete {Function}
 */
export 

export function updateCartLink() {
  const element = document.getElementById('cart-link');
  if (element) {
    const numCartItems = readCartSizeFromCache();
    element.innerText = numCartItems > 0  : 'Cart';
  }
}
