
     import {calculatePrice} from "./frame.js";

     const cart = JSON.parse(localStorage.getItem('cart'));
     const BASE_URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';

     if(cart == null) else {

       getCountries();
       getSubtotal();
       document.getElementById("pay-button").disabled = true;
       document.getElementById("price-shipping").innerHTML = "\&mdash;";

       document.getElementById('country').onchange = ;

     }

    async function getCountries(){
      const response = await fetch(BASE_URL).catch();
       const rawData = await response.json();

      for (let i = 0; i < rawData['destinations'].length; i++) {
        const list = document.getElementById("country");
        const option = document.createElement("option");
        option.value = rawData['destinations'][i]['country'];
        option.text = rawData['destinations'][i]['displayName'];
        list.add(option);
      }
      await getShippingPrice(rawData['destinations'][0]['country']);}

    function getSubtotal(){
      let subtotal = cart.reduce((total, item) => total + calculatePrice(
        item.printSize,
        item.frameStyle,
        item.frameWidth,
        item.matWidth
      ), 0)
      document.getElementById("price-subtotal").innerHTML = subtotal.toFixed(2);
    }

    async function getShippingPrice(){
      const response = await fetch(BASE_URL).catch();}

  