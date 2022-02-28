import { render, calculatePrice } from "./frame.js";
class ArtworkFull {
  
}
window.onload = () => {
  let configs = JSON.parse(localStorage.getItem('cart'));
  base();
  // Is there a cart
  if (configs) 
};
/**
 * Loads a basic empty page
 **/
function base() {
  document.getElementById('cart').innerHTML = '<div id="empty-cart">There are no items in your shopping cart.</div>';
  document.getElementById('cart').appendChild(createTotalPrice(false));
  setHeader(0);
}
/**
 * load artwork information corresponding to objectID's, then appends cart items
 * @param configs {Artwork[]}
 */

/**
 * @param artwork {ArtworkFull}
 * @returns {HTMLDivElement}
 */

/**
 * @param artwork {ArtworkFull}
 * @param elem {HTMLDivElement}
 * @returns {HTMLDivElement}
 **/

/**
 * @param artwork {ArtworkFull}
 * @returns {HTMLDivElement}
 **/

/**
 * Removes an artwork from the cart
 * @param artwork {ArtworkFull} the artwork
 * @param elem {HTMLDivElement} the cart element
 **/

/**
 * Updates the total price displayed
 * @param number {number}
 **/

/**
 * @param active {boolean}
 * @returns {HTMLDivElement}
 */
function createTotalPrice(active) {
  let div = document.createElement('div');
  div.className = 'cart-total';
  div.innerHTML =
    `<div class="price">Total: € <span id="price-total">0.00</span></div>
             <button type="button" id="checkout-button" ${active  : 'disabled'} >Checkout</button>`;
  div.childNodes[2].addEventListener('click', );
  return div;
}
function setHeader(length) {
  document.getElementById('cart-link').innerText = `Cart ${length > 0  : ''}`;
}
/**
 * Creates artwork from met data and configurations.
 * @param data met data
 * @param config configurations
 * @param i identifying index
 */

