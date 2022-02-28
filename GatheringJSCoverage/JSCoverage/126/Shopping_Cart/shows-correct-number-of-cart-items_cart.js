var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    
    return new (P || (P = Promise))(function (resolve, reject) {
        
        
        function step(result) { result.done ? resolve(result.value) ; }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { calculatePrice, render } from "./frame.js";
import { getObject } from "./met-api.js";
import { setCurrentCartCount } from "./cart-count.js";
/**
 * Requests the Cart-List of the storage.
 * If it is null it will return null.
 * If not, it will return a list of cart-objects
 *
 * @return null or a list of cart objects
 */
function getStoredCart() {
    let cartString = localStorage.getItem("cart");
    if (!cartString || cartString.length === 0 || cartString.match("null") !== null) 
    else {
        let cartList = JSON.parse(cartString);
        return cartList;
    }
}
/**
 * Checks if carts exist in the storage:
 * If there are no items in the cart, the message “There are no items in your shopping cart.” will be shown
 * and the checkout button will be disabled.
 */
function checkForEmptyCartsToDisplayTextAndDisableButton() {
    let carts = getStoredCart();
    if (carts.length === 0) {
        let cartSectionHTML = document.getElementById("cart");
        if (!cartSectionHTML) 
        else {
            //create text element and add it to the cart-section
            const emptyCartDiv = document.createElement('div');
            const emptyCartSpan = document.createElement('span');
            emptyCartSpan.textContent = "There are no items in your shopping cart.";
            emptyCartDiv.appendChild(emptyCartSpan);
            cartSectionHTML.appendChild(emptyCartDiv);
            //get checkout-button and disable it
            let checkoutButtonHTML = document.getElementById("checkout-button");
            if (!checkoutButtonHTML) 
            else {
                checkoutButtonHTML.disabled = true;
            }
        }
    }
}
/**
 * Adds the price for each cart.
 * Calculates the total price of all carts and adds it to the 'price-total'-span.
 */
function calculateAndSetCartPrices() {
    return __awaiter(this, void 0, void 0, function* () {
        let carts = getStoredCart();
        if (carts != null) {
            let priceTotal = 0;
            for (let cartObject of carts) 
            // set the total price of all carts
            let priceTotalHTML = document.getElementById("price-total");
            if (!priceTotalHTML) 
            else {
                priceTotalHTML.innerHTML = priceTotal.toFixed(2);
            }
        }
    });
}
/**
 * Get the count of current carts in the storage and set
 * the count in the header in parentheses next to the cart-text
 */
function displayCarts() {
    return __awaiter(this, void 0, void 0, function* () {
        let carts = getStoredCart();
        let checkoutBtn = document.getElementById("checkout-button");
        checkoutBtn.addEventListener('onclick', );
        for (let i = 0; i < carts.length; i++) });
}

checkForEmptyCartsToDisplayTextAndDisableButton();
displayCarts();
setCurrentCartCount();
calculateAndSetCartPrices();
