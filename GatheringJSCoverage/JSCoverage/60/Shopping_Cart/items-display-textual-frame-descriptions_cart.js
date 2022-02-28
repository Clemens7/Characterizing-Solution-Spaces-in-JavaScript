import { getPrintSizes, render, calculatePrice } from './frame.js';

var price = 0.0;
//cacheList is for cart items
let cacheList = [];
//cacheMetArray is for met objects
var cachedMetArray = [];
const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

document.addEventListener('DOMContentLoaded', event => {
    start();
    async function start() {
        // if the cache is empty, display empty items
        if (window.localStorage.getItem('cart') == "[]" || window.localStorage.length == 0) 
        // otherwise retrieve cartObjects and MetObjects
        else {
            const cartObjects = retrieve();
            var finalPrice = 0.0;
            for (var counter = cartObjects.length - 1; counter >= 0; counter--) {
                const index = counter;
                const cartObject = cartObjects[counter];
                const metObject = await initialCacheCheck(cartObject);
                store(cartObject);
                createCartElement(cartObject, metObject, counter);
                finalPrice += calculatePriceOf(cartObject);
            }
            refreshFinalPriceUI(finalPrice);
        }
        showCurrentNumberOfCartItems();
    }
})
function calculatePriceOf(cartObject) {
    return calculatePrice(
        `${cartObject.printSize}`,
        `${cartObject.frameStyle}`,
        `${cartObject.frameWidth}`,
        `${cartObject.matWidth}`
    );
}
//cacheList is an array oj objects that holds the cartObject and store it in localStorage
function store(cartObject) {
    const key = 'cart';
    const cacheItem = JSON.stringify(cartObject);
    if (!cacheList.includes(cacheItem)) {
        //adds cartItem at the beginning of the list
        cacheList.unshift(cacheItem);
        localStorage.setItem(key, "[" + cacheList + "]");
    }
}
function retrieve() {
    const currentCache = localStorage["cart"];
    const result = JSON.parse(currentCache);
    return JSON.parse(currentCache);
}
function createCartElement(cartObject, cachedMetObject, counter) {
    //create a new cartDivContainer with the counter as the ID
    //in the CartSectionContainer

    const cartDivContainer = document.createElement('div');
    cartDivContainer.setAttribute('class', `cart-item`);
    cartDivContainer.setAttribute('id', `cart-item-${counter}`);

    //Evalute the price of a cart item with the given config
    const currentPrice = calculatePrice(`${cartObject.printSize}`, `${cartObject.frameStyle}`, `${cartObject.frameWidth}`, `${cartObject.matWidth}`);
    price += currentPrice;

    //construct a string with the given config for the description Label
    const cartConfigDescription = evaluateConfig(`${cartObject.printSize}`, `${cartObject.frameStyle}`, `${cartObject.frameWidth}`, `${cartObject.matWidth}`, `${cartObject.matColor}`);

    //HTML Template to fill and modify dynamically
    fillCartItemTemplate(cartDivContainer, cachedMetObject, cartObject, cartConfigDescription, currentPrice, counter);

    //status updates for cache -> for testing purposes
    let cachedObjects;
    var filteredCachedObjects;
    var tmpArray = [];
    if (localStorage["cache"] != undefined) {
        cachedObjects = JSON.parse(localStorage.getItem("cache"));

    }
    var filteredCachedObjects = cachedObjects.filter(object => object.objectID == cartObject.objectID);

    if (filteredCachedObjects.length > 1) 

    if (filteredCachedObjects.length == 0) 

    var currentObject = filteredCachedObjects[0];
    if (!currentObject) 

}

function fillCartItemTemplate(
    cartDivContainer,
    cachedMetObject,
    cartItem,
    cartConfigDescription,
    currentPrice,
    counter
) {
    cartDivContainer.innerHTML =
        `
    <div class="cart-preview" id="preview-container-${counter}">
        <a href="" id="link-${counter}">
            <img class="cart-thumb" src="${cachedMetObject.primaryImageSmall}" id="preview-${counter}" alt="">
        </a>
    </div>
    <div class="museum-label">
      <div>
        <span class="artist">${cachedMetObject.artistDisplayName}</span>
        <span class="title">${cachedMetObject.title}</span>,
        <span class="date">${cachedMetObject.objectDate}</span>
        <br><br>
        <span class="frame-description">${cartConfigDescription}</span>
      </div>
      <div class="cart-price">€ <span id="price-${counter}">${currentPrice}</span></div>
      <button class="cart-remove" id="cart-remove-${counter}"></button>
    </div>
    `;
    const img = cartDivContainer.querySelector("#preview-" + counter);
    const cartPreviewContainer = cartDivContainer.querySelector(`#preview-container-${counter}`);
    img.addEventListener('load', e => render(
        img,
        cartPreviewContainer,
        `${cartItem.printSize}`,
        `${cartItem.frameStyle}`,
        `${cartItem.frameWidth}`,
        `${cartItem.matColor}`,
        `${cartItem.matWidth}`
    )
    );
    const cartSectionContainer = document.querySelector('.cart');
    cartSectionContainer.appendChild(cartDivContainer);
    createCloseButtonListener(cartItem, cartDivContainer, counter);
    createPreviewImageListener(cartItem, counter);

}

