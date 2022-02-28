
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
      if(cartItems.length === 0) 
      cartItemCount = cartItems.length;
      navCart.innerText = 'Cart (' + cartItemCount + ')';
      await createCartItemsContainer(cartItems);
    });

    async function createCartItemsContainer(cartItems) {
      for (let cartItem of cartItems) {
        await fetchArtworkInformation(cartItem);
        showCartItem(cartItem);
        sumPrice += calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
        sumPriceElement.innerHTML = '' + Math.round((sumPrice + Number.EPSILON) * 100) / 100;
        const shoppingCartDelete = document.querySelector('.cart-remove');
        shoppingCartDelete.addEventListener('click', )
      }
    }

    async function fetchArtworkInformation(cartItem) {
      let objectID = cartItem.objectID;
      const rawData = await ArtworkAPI.getObjectCached(objectID);
      const cartItemContainer = new CartItemContainer();
      cartItemContainer.addItemToCart(rawData, cartItem, cartItems.indexOf(cartItem));
    }

    function showCartItem(cartItem) {
      const img = document.querySelector('#preview-0');
      const container = document.querySelector('#preview-container-0');
    }


  