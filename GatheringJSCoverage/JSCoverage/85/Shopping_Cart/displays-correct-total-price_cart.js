import * as Frame from './frame.js'
import {getArtworkById} from "./metArtwork.js";
import * as DOM from "./domElementHelper.js"

export function startPage() {
    let cart = getCart();

    if (cart.length === 0)  else {
        generateCart();
    }
}

/**
 * This function will set the values of the not-generated DOM-elements, if the cart is empty
 */


/**
 * This function is used when the cart isn't empty. It will generate the whole cart.
 * If the cart is empty, it will log an error and stop executing.
 */
function generateCart() {
    const cart = getCart();

    if (cart.length === 0) 

    document.getElementById("checkout-button").disabled = false;

    for (let index = 0; index < cart.length; index++) {
        let storageItem = cart[index];
        generateCartItem(storageItem, index);
    }

    document.getElementById("price-total").innerText = calcSum();
    document.getElementById("cart-link").innerText = getCartText();
}

/**
 * This function will fetch the artwork and generate the cart-item.
 * @param storageItem which is an array-entry from the localStorage cart
 * @param index is used to make the ids unique
 */
export function generateCartItem(storageItem, index) {
    const artworkPromise = getArtworkById(storageItem.objectID).then(artwork => { return artwork; });

    artworkPromise.then((artwork) => {
        generateCartItemWithArtwork(storageItem, artwork, index);
    });
}

/**
 * This function will create and put the whole cart-item into the DOM
 * @param storageItem which is an array-entry from the localStorage cart
 * @param artwork from the API
 * @param index is used to make the ids unique
 */
function generateCartItemWithArtwork(storageItem, artwork, index) {
    const museumLabelDiv = getMuseumLabelDiv(storageItem, artwork, index);
    const cartPreview = getCartPreview(storageItem, artwork, index);
    const cartItem = DOM.getContainer([cartPreview, museumLabelDiv], "div", "cart-item");
    const cartElement = document.getElementById("cart");


    // Is used for 2 things here:
    //  1. so the checkout stays at the end
    //  2. so the most recent painting is shown first
    cartElement.insertBefore(cartItem, cartElement.firstChild);

    // Explanation why I add "cartItem" to the remove Button:
    //  Since a cart-item DOM-element does NOT have an id, I use a work-around to remove the DOM-element
    //  without the need to refresh the website.
    const button = getRemoveButton(storageItem, cartItem);
    museumLabelDiv.appendChild(button);
}

function getCartPreview(storageItem, artwork, index) {
    const img = getImageElement(artwork, index);
    const a = getATag([img], storageItem);
    const cartPreview = DOM.getContainer([a],"div", "cart-preview");
    cartPreview.setAttribute("id", "preview-container-" + index);
    img.onload = function() { Frame.render(img,
        cartPreview,
        storageItem.printSize,
        storageItem.frameStyle,
        storageItem.frameWidth,
        storageItem.matColor,
        storageItem.matWidth) }

    return cartPreview;
}

function getATag(contents, storageItem) {
    const CONFIG_LOCATION = "config.html";

    const a = DOM.getContainer(contents, "a");
    a.setAttribute("href", CONFIG_LOCATION + "?" + getParameterLink(storageItem));

    return a;
}

/**
 * This function will return the parameters of the frame, so the frame-configuration opens with the right
 *  frame
 * @param storageItem with the saved frame-properties
 * @returns {string} the sub-link for the frame-configuration
 */
function getParameterLink(storageItem) {
    return "objectID=" + storageItem.objectID +
                "&printSize=" + storageItem.printSize +
                "&frameWidth=" + storageItem.frameWidth +
                "&frameWidthR=" + storageItem.frameWidth +
                "&frameStyle=" + storageItem.frameStyle +
                "&matWidth=" + storageItem.matWidth +
                "&matWidthR=" + storageItem.matWidth +
                "&matColor=" + storageItem.matColor + "";
}

