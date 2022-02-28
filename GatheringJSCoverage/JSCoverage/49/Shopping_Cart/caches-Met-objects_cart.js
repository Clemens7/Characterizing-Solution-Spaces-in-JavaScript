import {getNumberOfObjectsInCart, getObjectsFromCart, removeObjectFromCart} from "./cartStore.js";
import {calculatePrice, render} from "./frame.js";
import {updateCartCountInHeader} from "./header.js";
import {getArtObjectByID} from "./artStore.js";

let totalSum = 0;

export async function createCart() {
    const cart = document.getElementById('cart');
    if (!getNumberOfObjectsInCart())  else { // loop through the frameInfo
        for (let item of getObjectsFromCart()) {
            cart.appendChild(await createCartItem(item));
        }
    }
    cart.appendChild(createCheckOutButton());
}

async function createCartItem(objectInfo) {
    let oID = objectInfo.objectID;
    let price = calculatePrice(objectInfo.printSize, objectInfo.frameStyle, objectInfo.frameWidth, objectInfo.matWidth);
    totalSum += price;
    let buildURL = `./config.html?objectID=${oID}&printSize=${objectInfo.printSize}&frameWidth=${objectInfo.frameWidth}` +
        `&frameStyle=${objectInfo.frameStyle}&matWidth=${objectInfo.matWidth}&matColor=${objectInfo.matColor}`;
    let response = await getArtObjectByID(oID);

    const item = document.createElement('div');
    item.className = 'cart-item';

    const previewDiv = document.createElement('div');
    previewDiv.className = "cart-preview";

    const aPreview = document.createElement('a');
    aPreview.href = buildURL;

    const imgPreview = document.createElement('img');
    imgPreview.className = "cart-thumb";
    imgPreview.src = response.previewImage;
    imgPreview.onload = () => render(imgPreview, previewDiv, objectInfo.printSize, objectInfo.frameStyle, objectInfo.frameWidth, objectInfo.matColor, objectInfo.matWidth);
    imgPreview.alt = response.title + " by " + response.artistDisplayName;

    const labelDiv = document.createElement('div');
    labelDiv.className = "museum-label";
    labelDiv.innerHTML = `
                <div>
                    <span class="artist">${response.artist}</span>
                    <span class="title"">${response.title}</span>,
                    <span class="date"">${response.year}</span>
                    <br><br>
                    <span class="frame-description">${buildDescription(objectInfo)}</span>
                </div>
                <div class="cart-price">€ <span>${price.toFixed(2)}</span></div>`;

    const btn = document.createElement('button');
    btn.className = "cart-remove";
    btn.onclick = ;

    aPreview.append(imgPreview);
    previewDiv.append(aPreview);
    labelDiv.append(btn);
    item.append(previewDiv);
    item.append(labelDiv);
    return item;
}

function createCheckOutButton() { // total price and checkout button
    const cartTotalDiv = document.createElement('div');
    cartTotalDiv.className = 'cart-total';
    cartTotalDiv.innerHTML = `<div class="price">Total: € <span id="price-total">${totalSum.toFixed(2)}</span></div>`;
    const checkOutButton = document.createElement('button');
    checkOutButton.id = "checkout-button";
    checkOutButton.textContent = "Checkout";
    if (!getNumberOfObjectsInCart())  else {
        checkOutButton.onclick = ;
    }
    cartTotalDiv.append(checkOutButton);
    return cartTotalDiv;
}

// Build textual description of the configuration for the artwork
function buildDescription(objectInfo) {
    let description = {
        "S": "Small",
        "M": "Medium",
        "L": "Large"
    }[objectInfo.printSize] + ` print in a ${objectInfo.frameWidth / 10} cm ${objectInfo.frameStyle} frame`;
    if (parseInt(objectInfo.matWidth) === 0 || !objectInfo.matWidth || !objectInfo.matColor)  else {
        description += ` with a ${objectInfo.matWidth / 10} cm ${objectInfo.matColor} mat.`;
    }
    return description;
}

export 