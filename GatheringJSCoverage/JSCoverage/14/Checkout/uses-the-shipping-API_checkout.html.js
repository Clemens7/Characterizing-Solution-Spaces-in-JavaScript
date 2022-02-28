
    import * as frame from './frame.js';

    async function fetchShippingData() {
      let response = await fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping');
      let data = await response.json();
      if (!data || !data.destinations) 
      return data.destinations;
    }

    function setCountryOptions(shippingData) {
      let html = '';

      shippingData.map(async (country) => {
        html += '<option value="' + country.country + '">' + country.displayName + '</option>';
      });

      document.getElementById("country").innerHTML = html;

      calculatePrices(cartData, shippingData)
    }

    function displayPrices(subtotal, shippingCost) {
      document.getElementById('price-subtotal').innerText = subtotal.toFixed(2);

      if (!shippingCost)  else {
        document.getElementById('price-shipping').innerText = shippingCost.toFixed(2);
        document.getElementById('price-total').innerText = (subtotal + shippingCost).toFixed(2);
        document.getElementById('pay-button').disabled = false;
      }
    }

    function calculatePrices(cartData, shippingData) {
      let subtotal = 0.0;
      cartData.map(product => {
        let price = frame.calculatePrice(product.printSize, product.frameStyle, product.frameWidth, product.matWidth);
        subtotal += price;
      });

      const selectBox = document.getElementById("country");
      const selection = selectBox.options[selectBox.selectedIndex] ? selectBox.options[selectBox.selectedIndex].value ;
      if (selection === null) 

      const shippingCostSelection = shippingData.find(country => country.country == selection);
      let shippingCost = shippingCostSelection ? shippingCostSelection.cost / 100 ;
      return displayPrices(subtotal, shippingCost);
    }
    window.calculatePrices = calculatePrices;



    let cartData = getCartData();
    if (cartData.length == 0) 
    window.cartData = cartData;

    (async () => {
      let shippingData = await fetchShippingData();
      window.shippingData = shippingData;
      setCountryOptions(shippingData);
      calculatePrices(shippingData);
    })();

  