
      import {retrieveObject} from "./artwork-api.js";
      import {calculatePrice} from "./frame.js";
      import {DisplayCart} from "./artwork-dom.js";

      /* Refactor getting cart cache */
      if ('cart' in localStorage) {
          const amountOfElementsInCart = JSON.parse(localStorage['cart']).length;
          if ( amountOfElementsInCart !== 0) {
              const cartElement = document.getElementById('cart-link');
              cartElement.innerText = `Cart (${amountOfElementsInCart})`;
          }
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

          for (let i = itemsInCart.length - 1; i >= 0; i--) {
              const artwork = await retrieveObject(itemsInCart[i].objectID);
              const price = calculatePrice(itemsInCart[i].printSize, itemsInCart[i].frameStyle, itemsInCart[i].frameWidth, itemsInCart[i].matWidth);
              const desciption = `${(itemsInCart[i].printSize == "S") ? "Small" : (itemsInCart[i].printSize == "M") ? "Medium" : "Large"} print in a ${parseFloat(itemsInCart[i].frameWidth/10)} cm ${itemsInCart[i].frameStyle} ${(itemsInCart[i].matWidth == 0)  : `frame with a ${parseFloat(itemsInCart[i].matWidth/10)} cm ${itemsInCart[i].matColor} mat.`}`;
              displayCart.addArtwork(artwork, price, desciption, itemsInCart[i], count);
              count++;
          }

          await displayCart.addTotalPrice();
          await displayTotalPrice(itemsInCart);
      }

      async function displayTotalPrice(itemsInCart) {
          let totalPrice = 0.0;
          for (let i = 0; i < itemsInCart.length; i++) {
            totalPrice = totalPrice + parseFloat(calculatePrice(itemsInCart[i].printSize, itemsInCart[i].frameStyle, itemsInCart[i].frameWidth, itemsInCart[i].matWidth));
          }
          document.getElementById('price-total').innerText = totalPrice.toFixed(2);
      }

  