
    import * as CartCache from '/cart-cache.js';
    import * as ArtworkCache from '/artwork-cache.js';
    import * as SearchAPI from '/search-api.js';
    import * as Frame from '/frame.js';


    const selectCountry = document.getElementById('country');
    const cartCache = CartCache.retrieve();
    let price = 0;
    
    

    
    selectCountry.addEventListener('change', );

    document.addEventListener('DOMContentLoaded', event => {


      const cart = document.getElementById('cart-link');
      if(!cartCache)

      
      for(let i = 0; i < cartCache.length; i++){
        let tempPrice = parseFloat(Frame.calculatePrice2(cartCache[i].printSize, cartCache[i].frameStyle, cartCache[i].frameWidth, cartCache[i].matWidth));
        price += tempPrice;
      } 
      const subTotal = document.getElementById('price-subtotal');
      subTotal.innerHTML = price;
      addRadioButtons();
      updateShipping("AT");
    });

    const countries = document.getElementById('country');

    /*
     async function to retrieve destinations from shipping API
    */
    async function retrieveDestinations(){
      const objURL = `https://web-engineering.big.tuwien.ac.at/s20/a2/shipping`;
      const objResponse = await fetch(objURL);
      const objRawData = await objResponse.json();
      return objRawData.destinations;
    }

    async function addRadioButtons(){
      const destinations = await retrieveDestinations();
      const select = document.getElementById('country');
      for(let i = 0; i < destinations.length; i++){
        const radioButton = document.createElement('option');
        radioButton.value = destinations[i].country;
        radioButton.innerHTML = destinations[i].displayName;
        select.appendChild(radioButton);
      }
    }

    async function updateShipping(country){
      const shippingCost = await getShippingCosts(country);
      const element = document.getElementById('price-shipping');
      element.innerHTML = shippingCost;
      return shippingCost;
    }


    async function getShippingCosts(country){
      const destinations = await retrieveDestinations();
      for(let i = 0; i < destinations.length; i++){
        if(destinations[i].country == country)
      }

      const button = document.getElementById('pay-button');
      button.disabled = true;
      return;
    }
  