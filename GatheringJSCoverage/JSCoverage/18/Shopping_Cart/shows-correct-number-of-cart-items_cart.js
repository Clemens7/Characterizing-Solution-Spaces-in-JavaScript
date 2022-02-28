import { addPictureToDom, calcTotal, renderEmptyCart} from './cart-dom.js';
import { setCartItemsInHeader } from './header-cart.js';
import { PaintingithFrameConfig } from './picture.js';
import retrievePicture from './picture-cache.js';

let paintings;

/**
 * Gets the information for all artworks which are in the shopping cart
 * @returns {Array.<Painting>}
 */
async function retrieveArtworkInformation() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart'));
    // returns array of Painting objects, which contain all information
    let paintings = await getObjectsFromCart(cart);
    return paintings;
  }}

/**
 * Takes care of rendering all cart items properly
 * @param {Array.<Painting>} shoppingCartPaintings - The list of all paintings in the cart
 */
function renderCartItems(shoppingCartPaintings) {
  if (!shoppingCartPaintings || shoppingCartPaintings.length === 0) {
    renderEmptyCart();
  }

  calcTotal();
}

retrieveArtworkInformation().then((result) => {
  paintings = result;
  console.log({ paintings });
  renderCartItems(paintings);
});


document.addEventListener('DOMContentLoaded', () => {
  setCartItemsInHeader();
  document.getElementById('checkout-button').onclick = ;
});

export async function getObjectsFromCart(shoppingCart) {
  try {
    let listOfImages = [];

    for (let shoppingCartItem of shoppingCart) 

    return listOfImages;
  }}
