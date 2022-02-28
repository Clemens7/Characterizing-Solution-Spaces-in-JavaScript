
    import * as Cache from './cache.js'
    import * as Cart from './cart.js'
    import * as Frame from './frame.js'

    const ART_SHIP_API = 'https://web-engineering.big.tuwien.ac.at/s20/a2';

    document.addEventListener('DOMContentLoaded', event => {
      //Cart.resetCart(Cache.store);
      //Cart.loadTestCart(Cache.store);

      resetPrice();
      loadCountries();
      calculatePrice();
      return;
    });

    async function loadCountries() {
      document.getElementById("country").addEventListener("change", calculatePrice);
      const url = '/shipping';
      let response = await fetch(ART_SHIP_API+url);
      response = await response.json();
      appendCountryOptions('country', response.destinations);
      calculatePrice();
    }

    function appendCountryOptions(selector, jsonCountries) {
      console.log(jsonCountries);
      let htmlSelector = document.getElementById(selector);
      for (let element of jsonCountries) {
        const displayName = element.displayName;
        const cost = element.cost;
        const id = element.country;
        let child = createOption(cost, displayName, id);
        htmlSelector.appendChild(child);
      }
    }

    function createOption(cost, text, id=null) {
      const element = document.createElement('option');
      if (id) {
        element.id = id;
      }
      element.value = id;
      element.setAttribute("cost", cost);
      element.innerText = text;
      return element;
    }

    function calculatePrice() {
      var shipping = 0.0;
      var subtotal = 0.0;
      var total = 0.0;

      let countries = document.getElementById('country');
      console.log(countries.options);
      let selectedOption = countries.options[countries.selectedIndex];
      console.log(selectedOption);

      if (!selectedOption) {
        console.log("waiting for shipping info");
        shipping = -1.0
      } else {
        shipping = selectedOption.getAttribute("cost")/100;
      }

      const cart = Cache.retrieve('cart');
      if (!cart || cart.length === 0) 
      console.log(cart);

      cart.forEach(item => {
        let price = Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        if (price < 0.0) 
        console.log(`add to subtotal ${item.objectID}`)
        subtotal += price;
      });

      document.getElementById('price-subtotal').innerHTML = `${subtotal.toFixed(2)}`;

      if(shipping != -1.0) {
        total = subtotal + shipping;
        document.getElementById('price-shipping').innerHTML = `${shipping.toFixed(2)}`;
        document.getElementById('price-total').innerHTML = `${total.toFixed(2)}`;
        let paybutton = document.getElementById("pay-button");
        paybutton.disabled = false;
      }
    }

    function resetPrice() {
      document.getElementById('price-subtotal').innerHTML = `&mdash;`;
      document.getElementById('price-shipping').innerHTML = `&mdash;`;
      document.getElementById('price-total').innerHTML = `&mdash;`;
      console.log("price reset!");
      let paybutton = document.getElementById("pay-button");
      paybutton.disabled = true;
    }

  