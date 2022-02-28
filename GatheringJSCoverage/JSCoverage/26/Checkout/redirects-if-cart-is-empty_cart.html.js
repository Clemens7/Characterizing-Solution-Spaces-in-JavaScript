
      import * as frame from "./frame.js";
      import * as cart from "./cart.js";
      import { retrieveArtworkInformation } from "./artwork.js"

      document.querySelector('#checkout-button').onclick = 
      
      const parent = document.querySelector('.cart');
      let shoppingCart;



      if (cart.cartExistsAndNotEmpty())  else {
        cartIsEmpty();
      }

      function cartIsEmpty(){
        // If there are no items in the cart, show the message "There are no items in your shopping cart." and disable the checkout button.
        document.querySelector('#checkout-button').disabled = true;
        document.querySelector('.cart-empty').style.display = 'flex';
      }

      

      

      //Allow the user to remove items from the cart by clicking on the circled "x".
      

      

      //For each item in the cart, display a preview of the artwork in its configured frame. Use the helper functions in frame.js. The preview image should link to the corresponding frame configurator page.
      
    