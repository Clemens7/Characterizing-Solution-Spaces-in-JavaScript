

      import { getPrintSizes, render, calculatePrice } from './frame.js';
      import { store, retrieveFromStorage } from './art-cache.js';

      document.getElementById("pay-button").disabled = true;


      document.addEventListener('DOMContentLoaded', event => {

        document.getElementById("pay-button").disabled = false;

        if (localStorage.getItem('cart') === null)  else {

          getDataFromApi();

          let datas = retrieveFromStorage(['cart']);
          calculateSubTotal(datas);
        }
      })

      async function getDataFromApi() {
        const url = `https://web-engineering.big.tuwien.ac.at/s20/a2/shipping`;
        try {
          const response = await fetch(url);
          console.log(response);
          const data = await response.json();
          console.log(data.destinations);
          for (let i = 0; i < data.destinations.length; i++) {
            var selectionOfCountries = document.getElementById('country');
            selectionOfCountries.innerHTML += `<option value = "${data.destinations[i].country}"> ${data.destinations[i].displayName} </option>`;

            if (i == 0) {
              document.getElementById('price-shipping').innerHTML = `${(parseFloat((data.destinations[i].cost) / 100).toFixed(2))}`;
              calculateTotal();
            }

            selectionOfCountries.addEventListener("change", 
            )
          }
        }
        
      }


      async function calculateSubTotal(datas) {
        let subTotal = 0;
        for (let i = 0; i < datas.length; i++) {
          subTotal += parseFloat(calculatePrice(datas[i].printSize, datas[i].frameStyle, datas[i].frameWidth, datas[i].matWidth));
        }
        document.getElementById('price-subtotal').innerHTML = `${subTotal.toFixed(2)}`;
      }


  

      async function calculateTotal() {

        var calculateSub = document.getElementById('price-subtotal');
        var calcSubText = calculateSub.textContent;
        console.log(calcSubText);
        var subCost = Number(calcSubText);
        console.log(subCost);

        var calculateShipping = document.getElementById('price-shipping');
        var calcShipText = calculateShipping.textContent;
        console.log(calcShipText);
        var shippingCost = Number(calcShipText);
        console.log(shippingCost);

        let total = parseFloat(subCost + shippingCost).toFixed(2);
        document.getElementById("price-total").innerHTML = `${total}`;
      }

    