export function getCartText() {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart)  else if (cart.length === 0) 

    return "Cart (" + cart.length + ")";
}

function getImageElement(artwork, index) {
    const img = document.createElement("img");
    img.setAttribute("src", artwork.image);
    img.setAttribute("alt", `Painting by ${artwork.artist}, called ${artwork.title}, from ca ${artwork.date}`);
    img.setAttribute("id", "preview-" + index);
    img.setAttribute("class", "cart-thumb");

    return img;
}

function getMuseumLabelDiv(storageItem, artwork, index) {
    const innerDiv = getInnerDivOfMuseumLabel(storageItem, artwork);
    const priceDiv = getPriceDiv(storageItem, artwork, index);

    return DOM.getContainer([innerDiv, priceDiv], "div", "museum-label");
}

function getInnerDivOfMuseumLabel(storageItem, artwork) {
    const artistSpan = DOM.getTextElement("span", artwork.artist, "artist");
    const titleSpan = DOM.getTextElement("span", artwork.title, "title");
    const dateSpan = DOM.getTextElement("span", artwork.date, "date");
    const br = document.createElement("br");
    const br2 = document.createElement("br");
    const description = DOM.getTextElement("span", getDescription(storageItem), "frame-description")

    return DOM.getContainer([artistSpan, titleSpan, ", ", dateSpan, br, br2, description], "div", "");
}

function getPriceDiv(storageItem, artwork, index) {
    const price = document.createElement("span");
    price.setAttribute("id", "price-" + index);
    price.innerText = getPriceOfItem(storageItem) + "";

    return DOM.getContainer(["€ ", price], "div", "cart-price");
}

/**
 * This function return the price of the given item
 * @param storageItem with the needed parameters to calculate the price
 * @returns {number} the right calculated price
 */
function getPriceOfItem(storageItem) {
    const printSize = storageItem.printSize;
    const frameStyle = storageItem.frameStyle;
    const frameWidth = storageItem.frameWidth;
    const matWidth = storageItem.matWidth;
    return parseFloat(Frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth));
}

/**
 *
 * @param storageItem the item from the localStorage
 * @param cartItem the DOM-element which should be deleted
 * @returns {HTMLButtonElement} the button with the onclick-event
 */
function getRemoveButton(storageItem, cartItem) {
    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "cart-remove");
    removeButton.onclick = ;

    return removeButton;
}



/**
 * This function determines whether the objects are the same or not.
 * Is generally used to know if the item was found in a loop
 * @param cartItem which is compared to the other item
 * @param storageItem which is compared to the other tiem
 * @returns {boolean} true if every value is the same, false otherwise
 */


/**
 * Returns the full description for the museum label
 * @param storageItem which has the properties to determine the description
 * @returns {string} The full description of storageItem
 */
function getDescription(storageItem) {
    const frameStyle = storageItem.frameStyle;
    const frameWidth = storageItem.frameWidth / 10;     // Turn to cm
    const matColor = storageItem.matColor;
    const matWidth = storageItem.matWidth / 10;        // Turn to cm
    const description = getPrintSizeText(storageItem) + " print in a " + frameWidth + " cm " + frameStyle + " frame";

    if (matWidth !== 0) {
        return description + " with a " + matWidth + " cm " + matColor + " mat.";
    }}

function getPrintSizeText(storageItem) {
    let print = storageItem.printSize;

    if (print === "S"){
        return "Small";
    } else if (print === "M") else if (print === "L"){
        return "Large";
    }
}

/**
 * This function will add the given product to the localStorage
 * @param product to add to the localStorage
 */
export 

/**
 * This function will return the cart from the localStorage.
 * @returns {any} An array which is empty or the saved cart from the localStorage
 */
export function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart)
    return cart;
}

/**
 *
 * @returns {string}
 */
export function calcSum() {
    let cart = getCart();
    let sum = 0;
    cart.forEach(item => {
       sum += getPriceOfItem(item);
    });
    return sum.toFixed(2);
}