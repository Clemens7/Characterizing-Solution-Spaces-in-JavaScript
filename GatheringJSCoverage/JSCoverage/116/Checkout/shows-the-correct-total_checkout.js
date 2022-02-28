import { calculatePrice } from './frame.js';
const country = document.getElementById('country');
const price = document.getElementById('price-shipping');
const button = document.getElementById('pay-button');
const subCosts = document.getElementById('price-subtotal');
const totalCosts = document.getElementById('price-total');
const cart = JSON.parse(localStorage.getItem('cart'));
let countrymap = new Map();

window.addEventListener('load', loadCountries());
country.addEventListener('change', changeShippingCost);
country.addEventListener('costs', subtotal)

function loadCountries() {
  // Set up our HTTP request
  if (!cart)  else {
    const baseURL = 'https://web-engineering.big.tuwien.ac.at/s20/a2';
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', baseURL + '/shipping');
    xhr.send();
    button.disabled = true;

    // Setup our listener to process completed requests
    xhr.onload = function () {
      // Process our return data
      if (xhr.status >= 200 && xhr.status < 300) {
        // What do when the request is successful
        console.log('success!', xhr);
        const countries = xhr.response.destinations;
        for (let i = 0; i < countries.length; i++) {
          // POPULATE SELECT ELEMENT WITH JSON.
          country.innerHTML +=
            '<option value="' +
            countries[i]['country'] +
            '">' +
            countries[i]['displayName'] +
            '</option>';
          countrymap.set(countries[i]['country'], countries[i]['cost'])
        }

        price.innerHTML = (countrymap.get(country.value) / 100).toFixed(2);
        subtotal();
        button.disabled = false;
      }

      // Code that should run regardless of the request status
    };
  }

  const shippingCountries = ;
}

function changeShippingCost() {
  price.innerHTML = (countrymap.get(country.value) / 100).toFixed(2);
  console.log(countrymap);
  subtotal();
}

function subtotal() {
  let sum = 0;

  cart.map(item => sum = +sum + +calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth));
  console.log(sum);
  subCosts.innerHTML = sum
  total();
}

function total() {
  let total = 0;
  total += +price.innerHTML + +subCosts.innerHTML;
  totalCosts.innerHTML = parseFloat(total).toFixed(2);
}
