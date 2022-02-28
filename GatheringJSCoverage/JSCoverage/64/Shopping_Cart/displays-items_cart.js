import * as ArtworkCache from './artwork-cache.js';
import {render, calculatePrice} from "../frame.js";
import {calculateTotal, displayCartContent} from "./cart-common.js";

document.addEventListener('DOMContentLoaded', initializeCart);

function initializeCart() {
    let cart;
    try {
        const cartString = localStorage.cart ;
        cart = JSON.parse(cartString);
    } 
    const cartContainer = document.getElementById('cart');
    const cartTotalNode = document.getElementsByClassName('cart-total')[0];
    const promises = cart.map(item => getObjectData(item)).reverse();

    if (cart.length === 0)  else {
        Promise.all(promises).then(responses => {
            responses.map((response, index) => {
                const item = response.item;
                const objectData = response.data;

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartContainer.insertBefore(cartItem, cartTotalNode);

                const cartPreview = document.createElement('div');
                cartPreview.classList.add('cart-preview');
                cartPreview.id = `preview-container-${index}`;
                cartItem.appendChild(cartPreview);

                const cartPreviewA = document.createElement('a');
                cartPreviewA.href = 'config.html?' +
                    `objectID=${item.objectID}&` +
                    `printSize=${item.printSize}&` +
                    `frameStyle=${item.frameStyle}&` +
                    `frameWidth=${item.frameWidth}&` +
                    `matColor=${item.matColor}&` +
                    `matWidth=${item.matWidth}`
                ;
                cartPreview.appendChild(cartPreviewA);

                const cartPreviewAImg = document.createElement('img');
                cartPreviewAImg.classList.add('cart-thumb');
                cartPreviewAImg.id = `preview-${index}`;
                cartPreviewAImg.src = objectData.primaryImageSmall;
                cartPreviewAImg.alt = `${objectData.title} by ${objectData.artistDisplayName}`;
                cartPreviewA.appendChild(cartPreviewAImg);

                const museumLabel = document.createElement('div');
                museumLabel.classList.add('museum-label');
                cartItem.appendChild(museumLabel);

                const museumLabelDiv = document.createElement('div');
                museumLabelDiv.textContent = ', ';
                museumLabel.appendChild(museumLabelDiv);

                const museumLabelDivArtistSpan = document.createElement('span');
                museumLabelDivArtistSpan.classList.add('artist');
                museumLabelDivArtistSpan.innerText = objectData.artistDisplayName;
                museumLabelDiv.insertBefore(museumLabelDivArtistSpan, museumLabelDiv.firstChild);

                const museumLabelDivTitleSpan = document.createElement('span');
                museumLabelDivTitleSpan.classList.add('title');
                museumLabelDivTitleSpan.innerText = objectData.title;
                museumLabelDiv.insertBefore(museumLabelDivTitleSpan, museumLabelDiv.childNodes[1]);

                const museumLabelDivDateSpan = document.createElement('span');
                museumLabelDivDateSpan.classList.add('date');
                museumLabelDivDateSpan.innerText = objectData.objectDate;
                museumLabelDiv.appendChild(museumLabelDivDateSpan);

                museumLabelDiv.appendChild(document.createElement('br'));
                museumLabelDiv.appendChild(document.createElement('br'));

                const museumLabelDivFrameDescription = document.createElement('span');
                museumLabelDivFrameDescription.classList.add('frame-description');
                museumLabelDivFrameDescription.innerText = buildFrameDescriptionText(item);
                museumLabelDiv.appendChild(museumLabelDivFrameDescription);

                const museumLabelCartPrice = document.createElement('div');
                museumLabelCartPrice.classList.add('cart-price');
                museumLabelCartPrice.innerText = '€ ';
                museumLabel.appendChild(museumLabelCartPrice);

                const museumLabelCartPriceSpan = document.createElement('span');
                museumLabelCartPriceSpan.id = `price-${index}`;
                museumLabelCartPriceSpan.innerText =
                    calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth).toFixed(2);
                museumLabelCartPrice.appendChild(museumLabelCartPriceSpan);

                const cartRemoveButton = document.createElement('button');
                cartRemoveButton.classList.add('cart-remove');
                cartRemoveButton.id = `removeButton-${index}`;
                cartRemoveButton.type = 'button';
                museumLabel.appendChild(cartRemoveButton);
                render(cartPreviewAImg, cartPreview, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
            });
        }).then(finishCartInit);
    }
}


function buildFrameDescriptionText(item) {
    const titleMapping = {
        S: 'Small',
        M: 'Medium',
        L: 'Large'
    };
    const size = titleMapping[item.printSize] ;
    const sizeNumber = item.frameWidth / 10;
    const frame = item.frameStyle;

    let matText = "";
    if (item.matWidth > 0) {
        const matWidth = item.matWidth / 10;
        const matColor = item.matColor;

        matText = ` with a ${matWidth} cm ${matColor} mat`;
    }

    return `${size} print in a ${sizeNumber} cm ${frame} frame${matText}.`;
}

async function getObjectData(item) {
    try {
        let object = ArtworkCache.retrieve(item.objectID);
        if (!object) {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${item.objectID}`);
            if (!response.ok) 
            object = await response.json();
            ArtworkCache.store(item.objectID, object);
        }
        return {
            item: item,
            data: object
        };
    }}



function finishCartInit() {
    displayCartContent();
    document.getElementById("price-total").innerText = calculateTotal();
    addRemoveListener();
    addCheckoutListener();
}

function addRemoveListener() {
    let removeCartButtons = document.querySelectorAll('.cart-remove');
    for (let button of removeCartButtons) {
        button.addEventListener('click', );
    }
}

function addCheckoutListener() {
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', )
    checkoutButton.disabled = false;
}


