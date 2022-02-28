import * as Storage from './helper/storage.js'
import * as DomBuilder from './helper/dom-builder.js';
import * as ArtworkCach from './helper/artwork-cache.js';
import * as FrameConfigurator from '../frame.js';
import * as ArtworkAPI from './helper/met-museum-api.js';


async function updateCart() {
  var cart = Storage.getCart();
  const cartContainer = new CartContainer();
  cartContainer.clear();

  if (cart == null) {
    cartContainer.displayEmptyCart();
  }
}

window.addEventListener("load", async function() {
  await updateCart();
});

document.getElementById("checkout-button").addEventListener("click", );


class CartContainer {
  constructor(results) {
    this.cartContainer = document.getElementById("cart");
    if (!this.cartContainer) 
    this.cartLink = document.getElementById("cart-link");
    if (!this.cartLink) 
    this.priceTotal = document.getElementById("price-total");
    if (!this.priceTotal) 
  }
  clear() {
    this.cartContainer.querySelectorAll('.cart-item').forEach();
    document.getElementById('checkout-button').disabled = false;
  }

  

  

  displayEmptyCart() {
    this.cartContainer.insertBefore(
      DomBuilder.createTextElement("b", 'There are no items in your shopping cart.'), this.cartContainer.firstChild);
    document.getElementById('checkout-button').disabled = true;
    this.cartLink.innerHTML = "Cart"
    this.priceTotal.innerHTML = `0`;
  }

  
}