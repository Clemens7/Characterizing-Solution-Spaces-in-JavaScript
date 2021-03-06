

  import * as Frame from './frame.js';

  let shipping_detail;

  let cart_items = JSON.parse(localStorage.getItem("cart"));
  if( !cart_items ) 

  let btn_pay = document.getElementById("pay-button");
  btn_pay.disabled = true;

  getShippingCountries().then(s => {
    btn_pay.disabled = false;
    calculatePrice(cart_items, s);
    shipping_detail = s;
  }).catch();

  async function getShippingCountries() {
      let response = await fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping");
      let shipping_detail =	await response.json();
      let select = document.getElementById("country");
      for (let i of shipping_detail.destinations) {
        let option = document.createElement("option");
        option.text = i.displayName;
        option.value = i.country;
        select.add(option)
      }
      return shipping_detail;
  }

  function calculatePrice(cart_items, shipping_detail) {
    let select = document.getElementById("country");
    let country = select.options[select.selectedIndex].value;
    let result = shipping_detail.destinations.find(obj => {
      return obj.country === country
    });
    let shipping_price = result.cost;

    let subtotal = 0;
    for (let i of cart_items) {
      let x = 100*Frame.calculatePrice(i.printSize, i.frameStyle, i.frameWidth, i.matWidth);
      subtotal += x;
    }

    let total = shipping_price + subtotal;

    document.getElementById('price-subtotal').innerHTML = (subtotal/100).toFixed(2);
    document.getElementById('price-shipping').innerHTML = (shipping_price/100).toFixed(2);
    document.getElementById('price-total').innerHTML = (total/100).toFixed(2);
  }

  document.getElementById("country").addEventListener("change", _ => calculatePrice(cart_items, shipping_detail));

