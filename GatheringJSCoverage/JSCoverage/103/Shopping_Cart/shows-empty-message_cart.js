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

if (isCartEmpty()) {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");
    cartItemDiv.innerHTML =
        `<span id="empty-message">There are no items in your shopping cart.</span>`;
    cartElement.insertBefore(cartItemDiv, cartElement.firstChild);
    document.getElementById('checkout-button').disabled = true;
}

async function calcPrice() {
    let totalPrice = 0;
    const items = getCartProducts();

    for (let index = 0; index < items.length; index++) 
    setPrice("#price-total", totalPrice);
}

window.remove = 
