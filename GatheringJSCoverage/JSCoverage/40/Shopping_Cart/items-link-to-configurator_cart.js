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

    for (let i = cart.length - 1; i >= 0; i--) {
        const object = await metropolitanService.object(cart[i].objectID, true);
        cartItems.innerHTML = cartItems.innerHTML + createCartItem(cart[i], object)
    }


    let imageElement = document.getElementsByClassName('cart-thumb');
    let inc = 0

    for (let i = cart.length - 1; i >= 0; i--) {
        let imgElement = imageElement[inc++]

        const image = new Image(imgElement, cart[i].printSize, cart[i].frameStyle, cart[i].frameWidth, cart[i].matColor, cart[i].matWidth);
        image.renderImage();
    }



    cartItems.innerHTML = cartItems.innerHTML +
        `<div class="cart-total">
                    <div class="price">Total: € <span id="price-total">0</span></div>
                    <button type="button" id="checkout-button">Checkout</button>
                </div>`

    const price = document.getElementById('price-total')

    price_total = Math.round((price_total + Number.EPSILON) * 100) / 100
    price.innerHTML = `${price_total}`


    for (let i = 0; i < deleteItemButton.length; i++) {
        let button = deleteItemButton[i]
        button.addEventListener('click', )
    }

}








function createCartItem({ objectID, printSize, frameStyle, frameWidth, matColor, matWidth }, object) {

    let description = ''

    if (printSize === 'S') { description += 'Small' }
    if (printSize === 'M') { description += 'Medium' }
    if (printSize === 'L') { description += 'Large' }

    description += ' print'

    if (frameWidth > 0) {
        description += ` in a ${frameWidth} cm ${frameStyle} frame`
    }

    if (matWidth > 0) {
        description += ` with a ${matWidth} cm ${matColor} mat`
    }
    description += '.'

    const p = calculatePrice(printSize, frameStyle, frameWidth, matWidth)
    price_total += p



    let html = `
       <div class="cart-item">
        <div class="cart-preview" id="preview-container-${objectID}">
          <a href="${createURLParamsForConfig(objectID, printSize, frameStyle, frameWidth, matColor, matWidth)}" id="object-${objectID}">
            <img class="cart-thumb" src="${object.primaryImageSmall}" alt="${object.artistDisplayName}" id="preview-${objectID}">
          </a>
        </div>
        <div class="museum-label">
          <div>
            <span class="artist">${object.artistDisplayName}</span>
            <span class="title">${object.title}</span>,
            <span class="date">${object.objectDate}</span>
            <br><br>
            <span class="frame-description">${description}</span>
          </div>
          <div class="cart-price">€ <span id="price-0">${p}</span></div>
          <button class="cart-remove" name="deleteItem" id="deleteItem-${objectID}"></button>
        </div>
      </div>`

    return html
}

function createURLParamsForConfig(objectID, printSize, frameStyle, frameWidth, matColor, matWidth) {
    let param = `config.html?objectID=${objectID}&printSize=${printSize}`

    param = param + `&frameStyle=${frameStyle}&frameWidth=${frameWidth}`
    param = param + `&matColor=${matColor}&matWidth=${matWidth}`


    return param
}



if (cart == null)  else {
    loadCartElements()
}
