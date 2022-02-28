
      import cartService from './services/cart_service.js';
      import * as Frame from './frame.js';

      // If there are no items in the shopping cart, the user should be redirected to the empty shopping cart page.
      if (cartService.isEmpty) 

      // Get the available countries and associated shipping costs using the Artmart Shipping API.
      fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping')
          .then(response => response.json())
          .then(data => {
              const select = document.getElementById('country');

              data.destinations.map(destination => {
                  const option = document.createElement('option');
                  option.value = destination.country;
                  option.innerText = destination.displayName;
                  option.setAttribute('data-price', destination.cost);
                  return option;
              }).forEach( option => {
                  select.appendChild(option);
              });
              calculateTotal();
          });

      function calculateTotal() {
          let priceSubtotal = 0;
          // Show the subtotal for all items in the shopping cart.
          cartService.cart.map(cartItem => {
              priceSubtotal += Frame.calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
          });
          document.getElementById("price-subtotal").innerText = `${priceSubtotal.toFixed(2)}`;

          // Calculate the total price including shipping costs for the selected country.
          // While the data is loading, or in case there was an error, the shipping costs and total price
          // should be replaced by an em-dash (i.e. € —) and the pay button should be disabled.
          const select = document.getElementById('country');
          /** Note: If no option is selected, the selectedIndex property will return -1. */
          if(select.selectedIndex !== -1) {
              const shipping = select.options[select.selectedIndex].getAttribute('data-price')/100;
              document.getElementById("price-shipping").innerText = `${shipping.toFixed(2)}`;
              document.getElementById("price-total").innerText = `${parseFloat(priceSubtotal + shipping).toFixed(2)}`;
          } else {
              document.getElementById("price-shipping").innerHTML = '&mdash;';
              document.getElementById("price-total").innerHTML = '&mdash;';
              document.getElementById('pay-button').disabled = true;
          }
      };

      // react to option-changes
      document.getElementById('country').addEventListener("change", calculateTotal);

      calculateTotal();
  