import {calculatePrice, render} from "./frame.js";
import {getObject} from "./common.js";
import {readCart, removeFromCart} from "./cart-model.js";

export function removeItemFromCartEventListener(event) {
    removeFromCart(event.target.id);
    let elem = document.getElementById("item_" + event.target.id);
    elem.parentNode.removeChild(elem);
    calculateTotal();
    checkAndSetNoItemsText();
}

function checkAndSetNoItemsText() {
    let list = readCart();
    if (list.length === 0) 
}

export async function addCartObjectToCartView() {
    let list = readCart();
    let f = 0;

    checkAndSetNoItemsText();

    for (let i of list) {
        let item = await getObject(i.objectID);
        if (!item) 
        let cart = document.getElementById("cart");

        let clone = document.getElementById("cart-item-template").content.cloneNode(true);
        clone.querySelectorAll("div[class='cart-preview']")[0].id = "preview-container-" + f;
        clone.querySelectorAll("img[class='cart-thumb']")[0].id = "preview-" + f;
        clone.querySelectorAll("button[class='cart-remove']")[0].addEventListener("click", removeItemFromCartEventListener);
        clone.querySelectorAll("button[class='cart-remove']")[0].id = "" + f;
        clone.querySelectorAll("div[class='cart-item']")[0].id = "item_" + f;
        clone.querySelectorAll("span[class='artist']")[0].innerText = item.artistDisplayName;
        clone.querySelectorAll("span[class='title']")[0].innerText = item.title;
        clone.querySelectorAll("span[class='date']")[0].innerText = item.objectDate;

        let descriptionString = "";
        switch (i.printSize) {
            case "M":
                descriptionString += "Medium ";
                break;
            case "S":
                descriptionString += "Small ";
                break;
            case "L":
                descriptionString += "Large ";
                break;
        }
        descriptionString += "print in a " + Math.round(Math.max(Math.min(i.frameWidth / 10, 10), 0) * 10) / 10 + " cm " + i.frameStyle + " frame";
        if (i.matWidth > 0) {
            descriptionString += " with a " + Math.round(Math.max(Math.min(i.matWidth / 10, 10), 0) * 10) / 10 + " cm " + i.matColor + " mat"
        }
        descriptionString += ".";

        clone.querySelectorAll("span[class='frame-description']")[0].innerText = descriptionString;
        clone.querySelectorAll("span[id='price-0']")[0].innerText = calculatePrice(i.printSize, i.frameStyle, i.frameWidth, i.matWidth);

        let renderImage = clone.querySelector("#preview-" + f);
        renderImage.src = item.primaryImageSmall;
        let clonePreviewContainer = clone.querySelector("#preview-container-" + f);
        cart.insertBefore(clone, cart.firstChild);
        let queryString = "?objectID=" + i.objectID;
        queryString += "&printSize=" + i.printSize;
        queryString += "&frameStyle=" + i.frameStyle;
        queryString += "&frameWidth=" + i.frameWidth;
        queryString += "&matColor=" + i.matColor;
        queryString += "&matWidth=" + i.matWidth;
        document.getElementById("preview-container-" + f).getElementsByTagName("a")[0].href = "config.html" + queryString;
        render(renderImage, clonePreviewContainer, i.printSize, i.frameStyle, i.frameWidth, i.matColor, i.matWidth);
        f += 1;
    }

    calculateTotal();
}

function calculateTotal() {
    let amount = 0;
    for (let item of document.getElementsByClassName("cart-price")) {
        amount += +item.lastChild.innerText;
    }
    let totalPrice = document.getElementById("price-total");
    if (totalPrice) {
        totalPrice.innerText = "" + amount.toFixed(2);
    }
}

