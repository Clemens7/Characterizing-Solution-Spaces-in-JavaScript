import {calculatePrice, render} from './frame.js';

window.onload = async function() {
    await fillCart();
    addNumberToNav();
};

export function addNumberToNav() {
    const shoppingCart = getShoppingCartFromLocalStorage();
    if (shoppingCart.length) {
        const linkElement = document.getElementById('cart-link');
        linkElement.appendChild(document.createTextNode(` (${shoppingCart.length})`));
    }
}

export 

export function getShoppingCartFromLocalStorage() {
    const cartInLocalStorage = localStorage.getItem('cart');
    if (cartInLocalStorage) {
        const parsedCartInLocalStorage = JSON.parse(cartInLocalStorage);
        if (typeof parsedCartInLocalStorage === typeof []) {
            return parsedCartInLocalStorage;
        }
    }}

async function getObjectDetails(objectID) {
    if (localStorage.getItem(objectID)) {
        return JSON.parse(localStorage.getItem(objectID));
    }}

async function fillCart() {
    const shoppingCart = getShoppingCartFromLocalStorage();
    const cartElement = document.getElementById('cart');
    let totalPrice = 0;

    for (const item of shoppingCart) {
        const itemDetails = await getObjectDetails(item.objectID);

        const cartItemElement = document.createElement('div');

        const itemPrice = calculatePrice(item.printSize, item.frameStyle, item.frameWidth,
            item.matWidth);
        totalPrice += itemPrice;

        cartItemElement.setAttribute('class', 'cart-item');

        cartItemElement.appendChild(getCartPreviewDiv(item, itemDetails.title, itemDetails.primaryImageSmall));

        cartItemElement.appendChild(getMuseumLabelDiv(item, itemDetails, itemPrice));

        cartElement.appendChild(cartItemElement);
    }

    const cartTotalElement = document.createElement('div');
    cartTotalElement.setAttribute('class', 'cart-total');

    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.setAttribute('class', 'price');
    totalPriceDiv.appendChild(document.createTextNode('Total: € '));

    const totalPriceSpan = document.createElement('span');
    totalPriceSpan.setAttribute('id', 'price-total');
    totalPriceSpan.appendChild(document.createTextNode(totalPrice.toString()));
    totalPriceDiv.appendChild(totalPriceSpan);

    const checkoutButton = document.createElement('button');
    checkoutButton.setAttribute('type', 'button');
    checkoutButton.setAttribute('id', 'checkout-button');
    checkoutButton.appendChild(document.createTextNode('Checkout'));

    checkoutButton.onclick = ;

    if (!shoppingCart.length) 

    cartTotalElement.append(totalPriceDiv);
    cartTotalElement.append(checkoutButton);

    cartElement.appendChild(cartTotalElement);
}


function getMuseumLabelDiv(cartItem, objectDetails, price) {
    const museumLabelElement = document.createElement('div');
    museumLabelElement.setAttribute('class', 'museum-label');

    const spanWrapper = document.createElement('div');

    const artistSpan = document.createElement('span');
    artistSpan.setAttribute('class', 'artist');
    artistSpan.appendChild(document.createTextNode(objectDetails.artistDisplayName));

    const titleSpan = document.createElement('span');
    titleSpan.setAttribute('class', 'title');
    titleSpan.appendChild(document.createTextNode(objectDetails.title));

    const dateSpan = document.createElement('span');
    dateSpan.setAttribute('class', 'date');
    dateSpan.appendChild(document.createTextNode(', '));
    dateSpan.appendChild(document.createTextNode(objectDetails.objectDate));

    const frameDescriptionSpan = document.createElement('span');
    frameDescriptionSpan.setAttribute('class', 'frame-description');
    frameDescriptionSpan.appendChild(document.createTextNode(getFrameDescription(cartItem)));

    spanWrapper.appendChild(artistSpan);
    spanWrapper.appendChild(titleSpan);
    spanWrapper.appendChild(dateSpan);
    spanWrapper.appendChild(document.createElement('br'));
    spanWrapper.appendChild(document.createElement('br'));
    spanWrapper.appendChild(frameDescriptionSpan);

    museumLabelElement.appendChild(spanWrapper);

    const cartPriceElement = document.createElement('div');
    cartPriceElement.setAttribute('class', 'cart-price');

    const cartPriceSpan = document.createElement('span');
    cartPriceSpan.setAttribute('id', `price-${0}`);
    cartPriceSpan.appendChild(document.createTextNode(price));

    cartPriceElement.appendChild(document.createTextNode("€ "));
    cartPriceElement.appendChild(cartPriceSpan);

    museumLabelElement.appendChild(cartPriceElement);

    const removeButtonElement = document.createElement('button');
    removeButtonElement.setAttribute('class', 'cart-remove');
    removeButtonElement.onclick = ;
    museumLabelElement.appendChild(removeButtonElement);

    return museumLabelElement;
}



function getFrameDescription(cartItem) {
    let size;
    switch(cartItem.printSize) {
        case 'S':
            size = 'Small';
            break;
        case 'M':
            size = 'Medium';
            break;
        
    }

    let basicDescription = `${size} print in a ${cartItem.frameWidth / 10} cm ${cartItem.frameStyle} frame`;

    if (cartItem.matColor && cartItem.matWidth) {
        return `${basicDescription} with a ${cartItem.matWidth / 10} cm ${cartItem.matColor} mat.`;
    }}

function getCartPreviewDiv(cartItem, title, imageURL) {
    const cartPreviewElement = document.createElement('div');
    cartPreviewElement.setAttribute('class', 'cart-preview');
    cartPreviewElement.setAttribute('id', `preview-container-${cartItem.objectID}`);

    const cartPreviewLink = document.createElement('a');
    let link = `config.html?objectID=${cartItem.objectID}&printSize=${cartItem.printSize}&frameStyle=${cartItem.frameStyle}&frameWidth=${cartItem.frameWidth}`;
    if (cartItem.matColor && cartItem.matWidth) {
        link = `${link}&matColor=${cartItem.matColor}&matWidth=${cartItem.matWidth}`;
    }
    cartPreviewLink.setAttribute('href', link);

    const previewImgElement = document.createElement('img');
    previewImgElement.setAttribute('class', 'cart-thumb');
    previewImgElement.setAttribute('id', `preview-${cartItem.objectID}`);
    previewImgElement.setAttribute('src', imageURL);
    previewImgElement.setAttribute('alt', title);
    previewImgElement.onload = () => render(previewImgElement, cartPreviewLink, cartItem.printSize,
        cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth);

    cartPreviewLink.appendChild(previewImgElement);
    cartPreviewElement.appendChild(cartPreviewLink);

    return cartPreviewElement;
}

export 
