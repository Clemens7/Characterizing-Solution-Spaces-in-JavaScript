
    import { ShoppingCartItem } from './shopping-cart.js';
    import { ShoppingCartDOM } from './shopping-cart-dom.js';
    import * as ShoppingCartStorage from './shopping-cart-storage.js';


    // TODO - (OPTIONAL-maybe produces timeouts in the tests?) prevent page to reload fully 
    // and retrieve items again from museum-api when removing cart item

    function loadShoppingCart() {
      const cart = document.getElementById('cart');
      const items = ShoppingCartStorage.retrieve();

      /*const items = [
        new ShoppingCartItem(193622, 'S', 'elegant', 5, 10, 'indigo'),
        new ShoppingCartItem(437261, 'M', 'natural', 2, 8, 'mint'),
        new ShoppingCartItem(83177, 'L', 'shabby', 1, 4, 'coal')
      ]*/

      const shoppingCart = new ShoppingCartDOM(items);
      shoppingCart.addItemsToContainer();
      shoppingCart.updateCartLink();
    }

    document.addEventListener('DOMContentLoaded', event => {
      loadShoppingCart();
    });
  