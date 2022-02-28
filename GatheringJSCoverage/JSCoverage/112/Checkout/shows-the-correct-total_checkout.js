import * as Frame from './frame.js';
import * as ShoppingCart from './cart.js';


if (ShoppingCart.getAllProducts().length == 0) 

window.totalPrice = function (){

  let productPrice = 0;
  const cartitems = ShoppingCart.getAllProducts();

  for(let i = 0; i < cartitems.length; i++){
    let item = cartitems[i];
    productPrice += parseFloat(Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth));
  }

  const choosenCountry = document.getElementById('country');
  document.getElementById("price-subtotal").innerHTML = `${productPrice.toFixed(2)}`;

  if (choosenCountry.selectedIndex === -1) {
    document.getElementById('pay-button').disabled = true;
    document.getElementById("price-shipping").innerHTML = '&mdash;';
    document.getElementById("price-total").innerHTML = '&mdash;';
  } else {
    document.getElementById('pay-button').disabled = false;

    const shippingCosts = (parseInt(choosenCountry.options[choosenCountry.selectedIndex].getAttribute('data-cost')) / 100);
    document.getElementById("price-shipping").innerHTML = `${shippingCosts.toFixed(2)}`;

    const totalPrice =  shippingCosts + productPrice;
    document.getElementById("price-total").innerHTML = `${totalPrice.toFixed(2)}`;
  }
};

fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping')
  .then(DestinationData => DestinationData.json())
  .then(DestinationData => {
    const selectOptions = document.getElementById('country');

    for (const destination of DestinationData.destinations) {
      const countryOption = document.createElement('option');
      countryOption.setAttribute('data-cost', destination.cost);
      countryOption.innerHTML = destination.displayName;
      countryOption.value = destination.country;
      selectOptions.appendChild(countryOption);
    }

    window.totalPrice();
  });

window.totalPrice();
