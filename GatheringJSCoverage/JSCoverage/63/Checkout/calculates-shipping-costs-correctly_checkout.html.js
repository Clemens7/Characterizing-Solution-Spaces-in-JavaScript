
    import {retrieve} from './checkout.js';
    import {DestinationDocumentContainer} from './destinationDOM.js';
    import {calculatePrice} from './frame.js';

    let destinations;
    let subtotal_price;

    async function destinationSearch() {
      destinations = await retrieve();
      if(!destinations) 
      const destinationContainer = new DestinationDocumentContainer();
      destinationContainer.clear();
      for(let destination of destinations) {
        destinationContainer.addDestinationToDocument(destination);
      }
    }

  async function loadSubtotal(){
    if(!localStorage.getItem('cart') || localStorage.getItem('cart')==='[]')
    else {
      let cart = JSON.parse(localStorage.getItem('cart'));
      let subtotal = document.getElementById('price-subtotal');
      subtotal_price = 0;
      for (const item of cart) {
        subtotal_price += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);

      }
      if(subtotal) {
        subtotal.innerText = subtotal_price;
      }
    }
  }

   country.addEventListener('change', countryElement => {
     let shippingPrice=document.getElementById("price-shipping");
     let cost;
     for(let destination of destinations){
       if(destination.country===countryElement.target.value){
         cost=destination.cost;
       }
     }
     shippingPrice.innerText=(cost/100).toFixed(2);

     let totalPrice=document.getElementById('price-total');
     let price_total=cost/100+subtotal_price;
     if(price_total) {
       totalPrice.innerText = price_total;
       disableCheckout(false);
     }
    });

  async function disableCheckout(disbled=true) {
    let paybutton=document.getElementById('pay-button');
    paybutton.disabled=disbled;
  }
    document.addEventListener('DOMContentLoaded', (event) => {
        disableCheckout(true);
        loadSubtotal();
        destinationSearch();
    });

  