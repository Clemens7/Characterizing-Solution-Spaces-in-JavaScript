
    import { render, calculatePrice } from './frame.js'

    class Shipping {
      constructor(country, displayName, cost) {
        this.country = country
        this.displayName = displayName
        const costInEuros = (cost / 100).toFixed(2)
        this.cost = costInEuros
      }
    }

    let cart = [];
    let shippingCosts;
    let subtotal = 0;
    disableButton()

    document.addEventListener('DOMContentLoaded', async e => {
      cart = JSON.parse(localStorage.getItem('cart'));
      console.log('cart', cart);

      if (!cart || !Array.isArray(cart))  else {
        retrieve()
          .then(shippings => setCountrySelection(shippings))
          .then(enableButton)
          .then(updateTotalCost)
      }
    })

    document.getElementById('country').addEventListener('change', updateTotalCost);

    async function retrieve() {
      const response = await fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping")
      const rawData = await response.json()

      var shippings = rawData.destinations.map(
        shipping => {
          return new Shipping(shipping.country, shipping.displayName, shipping.cost)
        }
      )

      shippingCosts = shippings

      return shippings
    }

    function createOption(displayName, countryCode) {
      const option = document.createElement("option");
      option.text = displayName
      option.value = countryCode
      const select = document.getElementById("country")
      select.appendChild(option)
    }


    function setCountrySelection(shippings) {
      for (let shipping of shippings) {
        createOption(shipping.displayName, shipping.country)
      }
    }

    function updateTotalCost() {
      const shippingCost = updateShippingCost()
      const subtotal = calculateSubtotal()

      const priceTotal = document.getElementById("price-total")
      const price = parseFloat(shippingCost + subtotal).toFixed(2)
      priceTotal.innerHTML = price
    }


    function calculateSubtotal() {
      if (subtotal != 0) 
      cart.forEach((cartItem, i) => {
          subtotal += calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth)
      });

      const subtotalTag = document.getElementById("price-subtotal")
      subtotalTag.innerText = subtotal
  
      return subtotal
    }

    function updateShippingCost() {
      const countryName = document.getElementById("country").value

      for (let country of shippingCosts) {
        if (country.country === countryName) {
          const priceShipping = document.getElementById("price-shipping")
          priceShipping.innerHTML = country.cost

          return parseFloat(country.cost)
        }
      }}

    function disableButton() {
      const button = document.getElementById("pay-button")
      button.disabled = true
    }

    function enableButton() {
      const button = document.getElementById("pay-button")
      button.disabled = false
    }

  