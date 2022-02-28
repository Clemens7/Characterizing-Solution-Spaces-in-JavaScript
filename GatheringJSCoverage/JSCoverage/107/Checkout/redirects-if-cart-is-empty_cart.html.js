
      import { artDocumentContainer, addStuffToHtml } from './html-document-container.js';
      import { getPrintSizes, render, calculatePrice } from './frame.js';
      import { countCartItems } from './display-cart-number.js';
      import { store, retrieveFromStorage } from './art-cache.js';

      let cartContainer = new artDocumentContainer('cart');

      document.addEventListener('DOMContentLoaded', event => {
        let datas = retrieveFromStorage(['cart']);
        let oj = JSON.stringify(datas);
        console.log(oj);
        if (!datas) {
          document.getElementById("priceT").innerHTML = `There are no items in your shopping cart.`;
          document.getElementById("checkout-button").disabled = true;

        }
      }
      )

      

      

      




      


      

      


   
      

      

      countCartItems();

      console.log(document.getElementsByTagName("button"));
      document.getElementById("checkout-button").addEventListener("click", );
    