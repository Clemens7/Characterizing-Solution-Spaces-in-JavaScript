
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
        for (let i = 0; i < datas.length; i++) {
          console.log(datas[i]);
          if (datas.length - 1 === i) {
            await getIDandProcessForLast(datas[i], i);
          }
          else {
            await getIDandProcess(datas[i], i);
          }
          frameDescription(datas[i], i);
          calculateItemPrice(datas[i], i);
        }
        calculateSubTotal(datas);
        setRemoval();


      }

      async function getIDandProcess(data, id) {
        let objectIDData = await collectData(data.objectID);
        cartContainer.addCartToDocument(objectIDData, id, data);
        render(document.getElementById(`img${id}`), document.getElementById(`${id}`), data.printSize, data.frameStyle,
          data.frameWidth, data.matColor, data.matWidth);
      }

      async function getIDandProcessForLast(data, id) {
        let objectIDData = await collectData(data.objectID);
        cartContainer.addLastCartToDocument(objectIDData, id, data);
        render(document.getElementById(`img${id}`), document.getElementById(`${id}`), data.printSize, data.frameStyle,
          data.frameWidth, data.matColor, data.matWidth);
      }




      async function collectData(objectID) {
        let doesObjectExist = JSON.parse(localStorage.getItem(objectID));

        if(doesObjectExist) else {

        const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          localStorage.setItem(objectID, JSON.stringify(data));
          return data;
        }
      }}


      async function frameDescription(data, id) {
        if (data.matWidth == 0) 
        else {
          if (data.printSize == 'S') {
            document.getElementById(`frame-desc-${id}`).innerHTML = `Small print in a ${data.frameWidth / 10} cm 
  ${data.frameStyle} frame with a ${data.matWidth / 10} cm ${data.matColor} mat.`;
          }
          if (data.printSize == 'M') {
            document.getElementById(`frame-desc-${id}`).innerHTML = `Medium print in a ${data.frameWidth / 10} cm 
  ${data.frameStyle} frame with a ${data.matWidth / 10} cm ${data.matColor} mat.`;
          }
          if (data.printSize == 'L') 
        }
      }

      async function calculateItemPrice(data, id) {
        let itemprice = calculatePrice(data.printSize, data.frameStyle, data.frameWidth, data.matWidth);
        document.getElementById(`price-${id}`).innerHTML = `${itemprice}`;
      }


   
      async function calculateSubTotal(datas) {
        let subTotal = 0;
        for (let i = 0; i < datas.length; i++) {
          subTotal += parseFloat(calculatePrice(datas[i].printSize, datas[i].frameStyle, datas[i].frameWidth, datas[i].matWidth));
        }
        document.getElementById('price-total').innerHTML = `${subTotal.toFixed(2)}`;
      }

      async function setRemoval() {
        let buttons = document.getElementsByClassName("cart-remove");
        let datasForRemoval = retrieveFromStorage(['cart']);
        console.log(datasForRemoval);
        for (let i = 0; i < buttons.length; i++) {
          console.log(document.getElementById(`cart-remove-${i}`));
          document.getElementById(`cart-remove-${i}`).addEventListener("click", )
        }
      }

      countCartItems();

      console.log(document.getElementsByTagName("button"));
      document.getElementById("checkout-button").addEventListener("click", );
    