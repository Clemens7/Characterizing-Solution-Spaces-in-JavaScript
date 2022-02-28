
    import * as CountriesAPI from './countries-api.js';
    import { Country } from './countries.js'
    import { calculatePrice } from "./frame.js"

    let countries;
    let subTotal;

    async function printCountries(subTotal) {

      countries = await CountriesAPI.retrieve();

      document.getElementById("pay-button").disabled = true;
      var selectCountry = document.getElementById("country");

      // create options for selecting

      for (let country1 of countries) {
        var option = document.createElement("option");
        option.text = country1.displayName;
        option.value = country1.country;
        selectCountry.add(option);

      }
      const countries1 = Array.from(document.getElementById('country').options).map(o => o.text);
      console.log(countries1);
      console.log(selectCountry);
    }
    // event listener for selecting different values
    const selectElement = document.querySelector('#country');
    selectElement.addEventListener('change', (event) => {
        const result = document.querySelector('#price-shipping');
        const resultTotal = document.querySelector('#price-total');
        // get country specific shipping costs
        const elem = selectElement.selectedIndex;

        var shippingCosts = countries[elem];
        shippingCosts = (shippingCosts.cost / 100);

        const printShippingCost = shippingCosts.toFixed(2);
        document.getElementById("pay-button").disabled = false;
        result.textContent = `${printShippingCost}`;
        resultTotal.textContent = `${(shippingCosts + subTotal).toFixed(2)}`;

      });

    function calculateSubtotal(cart) {
      let price = 0;
      for (let item of cart) {
        price += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth)
      }
      return price;
    }

    document.addEventListener('DOMContentLoaded', event => {

      let cart = JSON.parse(localStorage.getItem('cart'));

      if (cart === null || cart.length === 0)  else {
        const resultSubTotal = document.querySelector('#price-subtotal');
        subTotal = calculateSubtotal(cart);
        resultSubTotal.textContent = `${subTotal}`;
        printCountries(subTotal);
      }
    })
  