
      import {retrieveObject} from "./artwork-api.js";
      import {calculatePrice} from "./frame.js";
      import {DisplayCart} from "./artwork-dom.js";

      /* Refactor getting cart cache */
      if ('cart' in localStorage) 

      document.addEventListener('DOMContentLoaded', event => {
          let itemsInCart = localStorage["cart"];
          if (itemsInCart != null)  else {
              const displayCart = new DisplayCart();
              displayCart.clear();
              displayCart.addTotalPrice(true);
          }
      });

      

      

  