function createPreviewImageListener(cartItem, counter) {
    const previewImage = document.getElementById(`link-${counter}`);
    const currentPageURL = window.location.href;
    const filteredURL = currentPageURL.substr(0, currentPageURL.indexOf('cart'));
    previewImage.href = filteredURL + "config.html?objectID=" + cartItem.objectID + "&printSize=" + cartItem.printSize + "&frameStyle=" + cartItem.frameStyle + "&frameWidth=" + cartItem.frameWidth + "&matColor=" + cartItem.matColor + "&matWidth=" + cartItem.matWidth;
}

function refreshFinalPriceUI(finalPrice) {
    const cartContainer = document.getElementById('cart');
    const cartTotal = document.createElement('div');
    cartTotal.setAttribute('class', 'cart-total');
    const totalPrice = finalPrice.toFixed(2);
    cartTotal.innerHTML =
        `<div class="price">Total: € <span id="price-total">${totalPrice}</span></div>
        <button type="button" id="checkout-button">Checkout</button>
        `;
    cartContainer.appendChild(cartTotal);
}

function showCurrentNumberOfCartItems() {
    const navControl = document.getElementsByTagName('nav');
    const cartLink = document.querySelector('#cart-link');
    if (cacheList.length > 0) {
        const numberOfCartItems = cacheList.length;
        cartLink.innerText = "Cart (" + numberOfCartItems + ")";
    }

}
function createCloseButtonListener(cartItem, cartDivContainer, counter) {
    const closeButton = cartDivContainer.querySelector(`#cart-remove-${counter}`);
    closeButton.addEventListener("click", );
}
// if a cart item is being removed, the localStorage for cart has to be updated

// this method checks the cache of Met Objects: if they are stored in the localStorage // -> dont fetch and retrieve from cache, otherwise fetch and store it in the cache
async function initialCacheCheck(cartObject) {
    try {
        const currentCache = localStorage.getItem("cache");
        if (currentCache == null) {
            const fetchedResponse = await fetch(baseURL + cartObject.objectID);
            const fetchedObjectJson = await fetchedResponse.json();
            const resultJsonMetObject = {
                "objectID": cartObject.objectID, "primaryImageSmall": fetchedObjectJson.primaryImageSmall, "artistDisplayName": fetchedObjectJson.artistDisplayName, "title": fetchedObjectJson.title,
                "objectDate": fetchedObjectJson.objectDate
            };
            cachedMetArray.unshift(resultJsonMetObject);
            localStorage.setItem("cache", JSON.stringify(cachedMetArray));

            return resultJsonMetObject;
        }
        else {
            // that means cache is filled -> look for the specific metObject with the 
            // given objectID -> if its not there -> fetch and store data and return //// it, otherwise just retrieve it from the cache and return it
            cachedMetArray = JSON.parse(currentCache);
            var filteredCacheObjects = cachedMetArray.filter(object => object.objectID == cartObject.objectID);
            if (filteredCacheObjects.length == 0) {
                const fetchedResponse = await fetch(baseURL + cartObject.objectID);
                const fetchedObjectJson = await fetchedResponse.json();
                const resultJsonMetObject = { "objectID": cartObject.objectID, "primaryImageSmall": fetchedObjectJson.primaryImageSmall, "artistDisplayName": fetchedObjectJson.artistDisplayName, "title": fetchedObjectJson.title, "objectDate": fetchedObjectJson.objectDate };
                cachedMetArray.unshift(resultJsonMetObject);
                localStorage.setItem("cache", JSON.stringify(cachedMetArray))

                return resultJsonMetObject;
            }
        }
    }}
function evaluateConfig(printSize, frameStyle, frameWidth, matWidth, matColor) {
    let configuredPrintSize = "";
    switch (printSize) {
        case "S":
            configuredPrintSize = "Small";
            break;
        
        case "L":
            configuredPrintSize = "Large";
            break;
        
    }
    if (frameWidth % 1 == 0) {
        frameWidth = parseInt(frameWidth);

    }
    if (matWidth % 1 == 0) {
        matWidth = parseInt(matWidth);

    }
    if (frameWidth === 0) 
    if (matWidth === 0) {
        return `${configuredPrintSize} print in a ${frameWidth / 10.0} cm ${frameStyle} frame.`
    }
    return `${configuredPrintSize} print in a ${frameWidth / 10.0} cm ${frameStyle} frame with a ${matWidth / 10.0} cm ${matColor} mat.`;
}

