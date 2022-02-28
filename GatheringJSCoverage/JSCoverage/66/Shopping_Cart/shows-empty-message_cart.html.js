

    import { render } from '/frame.js';
    import { calculatePrice } from '/frame.js';

    var totalPrice = 0;
    var container = document.getElementById("cart");

    if ( localStorage.getItem("cart") == null  ) {

      document.getElementById("checkout-button").setAttribute("disabled", "true");
      var empty = document.createElement("h1");
      empty.innerText = "There are no items in your shopping cart.";
      document.getElementById("checkout-button").setAttribute("disabled", "true");
      container.appendChild(empty);

    }



  