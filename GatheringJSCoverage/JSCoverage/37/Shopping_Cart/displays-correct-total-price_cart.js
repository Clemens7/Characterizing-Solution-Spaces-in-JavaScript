import { fetchObject } from "./search.js";
import { render, calculatePrice} from "./frame.js";
import { cartCount } from "./config.js";


async function initCart() {
    await cartCount();

    if (!localStorage.getItem("cart")) 

    let cart = JSON.parse(localStorage.cart);
    let itemIndex = 0;
    for (let cartItem of cart) {
        let object = await fetchObject(cartItem.objectID);
        let newNode = createCartNode(object, cartItem, itemIndex);

        let cartNode = document.getElementById("cart");
        cartNode.insertBefore(newNode, cartNode.firstChild);

        let imgNode = document.getElementById(`preview-${cartItem.objectID}`);
        imgNode.onload = function() {
            console.log(cartItem.objectID);
            render(imgNode, document.getElementById(`preview-container-${object.objectID}`), cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth);
        };


        document.getElementById(`${itemIndex}`).onclick = ;

        itemIndex++;
    }

    updatePrice(cart);

    document.getElementById("checkout-button").onclick = 
    

}

function updatePrice(cart) {
    if (cart.length == 0)  else {
        let totalPrice = cart.map((cartItem) => parseFloat(calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth))).reduce((a, b) => a + b, 0);
        let roundedPrice = (Math.round((totalPrice + Number.EPSILON) * 100) / 100)
        document.getElementById("price-total").innerText = roundedPrice.toString();
    }
}

function createCartNode(object, cartItem, itemIndex) {
    let domNode = document.createElement("div");
    domNode.id = `cart-item-${object.objectID}`;
    cartItem.classList = "cart-item";
    domNode.innerHTML =  `
        <div class="cart-item">
        <div class="cart-preview" id="preview-container-${object.objectID}">
        <a href="${getConfigUrl(object, cartItem)}">
            <img class="cart-thumb" src="${object.primaryImageSmall}" id="preview-${object.objectID}" alt="${object.title}">
        </a>
        </div>
        <div class="museum-label">
        <div>
            <span class="artist">${object.artistDisplayName}</span>
            <span class="title">${object.title}</span>,
            <span class="date">${object.objectDate}</span>
            <br><br>
            <span class="frame-description">${getDescription(object, cartItem)}</span>
        </div>
        <div class="cart-price"> € <span id="price-${object.objectID}">${calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth)}</span></div>
        <button id="${itemIndex}" class="cart-remove" ></button>
        </div>
    </div>
    `;
    return domNode;
}

function getConfigUrl(object, cartItem) {
    return `./config.html?objectID=${cartItem.objectID}&printSize=${cartItem.printSize}&frameStyle=${cartItem.frameStyle}&frameWidth=${cartItem.frameWidth}&matColor=${cartItem.matColor}&matWidth=${cartItem.matWidth}`;
}

function getDescription(object, cartItem) {

    function formatPrintSize(ps) {
        switch (ps) {
            case "S":
                return "Small";
            
            case "L":
                return "Large";
            
        }
    }

    function formatWidth(w) {
        return "" + (w/10) + " cm"
    }


    let firstPart = `${formatPrintSize(cartItem.printSize)} print in a ${formatWidth(cartItem.frameWidth)} ${cartItem.frameStyle} frame`;
    let secondPart = `with a ${formatWidth(cartItem.matWidth)} ${cartItem.matColor} mat.`


    if (cartItem.matWidth == 0)  else {
        return firstPart + " " + secondPart;
    }
}

export {initCart, createCartNode};