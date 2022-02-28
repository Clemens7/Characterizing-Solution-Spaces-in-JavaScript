

    import { calculatePrice } from "./frame.js";
    import * as LocalStorage from './cache.js';



    let subtotal = 0;
    let localStorageCart = null;
    let object = 0;

    async function retriveData() {
      const response = await fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping');
      console.log(response);
      const data = await response.json();
      object = data;
      return data;
    }

    retriveData().then(
      function createOptions() {
        let select = document.getElementById("country");
        for (let i = 0; i < object.destinations.length; i++) {
          let option = document.createElement('option');
          option.innerText = object.destinations[i].displayName;
          option.value = object.destinations[i].country;
          select.appendChild(option);
        }
        let shippingDefault = document.getElementById("price-shipping");
        let cost = (object.destinations[1].cost / 100) + 0.0000001;
        let c = cost.toFixed(2);
        shippingDefault.innerText = c;
        updateTotal(1);

        select.addEventListener('change',
          function addShipping() {
            let shipping = document.getElementById("price-shipping");
            let selectedOption = select.value;
            for (let i = 0; i < object.destinations.length; i++) {
              if (selectedOption == object.destinations[i].country) {
                let cost = (object.destinations[i].cost / 100) + 0.0000001;
                let c = cost.toFixed(2);
                shipping.innerText = c;
                updateTotal(i);
                break;
              }

            }
          })

        function updateTotal(i) {
          let total = document.getElementById("price-total");
          let cost = (object.destinations[i].cost / 100) + 0.0000001;
          let ship = cost.toFixed(2);
          ship = +ship + +subtotal;
          console.log(ship);
          total.innerText = ship;
        }
      }

    )

    document.addEventListener('DOMContentLoaded', event => {
      //get cartItems from Local Storage
      localStorageCart = LocalStorage.get('cart');
      console.log(localStorageCart);

      if (localStorageCart) {
        countTotalPrice();
      }
    });

    function countTotalPrice() {
      subtotal = 0;
      if (localStorageCart) {
        for (let cartItem of localStorageCart) {
          let price = parseFloat(calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth).toFixed(2));
          subtotal += price;
        }
        updateSubtotal(subtotal);
      }

    }

    function updateSubtotal(subtotal) {
      let total = document.getElementById("price-subtotal");
      total.innerText = subtotal;
    }  
  