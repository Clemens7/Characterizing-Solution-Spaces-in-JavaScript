
    import { readCartFromCache, readCartSizeFromCache } from './cache.js';
    import { calculatePrice } from './frame.js';
    import { Configuration } from './classes.js';


    let destinations;
    const shipping = document.getElementById('price-shipping');
    const subTotal =  document.getElementById('price-subtotal');
    const countryDropdown = document.getElementById('country');
    const priceTotal = document.getElementById('price-total');

    countryDropdown.addEventListener("change", updateShippingCost);

    getShippingDestinationData().then(data => { 
      destinations = data; 
      addCountriesToSelect(data); 
    }).catch();

    loadCart();

    async function loadCart() {
      const cartSize = await readCartSizeFromCache();
      if (cartSize === 0) 
      const cart = await readCartFromCache();
      calculateSubTotal(cart);
    }

    async function getShippingDestinationData() {
      const response = await fetch(`https://web-engineering.big.tuwien.ac.at/s20/a2/shipping`);
      const data = await response.json();
      return data;
    }

    function addCountriesToSelect(data) {
      const countries = data.destinations;
      for (let i in countries) {
        const option = new Option(countries[i].displayName);
        option.value = countries[i].country;
        countryDropdown.add(option);
      }
      shipping.innerText = (countries[0].cost / 100).toFixed(2);
      calculateTotal();
    }

    

    function calculateSubTotal(cart) {
      let sum = 0;
      for (let i in cart) {
        sum += calculatePrice(cart[i].printSize, cart[i].frameStyle, cart[i].frameWidth, cart[i].matWidth);
      }
      subTotal.innerText = sum.toFixed(2);
    }

    function calculateTotal() {
      const price = parseFloat(subTotal.innerText);
      const shippingPrice = parseFloat(shipping.innerText);
      priceTotal.innerText = (price + shippingPrice);
    }
    
  