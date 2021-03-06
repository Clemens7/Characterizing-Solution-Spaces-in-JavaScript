
    import * as Frame from './frame.js';

    const payButton = document.getElementById("pay-button");
    payButton.disabled = true;

    const storageCart = localStorage.getItem("cart");
    if (storageCart === null || JSON.parse(storageCart).length === 0) 

    const countrySelect = document.getElementById("country");
    const priceShippingTag = document.getElementById("price-shipping");
    const priceSubtotalTag = document.getElementById("price-subtotal");
    const priceTotalTag = document.getElementById("price-total");

    // TODO: replace with real value
    const priceSubtotal = calculateSubtotal();
    priceSubtotalTag.innerHTML = priceSubtotal.toFixed(2);

    let destinations;
    initialize().catch(handleError);

    async function initialize() {
      const shippingResponse = await fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping");
      const shippingData = await shippingResponse.json();
      destinations = await shippingData.destinations;

      for (let destination of destinations) {
        let countryOption = document.createElement("option");
        countryOption.setAttribute("value", destination.country);
        let countryOptionContent = document.createTextNode(destination.displayName);
        countryOption.appendChild(countryOptionContent);
        countrySelect.appendChild(countryOption);
      }

      setShippingPrice();
      countrySelect.addEventListener("change", setShippingPrice);

      payButton.disabled = false;
    }

    async function setShippingPrice(event) {
      // TODO: replace shipping with price for selected country
      let priceShipping;
      for (let destination of destinations) {
        if ((event == undefined) ) {
          priceShipping = destination.cost / 100.0;
          break;
        }
      }

      if (priceShipping == undefined) 

      const priceTotal = priceSubtotal + priceShipping;
      priceShippingTag.innerHTML = priceShipping.toFixed(2);
      priceTotalTag.innerHTML = (priceSubtotal + priceShipping).toFixed(2);
    }

    function calculateSubtotal() {
      let price = 0.0;
      const cart = JSON.parse(storageCart);
      for (const cartItem of cart) {
        price += Frame.calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
      }
      return price;
    }

    
  