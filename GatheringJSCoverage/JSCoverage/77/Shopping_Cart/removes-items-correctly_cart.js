import * as Frame from '../frame.js';
import {PreviewContainer} from './cart-dom.js';
import * as SearchAPI from './search-api.js'
import {CART} from "./artmart-cache.js";
import {localPictures} from './artmart-cache.js ';

(function () {
    CART.init();
    console.log(CART);
    localPictures.init();
    if (CART.contents.length == 0)  else {
        getItems();
    }
})();


function getItems() {
    let previewContainer = new PreviewContainer('cart');
    //previewContainer.getTotalPrice();
    setEventListenerForSection();

    let storage = CART.contents;
    for (let i = 0; i < storage.length; i++) {
        getItem(storage[i], previewContainer, i);
    }
    totalPrice();
    setCartCount();
}


async function getItem(image, previewContainer, index) {

    let picture = localPictures.retrieve(image.objectID)[0];

    if (typeof picture == 'undefined') {
        picture = await SearchAPI.retrieve_id(image.objectID);
        localPictures.store([picture]);
    }

    previewContainer.set(picture);
    setRemoveId();

    const imgParent = document.getElementsByClassName("cart-item").item(0).children.item(0);
    const img = imgParent.children.item(0).children.item(0);

    img.addEventListener("load", () => {
        Frame.render(img, imgParent, image.printSize, image.frameStyle, image.frameWidth, image.matColor, image.matWidth);
    });

    setHref(image);
    setPrice(image);
    setDescription(image);

    const remove = document.getElementById("cart-remove-" + index);
    remove.addEventListener("click", () => {
        removeCart(image, index);
        setCartCount();
        totalPrice();
    });
}

function setHref(image) {
    let a = document.getElementById("preview-container-" + image.objectID).children.item(0);
    a.setAttribute("href", "./config.html?objectID=" +
        image.objectID + "&printSize=" +
        image.printSize + "&frameStyle=" +
        image.frameStyle + "&frameWidth=" +
        image.frameWidth + "&matColor=" +
        image.matColor + "&matWidth=" +
        image.matWidth);
}

function setPrice(artwork) {
    const priceEl = document.getElementById("price-" + artwork.objectID);
    let price = Frame.calculatePrice(artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matWidth);
    priceEl.innerHTML = "€ " + price;
}

function setDescription(image) {
    // Mapping the Object to String
    let printSizeText;
    switch (image.printSize) {
        case "S":
            printSizeText = "Small";
            break;
        case "M":
            printSizeText = "Medium";
            break;
        case "L":
            printSizeText = "Large";
            break;
    }

    let matText = ".";
    if (image.matWidth > 0) {
        matText = " with a " + image.matWidth / 10 + " cm " + image.matColor + " mat.";
    }

    const frameDescEl = document.getElementById("frame-description-" + image.objectID);
    frameDescEl.innerHTML = printSizeText + " print in a " + image.frameWidth / 10 + " cm " + image.frameStyle + " frame" + matText;
}


function totalPrice() {
    let storage = CART.contents;
    let totalPrice = 0;
    for (let i = 0; i < storage.length; i++) {
        const artwork = storage[i];
        totalPrice = totalPrice + Frame.calculatePrice(artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matWidth);
    }
    document.getElementById("price-total").innerText = totalPrice.toFixed(2);
}

function setEventListenerForSection() {
    const section = document.getElementById("checkout-button");

    section.addEventListener("click", );
}

function setCartCount() {
    let storage = CART.contents;
    if (storage.length > 0) {
        document.getElementById("cart-link").innerText = "Cart (" + CART.size() + ")";
    }
}

function removeCart(image, id) {
    let deleteButton = document.getElementById("cart-remove-" + id);
    console.log(CART.contents);
    deleteButton.parentNode.parentNode.parentNode.removeChild(deleteButton.parentNode.parentNode);
    let storage = CART.contents;
    storage.splice(id,1);
    CART.sync();
    if (CART.contents.length == 0) 
    console.log(CART.contents);
}



function setRemoveId() {
    let removeButtons = document.getElementsByClassName("cart-remove");
    for (let i = removeButtons.length - 1, j = 0; i >= 0; i--, j++) {
        removeButtons.item(j).setAttribute("id", "cart-remove-" + i);
    }
}