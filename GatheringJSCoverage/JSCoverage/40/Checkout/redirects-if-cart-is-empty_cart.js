import * as CacheService from './CacheService.js'
import { MetropolitanService } from "./MetropolitanService.js";
import { render } from "./frame.js";
import { Image } from "./Image.js";
import { calculatePrice } from "./frame.js";

const metropolitanService = new MetropolitanService()
const cartLabelElement = document.getElementById('cart-link')
const cart = CacheService.get('cart')
cartLabelElement.innerHTML = `Cart ${cart  : ''}`

const shoppingCart = document.getElementById('cart')
const checkoutButton = document.getElementById('checkout-button')
const cartItems = document.getElementById('cart')

let deleteItemButton = document.getElementsByClassName('cart-remove')

let price_total = 0














function showEmptyMessage() {
    cartItems.innerHTML = `<h1>There are no items in your shopping cart.</h1>
            <div class="cart-total">
                <div class="price">Total: € <span id="price-total">0</span></div>
                <button type="button" id="checkout-button">Checkout</button>
            </div>`
    const checkoutButton = document.getElementById('checkout-button')
    checkoutButton.disabled = true
    cartLabelElement.innerHTML = 'Cart'
}

if (cart == null) {
    showEmptyMessage()
}
