import * as CacheService from './CacheService.js'
import { MetropolitanService } from "./MetropolitanService.js";
import { render } from "./frame.js";
import { Image } from "./Image.js";
import { calculatePrice } from "./frame.js";

const metropolitanService = new MetropolitanService()
const cartLabelElement = document.getElementById('cart-link')
const cart = CacheService.get('cart')
cartLabelElement.innerHTML = `Cart ${cart ? `(` + cart.length + `)` }`

const shoppingCart = document.getElementById('cart')
const checkoutButton = document.getElementById('checkout-button')
const cartItems = document.getElementById('cart')

let deleteItemButton = document.getElementsByClassName('cart-remove')

let price_total = 0

async function loadCartElements() {
    console.log('Loading elements from cache')
    cartItems.innerHTML = ''

    for (let i = cart.length - 1; i >= 0; i--) 


    let imageElement = document.getElementsByClassName('cart-thumb');
    let inc = 0

    for (let i = cart.length - 1; i >= 0; i--) 



    cartItems.innerHTML = cartItems.innerHTML +
        `<div class="cart-total">
                    <div class="price">Total: € <span id="price-total">0</span></div>
                    <button type="button" id="checkout-button">Checkout</button>
                </div>`

    const price = document.getElementById('price-total')

    price_total = Math.round((price_total + Number.EPSILON) * 100) / 100
    price.innerHTML = `${price_total}`


    for (let i = 0; i < deleteItemButton.length; i++) }














if (cart == null)  else {
    loadCartElements()
}
