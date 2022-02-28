import {calculatePrice} from "./frame.js"
import {render} from "./frame.js"

//button needs to be display for empty message test!!


document.addEventListener("DOMContentLoaded", ev => {
    let cart = localStorage.getItem("cart") ;
    cart = JSON.parse(cart);

    if (cart.length === 0)  else {
        fillCart(cart);
        addTotalPrice(calculatePriceTotal());
    }
});


export 




function fillCart(cart) {
    cart.forEach(element => {
        fetchImageData(element.objectID, element)
    })
};

function fetchImageData(objectID, cartItem) {
    let data = retrieveImages(objectID);
    if (data)  else {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`).then(resp => {
            return resp.json()
        }).then(data => {
            storeImages(data.objectID, data);
            addCartItem(createCartItem(data, cartItem));
            updateImg(data, cartItem);
        }).catch()
    }
}

function addCartItem(item) {
    const cart = document.getElementById("cart");
    cart.prepend(item);
}

function addTotalPrice(totalPrice) {
    const cartPrice = document.getElementById("price-total");
    cartPrice.innerHTML = totalPrice;
    if (totalPrice == 0) 
}

function calculatePriceTotal() {
    let cart = localStorage.getItem("cart") ;
    cart = JSON.parse(cart);

    var priceTotal = 0;
    cart.forEach(element => {
        priceTotal += calculatePrice(element.printSize, element.frameStyle, element.frameWidth, element.matWidth)
    });
        document.getElementById("cart-link").innerHTML = "Cart (" + cart.length + ")";

    return priceTotal.toFixed(2);
}

function createCartItem(data, cartItem) {
    let cart = localStorage.getItem("cart") ;
    cart = JSON.parse(cart);
    const href = "config.html?objectID=" + data.objectID
        + "&printSize=" + cartItem.printSize
        + "&frameStyle=" + cartItem.frameStyle
        + "&frameWidth=" + cartItem.frameWidth
        + "&matColor=" + cartItem.matColor
        + "&matWidth=" + cartItem.matWidth;

    let priceItem = 0;
    priceItem = calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);

    let div = document.createElement('div');
    div.className = 'cart-item';
    div.setAttribute('id', 'cart-item-' + data.objectID);
    div.innerHTML =
        `<div class="cart-preview" id="preview-container-${data.objectID}">
                <a href="${href}">
                    <img class="cart-thumb" src="${data.primaryImageSmall}" id="preview-${data.objectID}" alt="${data.objectID}">
                </a>
            </div>
            <div class="museum-label">
                <div>
                    <span class="artist">${data.artistDisplayName}</span>
                    <span class="title">${data.title}</span>,
                    <span class="date">${data.objectDate}</span>
                    <br><br>
                    <span class="frame-description">${getDescribtion(cartItem)}</span>
                </div>
            <div class="cart-price">€ <span id="price-${data.objectID}">${priceItem.toFixed(2)}</span></div>
                <button class="cart-remove" id="cart-remove-${data.objectID}" onclick="import('./cart.js').then(o=> o.removeItem(${data.objectID}))""></button>
            </div>`;
    return div;
}

function getDescribtion(cartItem) {
    let desc = "";
    let mat = "";

    if (cartItem.matWidth != 0) {
        mat = ` with a ${cartItem.matWidth / 10}&nbsp;cm ${cartItem.matColor} mat.`
    }

    let size = "";
    switch (cartItem.printSize) {
        case 'S' :
            size = "Small";
            break;
        case 'L' :
            size = "Large";
            break;
        
    }

    desc = `${size} print in a ${(cartItem.frameWidth / 10)}&nbsp;cm ${cartItem.frameStyle} frame${mat}`;
    return desc;
}

function updateImg(data, cartItem) {
    let img = document.getElementById(`preview-${data.objectID}`);
    let container = document.getElementById(`preview-container-${data.objectID}`);
    let printSize = cartItem.printSize;
    let frameStyle = cartItem.frameStyle;
    let frameWidth = cartItem.frameWidth;
    let matColor = cartItem.matColor;
    let matWidth = cartItem.matWidth;
    render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
}

function storeImages(objectID, data) {
    localStorage[objectID] = JSON.stringify(data);
}

function retrieveImages(objectID) {
    if (objectID in localStorage) 
}
