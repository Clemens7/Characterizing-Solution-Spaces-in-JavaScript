
  import { retrieveArtworkById } from './artworks.js';
  import { writeCartToCache, readCartFromCache } from './cache.js';
  import { createCartItem, updateCartLink } from './dom-helper.js';
  import { calculatePrice } from './frame.js';

  let isRendering = false;
  let dispatchedRenderDuringRender = false;

  function dispatchRenderCart() {
    // If this is called while it is already rendering, we record this in the "dispatchedRenderDuringRender" variable
    // which causes the function to render again after it is done.
    if (isRendering)  else {
      isRendering = true;
      renderCart().catch().finally(() => {
        isRendering = false;
        if (dispatchedRenderDuringRender) 
      });
    }
  }

  async function renderCart() {
    updateCartLink();
    const items = await Promise.all(readCartFromCache().map(async item => {
      const artwork = await retrieveArtworkById(item.objectID);
      return { item, artwork };
    }));
    console.log(items);

    // Remove all existing cart items:
    document.querySelectorAll('.cart-item').forEach();

    // Generate new cart items:
    let totalPrice = 0;
    const cart = document.getElementById('cart');
    for (let i = 0; i < items.length; i++) {
      const { item, artwork } = items[i];
      totalPrice += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
      cart.prepend(createCartItem({
        index: i,
        item,
        artwork,
        ,
      }));
    }

    // Update total price
    document.getElementById('price-total').innerText = totalPrice.toFixed(2);

    if (items.length === 0)  else {
      document.getElementById('cart-empty').hidden = true;
      document.getElementById('checkout-button').disabled = false;
    }
  }

  document.getElementById('checkout-button').addEventListener('click', );

  dispatchRenderCart();
