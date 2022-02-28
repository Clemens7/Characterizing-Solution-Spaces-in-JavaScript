import {
    findObject, setPrice
} from "./general.js";
import {calculatePrice, render} from "./frame.js";
import {
    countCart,
    getCartProducts,
    isCartEmpty,
    removeFromCart
} from "./cart-helpers.js";


countCart();
calcPrice().then(r => console.log(r));

const cartElement = document.getElementById("cart");

if (isCartEmpty())  else {
    document.getElementById('checkout-button').disabled = false;
}

async function calcPrice() {
    let totalPrice = 0;
    const items = getCartProducts();

    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const obj = await findObject(item.objectID);

        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");
        const size = {
            'S': 'Small',
            'M': 'Medium',
            'L': 'Large'
        }
        const print = size[item.printSize] + ' print';
        const frame = `in a ${item.frameWidth / 10}&nbsp;cm ${item.frameStyle} frame`;
        const mat = item.matWidth > 0 ? ` with a ${item.matWidth / 10}&nbsp;cm ${item.matColor} mat.` ;

        cartItemDiv.innerHTML =
            `<div class="cart-preview" id="preview-container-${index}">
                <a href="config.html?${new URLSearchParams(item)}">
                    <img class="cart-thumb" src="${obj.primaryImageSmall}" id="preview-${index}" alt="${obj.title}">
                </a>
            </div>
            <div class="museum-label">
            <div>
                <span class="artist">${obj.artistDisplayName}</span>
                <span class="title">${obj.title}</span>,
                <span class="date">${obj.objectDate}</span>
                <br><br>
                <span class="frame-description">${print} ${frame}${mat}</span>
            </div>
            <div class="cart-price">€ <span id="price-${index}">0</span></div>
            <button class="cart-remove" onclick="remove(${index});"></button>
            </div>`;
        cartElement.insertBefore(cartItemDiv, cartElement.firstChild);

        const preview = document.getElementById("preview-" + index);
        const previewContainer = document.getElementById("preview-container-" + index);

        render(preview, previewContainer,
            item.printSize,
            item.frameStyle, item.frameWidth,
            item.matColor, item.matWidth);

        const price = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        document.getElementById("price-" + index).innerHTML = `${price}`;
        totalPrice += price;
    }
    setPrice("#price-total", totalPrice);
}

window.remove = 
