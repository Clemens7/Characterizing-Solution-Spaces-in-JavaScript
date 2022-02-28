
      import { artDocumentContainer, addStuffToHtml } from './html-document-container.js';
      import { getPrintSizes, render, calculatePrice } from './frame.js';
      import { countCartItems } from './display-cart-number.js';
      import { store, retrieveFromStorage } from './art-cache.js';

      let cartContainer = new artDocumentContainer('cart');

      document.addEventListener('DOMContentLoaded', event => {
        let datas = retrieveFromStorage(['cart']);
        let oj = JSON.stringify(datas);
        console.log(oj);
        if (!datas) 
        else {
          cartContainer.clear();
          getData(datas);
        }
      }
      )

      async function getData(datas) {
        for (let i = 0; i < datas.length; i++) 
        calculateSubTotal(datas);
        setRemoval();


      }

      

      




      


      

      


   
      async function calculateSubTotal(datas) {
        let subTotal = 0;
        for (let i = 0; i < datas.length; i++) 
        document.getElementById('price-total').innerHTML = `${subTotal.toFixed(2)}`;
      }

      async function setRemoval() {
        let buttons = document.getElementsByClassName("cart-remove");
        let datasForRemoval = retrieveFromStorage(['cart']);
        console.log(datasForRemoval);
        for (let i = 0; i < buttons.length; i++) }

      countCartItems();

      console.log(document.getElementsByTagName("button"));
      document.getElementById("checkout-button").addEventListener("click", );
    