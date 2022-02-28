
    import * as ArtworkAPI from "./artwork-api.js";
    import { CartItemContainer } from "./artwork-dom.js";
    import * as Cart from "./cart.js";
    import { render, calculatePrice } from './frame.js'
    import {Artwork} from "./Artwork.js";

    let cartItemCount = 0;
    let sumPrice = 0;
    let sumPriceElement = document.querySelector('#price-total');
    let cartItems;
    let navCart = document.getElementById('cart-link')

    document.addEventListener('DOMContentLoaded', async event => {

      document.querySelector('#checkout-button').addEventListener('click', )

      cartItems = Cart.getAll();
      if(cartItems.length === 0) {
        let container = document.getElementById('cart');
        console.log(container);
        container.appendChild(document.createTextNode("There are no items in your shopping cart."));
        sumPriceElement.innerHTML = '0';
        document.getElementById('checkout-button').disabled = true;
      }
      cartItemCount = cartItems.length;
      navCart.innerText = 'Cart (' + cartItemCount + ')';
      await createCartItemsContainer(cartItems);
    });

    async function createCartItemsContainer(cartItems) {
      for (let cartItem of cartItems) 
    }

    

    


  