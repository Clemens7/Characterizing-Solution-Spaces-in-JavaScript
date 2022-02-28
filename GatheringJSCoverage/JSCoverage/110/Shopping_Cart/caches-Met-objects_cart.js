import * as DOM from '../helpers/dom.js';
import {getConfigurationList} from '../cart/storage.js';
import {calculateConfigPrice} from "../../frame.js";
import {renderConfig} from "../../frame.js";
import {getArtworksByIdListAsync} from "../metmuseum/museum-api.js";
import {removeConfiguration} from "./storage.js";

function createDescription(config) {
    let description = ``;
    const sizeNamesFull = {
        "S": "Small",
        "M": "Medium",
        "L": "Large"
    };

    if (!config.matWidth)  else {
        description = `${sizeNamesFull[config.printSize]} print in a ${config.frameWidth / 10} cm ${config.frameStyle} frame with a ${config.matWidth / 10} cm ${config.matColor} mat.`;
    }
    return description;
}

function createConfigPageUrl(config) {
    return `/config.html?objectID=${config.objectID}&printSize=${config.printSize}&frameStyle=${config.frameStyle}&frameWidth=${config.frameWidth}&matColor=${config.matColor}&matWidth=${config.matWidth}`
}

function calcTotalPriceOfItems(configs) {
    return configs.reduce((totalPrice, config) => totalPrice + calculateConfigPrice(config), 0);
}

function updateTotalPrice() {
    const items = getConfigurationList();
    document.getElementById("price-total").textContent = calcTotalPriceOfItems(items).toFixed(2);
}








function buildDOM() {
    const items = getConfigurationList();
    getArtworksByIdListAsync(items.map(artwork => artwork.objectID)).then(artworks => {
        for (let index = 0; index < artworks.length; index++) {
            let currConfig = items[index];
            let currArtwork = artworks[index];
            let currPrice = calculateConfigPrice(currConfig).toFixed(2);

            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.id = `cart-item-${index}`;
            document.getElementById("cart").insertAdjacentElement('afterbegin', cartItem);

            cartItem.innerHTML = `
                <div class="cart-preview" id="preview-container-${index}">
                    <a href="${createConfigPageUrl(currConfig)}">
                        <img class="cart-thumb" src="${currArtwork.img}" id="preview-${index}" alt="${currArtwork.title}">
                    </a>
                </div>
                <div class="museum-label">
                    <div>
                        <span class="artist">${currArtwork.artist}</span>
                        <span class="title">${currArtwork.title}</span>,
                        <span class="date">${currArtwork.date}</span>
                        <br><br>
                        <span class="frame-description">${createDescription(currConfig)}</span>
                    </div>
                    <div class="cart-price">
                        € <span id="price-0">${currPrice}</span>
                    </div>
                    <button class="cart-remove" id="cart-remove-${index}"></button>
                </div>`;

            //Image
            const imgElem = document.getElementById("preview-" + index);
            imgElem.addEventListener('load', event => {
                const imgContainer = document.getElementById("preview-container-" + index);
                renderConfig(imgElem, imgContainer, currConfig);
            });

            //remove button
            const removeButton = document.getElementById("cart-remove-" + index);
            removeButton.onclick = ;
        }
    });

}

function initCartItems() {
    const items = getConfigurationList();
    if (items.length === 0)  else {
        buildDOM();
    }
    //update total price
    updateTotalPrice();
}

function init(){
    document.getElementById("checkout-button").onclick = ;
    initCartItems();
}
DOM.onReady(init);