
    import * as cache from './localStorageCahe.js';
    import * as pictures from './localStorage.js';
    import * as frame from "./frame.js";

    var rawData;

    document.addEventListener('DOMContentLoaded', async function() {
      let url = "https://web-engineering.big.tuwien.ac.at/s20/a2/shipping";
      const response = await fetch(url);
      rawData = await response.json();
      var countries = document.getElementById("country");
      for(let country of rawData.destinations)
          countries.innerHTML += `<option value="${country.country}">${country.displayName}</option>`;
      for(let country of rawData.destinations)
        if(document.getElementById("country").value == country.country)
      var price = (country.cost/100).toFixed(2);
      document.getElementById("price-shipping").innerHTML = `${price}`;
      //sum is sometimes wrong in config cuz of wrong float adding mechanism(use parseFloat)
      price = parseFloat(price) + parseFloat(calculatePrice());
      price.toFixed(2);
      document.getElementById("price-total").innerHTML = price;
    });

    function calculatePrice() {
      let subtotal = 0;
      let elems = cache.retrieve("cart");
      for (let elem of elems) {
          subtotal = subtotal + frame.calculatePrice(elem.printSize, elem.frameStyle, elem.frameWidth, elem.matWidth);
          
      }
      console.log(subtotal);

      document.getElementById("price-subtotal").innerHTML = subtotal.toFixed(2);
      return subtotal.toFixed(2);
    }



    document.getElementById("country").addEventListener('change', function() {
      var price;
      for(let country of rawData.destinations)
        if(document.getElementById("country").value == country.country)
      price = (country.cost/100).toFixed(2);
      document.getElementById("price-shipping").innerHTML = `${price}`;
      let totalPrice = parseFloat(price) + parseFloat(calculatePrice());
      totalPrice.toFixed(2);
      document.getElementById("price-total").innerHTML = `${parseFloat(totalPrice)}`;
    });

    document.addEventListener('DOMContentLoaded', event => {
          if (cache.cartSize() === 0)  
    });


  