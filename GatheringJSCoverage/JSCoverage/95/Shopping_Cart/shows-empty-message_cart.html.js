
    import * as Cart from './cart.js';
    import * as Frame from './frame.js';
    import * as API from './art-api.js';

    Cart.updateCartString();

    let cartElement = document.getElementById('cart');
    let cartItemElement = document.querySelector('.cart-item');
    let checkoutButton = document.getElementById('checkout-button');
    let totalElement = document.getElementById('price-total');

    if (Cart.getItems().length == 0) {
      cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerText = 'There are no items in your shopping cart.';
      cartElement.insertBefore(cartItemElement, cartElement.firstChild);
      checkoutButton.disabled = true;
    }

    (async () => {
      const items = Cart.getItems();
      console.log("Items:");
      console.log(items);
      let totalPrice = 0;
      for (let index = 0; index < items.length; index++) 
      document.getElementById("price-total").innerHTML = `${totalPrice.toFixed(2)}`;
    }) ();

    window.removeItem = 
  