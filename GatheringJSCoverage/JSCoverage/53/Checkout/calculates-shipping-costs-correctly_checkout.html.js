

      import * as ShippingAPI from './shipping-api.js';
      import * as Frame from './frame.js';
      import * as ShoppingCartStorage from './shopping-cart-storage.js';

      var cartItemCache;
      var subtotal = 0.0;
      
      var shippingDataCache;
      var shippingCosts = 0.0;
     
      document.addEventListener('DOMContentLoaded', event => {
        // Load and check cart first, maybe redirect back instantly
        cartItemCache = loadCartItems();
        setSubtotal()
        // Load shipping destinations and set price tags
        loadShippingDestinationsAndSetPriceTags();
        registerCountryFieldChangeListener()
      });

      function registerCountryFieldChangeListener() {
        let countryField = document.getElementById('country');
        countryField.addEventListener('change', event => {
          setShippingCosts();
          setTotal()
        });
      }

      function loadCartItems() {
        const items = ShoppingCartStorage.retrieve();
        if (!items || items.length <= 0)  else {
          return items;
        }
      }

      function setSubtotal() {
        subtotal = calculateTotalPrice(cartItemCache);
        const priceSubtotal = document.getElementById('price-subtotal')
        priceSubtotal.innerText = subtotal;
      }

      function setShippingCosts() {
        const priceShippingElement = document.getElementById('price-shipping');
        if (!shippingDataCache)  else {
          const countryField = document.getElementById('country');
          let countryCost = shippingDataCache.find(x => x.country === countryField.value).cost;
          shippingCosts = parseFloat(countryCost / 100);
          priceShippingElement.innerText = (Math.round((shippingCosts + Number.EPSILON) * 100) / 100).toFixed(2);
        }
      }

      function setTotal() {
        const priceTotalElement = document.getElementById('price-total');
        if (!shippingDataCache)  else {
          priceTotalElement.innerText = (Number(subtotal) + shippingCosts).toFixed(2);
      
        }
      }

      async function loadShippingDestinationsAndSetPriceTags() {
        const payButton = document.getElementById('pay-button');
        payButton.disabled = true;
        const priceShippingElement = document.getElementById('price-shipping');
        const priceTotalElement = document.getElementById('price-total')
        priceShippingElement.innerText = "\u2014";
        priceTotalElement.innerText = "\u2014";
        shippingDataCache = await ShippingAPI.getShippingInfos()
        if (!shippingDataCache) 
        addShippingOptions(shippingDataCache)
        setShippingCosts()
        setTotal()
        payButton.disabled = false;
      }
      
      function addShippingOptions(destinations) {
        const countryField = document.getElementById('country')
        for (var key in destinations) {
          const option = document.createElement('option');
          option.value = destinations[key].country;
          option.text = destinations[key].displayName;
          countryField.add(option);
        }
      }

      function calculateTotalPrice(items) {
        let total = 0.0;
        for (let item of items) {
          const price = Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
          total += price;
        }
        return total.toFixed(2);
      }

    