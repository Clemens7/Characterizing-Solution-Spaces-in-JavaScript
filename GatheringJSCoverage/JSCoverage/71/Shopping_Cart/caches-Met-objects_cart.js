import {render, calculatePrice} from "./frame.js";

document.addEventListener("load", loadCartItems);
const MET_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const EMPTY_MESSAGE = "There are no items in your shopping cart.";
let checkEmptyCartTimer;

/**
 *
 * Adds an item to the cart
 * @param objectID The objectID of the image to add.
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matColor The color of the mat, as a string.
 * @param matWidth The width of the mat, in millimeters.
 */
export 

/**
 * Reloads cart items and cart size
 */
export function loadContent() {
    caches.open("artmart-cart");
    checkEmptyCart();
    loadCartItems();
    loadCartSize();
}

/**
 * Loads the cart items and adds them to the site.
 *
 */
export async function loadCartItems() {
    let itemCount = 0;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let sectionCart = document.getElementById("cart");

    //checkEmptyCartTimer = setInterval(checkEmptyCart, 500);

    for (let item of cart) {
        let image = await getCachedData(MET_URL + item.objectID);
        if (image === false) 
        let divCartItem = document.createElement("DIV");
        divCartItem.className = "cart-item";
        divCartItem.appendChild(createCartPreview(image.primaryImageSmall, item));
        divCartItem.appendChild(createMuseumLabel(image.artistDisplayName, image.title, image.objectDate, item));
        sectionCart.insertBefore(divCartItem, sectionCart.lastElementChild);
        checkEmptyCart();
        itemCount++;
    }

    calculateTotalPrice();

    async function getCachedData(itemID) {
        const cacheStorage = await caches.open("artmart-cart");
        const cashedResponse = await cacheStorage.match(itemID);

        if (!cashedResponse || !cashedResponse.ok) 

        return await cashedResponse.json();
    }


    function createCartPreview(imgSrc, item) {
        let divCartPreview = createEl("DIV", ["cart-preview"], "preview-container-" + itemCount);
        let a = document.createElement("A");
        a.setAttribute("href", "config.html" + "?objectID=" + item.objectID
        + "&printSize=" + item.printSize + "&frameStyle=" + item.frameStyle + "&frameWidth=" + item.frameWidth
        + "&matColor=" + item.matColor + "&matWidth=" + item.matWidth);
        let img = createEl("IMG", ["cart-thumb"], "preview-" + itemCount);
        img.setAttribute("src", imgSrc);
        //let imgFile = await fetch(imgSrc);
        a.appendChild(img);
        setTimeout(() =>
            {render(img, a, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth)},
            0);
        divCartPreview.appendChild(a);
        return divCartPreview;
    }


    function createMuseumLabel(artistName, title, date, item) {
        let divMuseumLabel = createEl("DIV", ["museum-label"]);
        divMuseumLabel.className = "museum-label";
        let divInMuseumLabel = document.createElement("DIV");
        let spanArtist = createEl("SPAN", ["artist"]);
        let spanTitle = createEl("SPAN", ["title"]);
        let spanDate = createEl("SPAN", ["date"]);
        let spanDesc = createEl("SPAN", ["frame-description"]);
        spanArtist.innerText = artistName;
        spanTitle.innerText = title;
        spanDate.innerText = date;
        spanDesc.innerText = createConfigDescription(item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
        divInMuseumLabel.appendChild(spanArtist);
        divInMuseumLabel.appendChild(spanTitle);
        divInMuseumLabel.innerHTML += ", ";
        divInMuseumLabel.appendChild(spanDate);
        divInMuseumLabel.appendChild(document.createElement("BR"));
        divInMuseumLabel.appendChild(document.createElement("BR"));
        divInMuseumLabel.appendChild(spanDesc);
        divMuseumLabel.appendChild(divInMuseumLabel);
        let divCartPrice = createEl("DIV", ["cart-price"]);
        divCartPrice.innerHTML += "&euro; "
        let spanPrice = createEl("SPAN", [],"price-" + itemCount)
        spanPrice.innerText = "" + calculatePrice(item.printSize, item.frameStyle,
            item.frameWidth, item.matWidth);
        divCartPrice.appendChild(spanPrice);
        divMuseumLabel.appendChild(divCartPrice);
        let buttonRemove = createEl("BUTTON", ["cart-remove"]);
        buttonRemove.addEventListener("click", );
        divMuseumLabel.appendChild(buttonRemove);
        return divMuseumLabel;
    }

    function createEl(tagName, classNames, id = "") {
        let el = document.createElement(tagName);
        for (let className of classNames) {
            el.classList.add(className);
        }
        el.id = id;
        return el;
    }

    function createConfigDescription(printSize, frameStyle, frameWidth, matColor, matWidth) {
        let size;
        switch (printSize) {
            case 'S':
                size = "Small";
                break;
            case 'M':
                size = "Medium";
                break;
            
        }

        if (matWidth === 0) else {
            return size + " print in a " + parseFloat(frameWidth)/10 + " cm " + frameStyle + " frame with a " +
                parseFloat(matWidth)/10 + " cm " + matColor + " mat."
        }
    }
}

export 

export function loadCartSize() {
    let items = JSON.parse(localStorage.getItem("cart"));
    if (!items)  else {
        document.getElementById("cart-link").innerText = "Cart (" + items.length + ")";
    }
}

export function checkEmptyCart() {
    let sectionCart = document.getElementById("cart");
    if (sectionCart.children.length === 1) {
        document.getElementById("checkout-button").disabled = true;
        let divEmptyMessage = document.createElement("DIV");
        divEmptyMessage.id = "empty-cart-message";
        let spanEmptyMessage = document.createElement("SPAN");
        spanEmptyMessage.innerText = EMPTY_MESSAGE;
        divEmptyMessage.appendChild(spanEmptyMessage);
        sectionCart.insertBefore(divEmptyMessage, sectionCart.lastElementChild);
    } else {
        let message = document.getElementById("empty-cart-message");
        if (message !== null) {
            sectionCart.removeChild(document.getElementById("empty-cart-message"));
        }
    }
}

export function calculateTotalPrice() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let sum = 0;
    for (let item of cart) {
        sum += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }
    document.getElementById("price-total").innerText = "" + sum;
}

export class CartItem {
    
}
