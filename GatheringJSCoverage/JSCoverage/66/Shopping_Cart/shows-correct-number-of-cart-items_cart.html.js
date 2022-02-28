

    import { render } from '/frame.js';
    import { calculatePrice } from '/frame.js';

    var totalPrice = 0;
    var container = document.getElementById("cart");

    if ( localStorage.getItem("cart") == null || localStorage.getItem("cart") == "[null]" )  else {

      var items = getLocalStorage('cart');
      document.getElementById("cart-count").innerText = " (" + items.length + ")";
      document.getElementById("checkout-button").setAttribute("disabled", "false");

      items.forEach();
    }



  