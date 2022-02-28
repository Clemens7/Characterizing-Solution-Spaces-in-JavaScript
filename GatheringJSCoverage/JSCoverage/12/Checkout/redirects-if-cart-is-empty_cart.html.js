

  import {getObject, cache} from './met-api.js'
  import {render} from "./frame.js";
  import {calculatePrice} from "./frame.js";

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!cart.length){
    document.getElementById('cart').insertAdjacentHTML('afterbegin', `
      <div class="cart-item">
        There are no items in your shopping cart.
      </div>
    `)
    document.getElementById('checkout-button').disabled = true
  }

  

  

  const getItemPrice = 

  let total = cart.reduce(, 0)
  document.getElementById("price-total").innerHTML = total.toFixed(2)

  document.getElementById('checkout-button')
    .addEventListener('click', )

