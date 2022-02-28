
    import * as Frame from './frame.js';

    let subtotal = 0;
    let total = 0;
    let destinations;

    // TODO: call function/handle function
    calculateSubtotal();

    async function calculateSubtotal() {
      const key = 'cart';
      if (key in localStorage) {
          console.log(`Retrieving ${key} from local storage`);
          if (localStorage[key] === "" || localStorage[key] === "[]")  else {
            let objects = JSON.parse(localStorage[key]);
            console.log(`Found ${objects.length} item(s) in shopping cart.`);
            // calculate the subtotal:
            objects.forEach(item => subtotal += Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth));

            // print the subtotal:
            document.querySelector('#price-subtotal').innerHTML = subtotal.toFixed(2);

            // get the available shipping countries and costs:
            const url = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
            try {
              const response = await fetch(url);
              const rawData = await response.json();
              destinations = await rawData.destinations;

              // add available countries to the select form:
              let countrySelect = document.getElementById("country");
              destinations.forEach(destination => {
                let option = document.createElement("option");
                option.text = destination.displayName;
                option.value = destination.country;
                countrySelect.add(option);
              });

              // Calculate the total sum in a separate function, because a change of the selected country does only result in a change 
              // of the shipping costs and total price and not of the subtotal sum.
              calculateTotal();

            } 

          }
      }
    }

    function calculateTotal() {
      // get the selected country:
      let countrySelect = document.getElementById("country");
      let countryCode = countrySelect.options[countrySelect.selectedIndex].value;

      // get the shipping price for the selected country:
      let selectedShippingPrice;
      destinations.forEach(destination => {
        if (destination.country === countryCode) {
          selectedShippingPrice = destination.cost;
        }
      });

      // print shipping costs for selected country:
      document.querySelector('#price-shipping').innerHTML = (selectedShippingPrice / 100).toFixed(2);

      // calculate and print total:
      total = (subtotal + (selectedShippingPrice / 100)).toFixed(2)
      document.querySelector('#price-total').innerHTML = total;
      document.getElementById("pay-button").disabled = false;
    }

    // add eventlistener to update shipping costs and total price on change of selected country:
    document.getElementById("country").addEventListener("change", calculateTotal);

  