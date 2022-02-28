import { loadObject } from "./artworkApi.js";
import { render, calculatePrice } from "./frame.js"

export function getItems() {
    return JSON.parse(localStorage.getItem('cart')) ;
}

export 

export 

export function renderCart() {
    document.getElementById('cart-link').innerText = `Cart (${getItems().length})`;
}

function isEmpty() {
    return getItems().length < 1;
}

export async function initCart() {
    renderCart()

    const cart_items = document.getElementById('cart');
  
    // disable checkout button when cart is empty
    if (isEmpty())  else {
      document.getElementById('checkout-button').disabled = false;
    }

    // generate cart items
    let price_total = 0;
    const items = getItems();

    for(let i = 0; i < items.length; i++) {
        const item = items[i];

        //load object
        const artwork = await loadObject(item.objectID);

        //calc price
        const price = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth).toFixed(2);
        price_total += parseFloat(price);

        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-item');
        cart_item.innerHTML = `
            <div class="cart-preview" id="preview-container-${i}">
                <a href="config.html?${new URLSearchParams(item)}">
                    <img class="cart-thumb" src="${artwork.primaryImageSmall}" id="preview-${i}" alt="${artwork.title}">
                </a>
            </div>
            <div class="museum-label">
                <div>
                    <span class="artist">${artwork.artistDisplayName}</span>
                    <span class="title">${artwork.title}</span>,
                    <span class="date">${artwork.objectDate}</span>
                    <br><br>
                    <span class="frame-description">${getFrameDesc(item)}</span>
                </div>
                <div class="cart-price">€ <span id="price-${i}">${price}</span></div>
                <button class="cart-remove" onclick="remove(${i});"></button>
            </div>`;
        cart_items.insertBefore(cart_item, cart_items.firstChild);

        const preview = document.getElementById('preview-'+i);
        const preview_container = document.getElementById('preview-container-'+i);
        render(preview, preview_container, item.printSize,item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
    }
    //set total price
    document.getElementById('price-total').innerHTML = price_total.toFixed(2);

    //remove from cart
    window.remove = 
}

function getFrameDesc(item) {
    let size = null;
    if (item.printSize == 'S') {
        size = 'Small';
    } else if(item.printSize == 'M')  else if (item.printSize == 'L') {
        size = 'Large'
    }

    let mat_desc = null;
    if (item.matWidth == 0) {
        mat_desc = '.'
    } else {
        mat_desc = ` with a ${item.matWidth/10} cm ${item.matColor} mat.`
    }
    return `${size} print in a ${item.frameWidth/10} cm ${item.frameStyle} frame${mat_desc}`;
}