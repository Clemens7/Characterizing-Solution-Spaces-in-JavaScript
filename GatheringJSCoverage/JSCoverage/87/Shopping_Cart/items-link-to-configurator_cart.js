import * as models from './models.js';
import * as frame from './frame.js';
import * as util from './util.js';
import * as cache from './metmuseumAPI.js';

let cart;
let template;
let cartItems;
let cartTotalPrice = 0;

cart = document.getElementById('cart');
template = getTemplate(cart, '.cart-item');
cartItems = models.retrieveCart();
setCartItemSize();
addCartItems(cartItems);
cartEmpty();

document.addEventListener('DOMContentLoaded', event => {
    //eventListenersForRemoveItem();
});

document.getElementById('checkout-button').addEventListener('click', );

function addCartItems(itemsObject) {
    let index = 0;
    itemsObject.items.forEach(item => {
        addCartItem(item, index);
        index++;
        showTotalPrice(item);
    });
}

async function addCartItem(item, index) {
    let object = await cache.getObject(item["objectID"]);
    let newItem = template.cloneNode(true);
    newItem.querySelector('.artist').textContent = object["artistDisplayName"];
    newItem.querySelector('.title').textContent = object["title"];
    newItem.querySelector('.date').textContent = object["objectDate"];

    let price = frame.calculatePrice(item["printSize"], item["frameStyle"], item["frameWidth"], item["matWidth"]);
    newItem.querySelector('#price-0').textContent = price;

    newItem.querySelector(".cart-remove").setAttribute('id', index);
    newItem.setAttribute('id', 'cart-index-' + index);
    newItem.querySelector(".cart-remove").addEventListener('click', );
    newItem.querySelector(".cart-preview").setAttribute('id', 'preview-container-' + item["objectID"]);
    newItem.querySelector("#price-0").setAttribute('id', 'price-' + item["objectID"]);

    newItem.getElementsByTagName('A')[0].href = "./config.html?objectID=" + item["objectID"]
        + '&printSize=' + item["printSize"] + '&frameStyle=' + item["frameStyle"] + '&frameWidth=' + item["frameWidth"] + '&matColor=' + item["matColor"] + '&matWidth=' + item["matWidth"];
    newItem.querySelector("img").src = object["primaryImageSmall"];
    newItem.querySelector("img").id = 'preview-' + item["objectID"];
    newItem = setItemDescription(newItem, item);

    cart.prepend(newItem);

    let imageContainer = document.getElementById('preview-' + item["objectID"]);
    let previewContainer = document.getElementById('preview-container-' + item["objectID"]);
    frame.render(imageContainer, previewContainer, item["printSize"], item["frameStyle"], item["frameWidth"], item["matColor"], item["matWidth"]);
}





function setItemDescription(nItem, oItem) {
    let sizeOfFrame;
    switch (oItem["printSize"]) {
        case 'S':
            sizeOfFrame = 'Small';
            break;
        case 'M':
            sizeOfFrame = 'Medium';
            break;
        case 'L':
            sizeOfFrame = 'Large';
            break;
    }

    if (oItem["matWidth"] == "0") else {
        nItem.querySelector('.frame-description').textContent = sizeOfFrame + ' print in a '
            + (oItem["frameWidth"] / 10) + ' cm ' + oItem["frameStyle"] + ' frame with a '
            + (oItem["matWidth"] / 10) + ' cm ' + oItem["matColor"] + ' mat.';
    }
    return nItem;
}

function getTemplate(cart, item) {
    let template = cart.querySelector(item);
    template.remove();

    return template;
}

function showTotalPrice(item) {
    let price = frame.calculatePrice(item["printSize"], item["frameStyle"], item["frameWidth"], item["matWidth"]);
    cartTotalPrice += price;
    document.querySelector('#price-total').textContent = cartTotalPrice.toFixed(2);
}

function cartEmpty() {
    let cartItems = models.retrieveCart();
    if (cartItems.items.length === 0) 
}

function setCartItemSize() {
    util.showCartNumber();
}

