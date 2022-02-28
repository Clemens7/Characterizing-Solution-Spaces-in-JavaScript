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
export 

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
