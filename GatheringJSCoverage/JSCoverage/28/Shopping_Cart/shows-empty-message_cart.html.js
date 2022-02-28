

        let price = 0;

        import * as frame from "./frame.js";
        import * as cache from "./localStorageCahe.js";
        import {CartPicture} from "./localStorage.js";
        import {Picture} from "./localStorage.js";


        document.addEventListener('DOMContentLoaded', event => {
          if (cache.cartSize() === 0) {
            displayNoItemsMessage();
          }
        });

        

        

        window.remove = remove;
        

        

        

        function displayNoItemsMessage() {
          let message = document.getElementById("price");
          message.innerHTML = "There are no items in your shopping cart.";
          const button = document.getElementById("checkout-button");
          button.disabled = true;
        }

        document.getElementById("checkout-button").addEventListener("click", );

        


    