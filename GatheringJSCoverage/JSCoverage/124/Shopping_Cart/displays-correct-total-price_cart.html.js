
    import * as Frame from './frame.js';
    import * as Cart from './cart.js';
    import * as ElementCreator from './element-creator.js';
    var priceTotal = 0;
    const cart = document.getElementById("cart");

    document.addEventListener('DOMContentLoaded', event => {

      var cartObj = localStorage.getItem('cart');
 
      /*retrieve items from localstorage*/
      var items = localStorage.getItem('cart');
      if (!items)  else {
        Cart.displayItems(JSON.parse(items));
        document.getElementById('cart-link').innerText = 'Cart ' + '(' + JSON.parse(cartObj).length + ')';

        
      }
    });




  