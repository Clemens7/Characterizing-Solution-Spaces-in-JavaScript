
      import {retrieveObject} from "./artwork-api.js";
      import {calculatePrice} from "./frame.js";
      import {DisplayCart} from "./artwork-dom.js";

      /* Refactor getting cart cache */
      if ('cart' in localStorage) {
          const amountOfElementsInCart = JSON.parse(localStorage['cart']).length;
          if ( amountOfElementsInCart !== 0) 
      }

      document.addEventListener('DOMContentLoaded', event => {
          let itemsInCart = localStorage["cart"];
          if (itemsInCart != null) {
              itemsInCart = JSON.parse(itemsInCart);
              console.log(itemsInCart);
              displayCartItems(itemsInCart);
          }
      });

      async function displayCartItems(itemsInCart) {
          const displayCart = new DisplayCart();
          displayCart.clear();

          let count = 1;

          for (let i = itemsInCart.length - 1; i >= 0; i--) 

          await displayCart.addTotalPrice();
          await displayTotalPrice(itemsInCart);
      }

      async function displayTotalPrice(itemsInCart) {
          let totalPrice = 0.0;
          for (let i = 0; i < itemsInCart.length; i++) 
          document.getElementById('price-total').innerText = totalPrice.toFixed(2);
      }

  