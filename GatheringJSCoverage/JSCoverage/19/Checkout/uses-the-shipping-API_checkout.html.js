
    import {calculatePrice} from "./frame.js";
    const shipping_url = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';

    getCountries();
    getSubtotal();

    async function getCountries() {
      const response = await fetch(shipping_url)
              .then(res => res.json())
              .then(data => {
                return data;
              })
              .catch();

      const arr = response.destinations;
      const countryList = document.getElementById('country');

      for (let i = 0; i < arr.length; i++) {
        let newCountry = document.createElement('option');
        newCountry.textContent = arr[i].displayName;
        newCountry.value = arr[i].country;
        countryList.appendChild(newCountry);
      }
      let shippingPrice = arr[0].cost;
      shippingPrice = (shippingPrice / 100).toFixed(2);
      document.getElementById('price-shipping').textContent = shippingPrice;
      document.getElementById('price-total').innerText = parseFloat(shippingPrice) + getSubtotal();


      setTimeout(function () {
        if(localStorage.cart === undefined || localStorage.cart === "[]") 
      }, 450);
    }


    


    function getSubtotal() {
      let subtotal = 0;
      if(localStorage["cart"] !== undefined) {
        const cartItems = JSON.parse(localStorage["cart"]);
        for (let i = 0; i < cartItems.length; i++) {
          subtotal = subtotal + calculatePrice(cartItems[i].printSize, cartItems[i].frameStyle, cartItems[i].frameWidth, cartItems[i].matWidth);
        }
      }
      document.getElementById('price-subtotal').innerText = subtotal.toFixed(2);
      console.log(subtotal);
      return subtotal;
    }


    


    document.getElementById('country').addEventListener('change', getShippingPrice, false);
    document.getElementById('country').addEventListener('change', getTotal, false);
  