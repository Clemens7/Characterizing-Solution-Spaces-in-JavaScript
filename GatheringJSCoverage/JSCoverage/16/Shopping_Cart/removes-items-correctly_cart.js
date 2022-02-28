import { artService } from "./artService.js";
import { cache } from "./cache.js";
import * as domHelper from "./dom-helper.js"
import * as frame from "./frame.js"
import * as header from "./header.js"

function loadItems() {
    const cartItems = cache.getCartItems();
    if(cartItems.length > 0){
        createCartItems(cartItems);
    }
}



function calculateTotalPrice(){
    const cartItems = cache.getCartItems();
    let totalPrice = 0;

    for(let item of cartItems){
        totalPrice += frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }

    return (Math.round((totalPrice + Number.EPSILON) * 100) / 100);
}

async function createCartItems(cartItems) {
    let totalPrice = 0;
    const cart = document.getElementById("cart");
    for (let item of cartItems) {
        const artObject = await artService.getArtObject(item.objectID);
        let img = document.createElement("img");
        let a = document.createElement("a");
        const previewDiv = document.createElement("div");
        img.addEventListener("load", () => frame.render(img, previewDiv, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth), false);
        img.classList.add("cart-thumb");
        domHelper.setAttributes(img, { "src": artObject.imgUrl, "id": "preview-" + artObject.objectID, "alt": artObject.title });
        domHelper.setAttributes(a, { "href": `./config.html?objectID=${item.objectID}&printSize=${item.printSize}&frameStyle=${item.frameStyle}&frameWidth=${item.frameWidth}&matColor=${item.matColor}&matWidth=${item.matWidth}` });
        a.appendChild(img);
        a.classList.add("cart-preview");
        domHelper.setAttributes(previewDiv, { id: `preview-container-${artObject.objectID}` });
        previewDiv.appendChild(a);

        const artistSpan = domHelper.textElement("span", artObject.artist);
        artistSpan.classList.add("artist");
        const titleSpan = domHelper.textElement("span", artObject.title);
        titleSpan.classList.add("title");
        let textNode = document.createTextNode(", ");
        const dateSpan = domHelper.textElement("span", artObject.date);
        dateSpan.classList.add("date");
        const br1 = document.createElement("br");
        const br2 = document.createElement("br");
        let description = "";

        if (item.printSize === "S") {
            description += "Small ";
        }
        else if (item.printSize === "M") {
            description += "Medium ";
        }
        else {
            description += "Large ";
        }

        description += `print in a ${item.frameWidth / 10} cm ${item.frameStyle} frame`;

        if (item.matWidth > 0) {
            description += ` with a ${item.matWidth / 10} cm ${item.matColor} mat.`;
        }

        const descriptionSpan = domHelper.textElement("span", description);
        descriptionSpan.classList.add("frame-description");
        const div = domHelper.container([artistSpan, titleSpan, textNode, dateSpan, br1, br2, descriptionSpan], "div");

        const price = frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        totalPrice += price;
        const priceSpan = domHelper.textElement("span", price);
        domHelper.setAttributes(priceSpan, { "id": "price-" + artObject.objectID });
        textNode = document.createTextNode("€ ");
        const priceDiv = domHelper.container([textNode, priceSpan], "div");
        priceDiv.classList.add("cart-price");

        const removeButton = document.createElement("button");
        removeButton.classList.add("cart-remove");

        const museumLabelDiv = domHelper.container([div, priceDiv, removeButton], "div");
        museumLabelDiv.classList.add("museum-label");

        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");
        removeButton.addEventListener("click", event => {
            cache.removeFromCart(item.objectID);
            const priceElement = document.getElementById("price-total");
            priceElement.innerText = calculateTotalPrice();
            header.displayCartNumber();
            cartItemDiv.remove();
            if(cache.getCartItems().length <= 0)
        },false);
        cartItemDiv.appendChild(previewDiv);
        cartItemDiv.appendChild(museumLabelDiv);


        cart.prepend(cartItemDiv);
    }

    const totalPriceElement = document.getElementById("price-total");
    totalPrice = (Math.round((totalPrice + Number.EPSILON) * 100) / 100);
    totalPriceElement.innerText = totalPrice;
}



loadItems();