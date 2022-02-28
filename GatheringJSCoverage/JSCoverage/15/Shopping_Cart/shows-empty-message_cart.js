import {calculatePrice} from "./frame.js"
import {render} from "./frame.js"

//button needs to be display for empty message test!!


document.addEventListener("DOMContentLoaded", ev => {
    let cart = localStorage.getItem("cart") || "[]";
    cart = JSON.parse(cart);

    if (cart.length === 0) {
        addTotalPrice(calculatePriceTotal());
    }
});


export 


function showEmptyCartMessage() {
    const emptyCart = document.getElementById("cart");
    let message = document.createElement("h2");
    message.innerText = "There are no items in your shopping cart.";
    emptyCart.appendChild(message);

    document.getElementById("checkout-button").disabled = true;
}

;





function addTotalPrice(totalPrice) {
    const cartPrice = document.getElementById("price-total");
    cartPrice.innerHTML = totalPrice;
    if (totalPrice == 0) {
        showEmptyCartMessage();
    }
}

function calculatePriceTotal() {
    let cart = localStorage.getItem("cart") || "[]";
    cart = JSON.parse(cart);

    var priceTotal = 0;
    cart.forEach();
        document.getElementById("cart-link").innerHTML = "Cart (" + cart.length + ")";

    return priceTotal.toFixed(2);
}










