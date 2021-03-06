
    import {Country} from './country.js';
    import * as frameHelper from './frame.js';
    import * as Cache from './picture-storage.js';

    const cart = Cache.get('cart');
    if(!cart) 
    const countrySelector = document.getElementById('country');
    setPrice(); 

    setCountries();
    async function retrieveCounrties() {
      const response = await fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping');
      const rawData = await response.json();
      let destinations = rawData.destinations.map(
          country => new Country(country.country, country.displayName, parseFloat(country.cost))
      );
      return destinations;
    }

    const paybutton = document.getElementById('pay-button');
    async function setCountries() {
      const destinations = await retrieveCounrties();
      for(let country of destinations) {
        const op = document.createElement('option');
        op.innerText = country.displayName;
        op.value = country.cost;
        countrySelector.appendChild(op);
      }
      setPrice();
      paybutton.disabled = false;
    }

    function getSubtotalPrice() {
      let price = 0.0;
        for(let item of cart) {
          price += frameHelper.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        }
        return price;
    }


    function setPrice() {
      const subtotalPrice = getSubtotalPrice();
      const subtotalPriceLabel = document.getElementById('price-subtotal');
      subtotalPriceLabel.innerText = (Math.round(subtotalPrice * 100) / 100).toFixed(2);
      if(countrySelector.selectedIndex != -1) {
        const shippingPrice = (countrySelector.options[countrySelector.selectedIndex].value) / 100;
        const shippingPriceLabel = document.getElementById('price-shipping');
        const totalPriceLabel = document.getElementById('price-total');
        shippingPriceLabel.innerText = (Math.round(shippingPrice * 100) / 100).toFixed(2);
        totalPriceLabel.innerText = (Math.round((subtotalPrice + shippingPrice) * 100) / 100).toFixed(2);
      }
    }
    countrySelector.addEventListener('change', );
    
  