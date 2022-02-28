var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
    if (carts.length === 0) 
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
            for (let cartObject of carts) {
                //calculate the price and add it to the total price
                const price = calculatePrice(cartObject.printSize, cartObject.frameStyle, cartObject.frameWidth, cartObject.matWidth);
                priceTotal += price;
                //set the calculated price in the html element and add the price to the total sum
                let cartPriceHTML = document.getElementById(`price-${cartObject.objectID}`);
                if (!cartPriceHTML) {
                    console.log(`Could not find an Element with the ID price-${cartObject.objectID}`);
                }
            }
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
        for (let i = 0; i < carts.length; i++) {
            // create cart-item-div
            let cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            // create cart-preview-div
            let cartPreviewDiv = document.createElement('div');
            cartPreviewDiv.className = 'cart-preview';
            cartPreviewDiv.id = `preview-container-${carts[i].objectID}`;
            let cartLink = document.createElement('a');
            cartLink.setAttribute('href', `config.html?objectID=${carts[i].objectID}&printSize=${carts[i].printSize}&frameStyle=${carts[i].frameStyle}&frameWidth=${carts[i].frameWidth}&matColor=${carts[i].matColor}&matWidth=${carts[i].matWidth}`);
            let artwork = yield getObject(carts[i].objectID);
            let cartImage = document.createElement('img');
            cartImage.className = 'cart-thumb';
            cartImage.id = `preview-${carts[i].objectID}`;
            cartImage.setAttribute('src', artwork.primaryImageSmall);
            cartImage.addEventListener('load', () => render(cartImage, cartPreviewDiv, carts[i].printSize, carts[i].frameStyle, carts[i].frameWidth, carts[i].matColor, carts[i].matWidth));
            cartLink.appendChild(cartImage);
            cartPreviewDiv.appendChild(cartLink);
            // create museum-label-div
            let museumLabelDiv = document.createElement('div');
            museumLabelDiv.className = 'museum-label';
            let museumLabelInnerDiv = document.createElement('div');
            let artistSpan = document.createElement('span');
            artistSpan.className = 'artist';
            artistSpan.innerText = artwork.artistDisplayName;
            let titleSpan = document.createElement('span');
            titleSpan.className = 'title';
            titleSpan.innerText = artwork.title + ", ";
            let dateSpan = document.createElement('span');
            dateSpan.className = 'date';
            dateSpan.innerText = artwork.objectDate;
            let museumLabelBr1 = document.createElement('br');
            let museumLabelBr2 = document.createElement('br');
            let frameDescriptionSpan = document.createElement('span');
            frameDescriptionSpan.className = 'frame-description';
            let frameSize;
            switch (carts[i].printSize) {
                case "S":
                    frameSize = "Small";
                    break;
                case "M":
                    frameSize = "Medium";
                    break;
                default: frameSize = "Large";
            }
            if (carts[i].matWidth === 0) 
            else {
                frameDescriptionSpan.innerText = `${frameSize} print in a ${carts[i].frameWidth / 10} cm ${carts[i].frameStyle} frame with a ${carts[i].matWidth / 10} cm ${carts[i].matColor} mat.`;
            }
            let cartPriceDiv = document.createElement('div');
            cartPriceDiv.className = 'cart-price';
            let priceSpan = document.createElement('span');
            priceSpan.id = `price-${carts[i].objectID}`;
            const price = calculatePrice(carts[i].printSize, carts[i].frameStyle, carts[i].frameWidth, carts[i].matWidth);
            priceSpan.innerText = price.toFixed(2);
            cartPriceDiv.innerText = `€`; // DON´T KNOW IF THIS WORKS
            cartPriceDiv.appendChild(priceSpan);
            let removeButton = document.createElement('button');
            removeButton.className = 'cart-remove';
            removeButton.addEventListener("click", );
            museumLabelInnerDiv.appendChild(artistSpan);
            museumLabelInnerDiv.appendChild(titleSpan);
            museumLabelInnerDiv.appendChild(dateSpan);
            museumLabelInnerDiv.appendChild(museumLabelBr1);
            museumLabelInnerDiv.appendChild(museumLabelBr2);
            museumLabelInnerDiv.appendChild(frameDescriptionSpan);
            museumLabelDiv.appendChild(museumLabelInnerDiv);
            museumLabelDiv.appendChild(cartPriceDiv);
            museumLabelDiv.appendChild(removeButton);
            // add elements to cart-item-div
            cartItemDiv.appendChild(cartPreviewDiv);
            cartItemDiv.appendChild(museumLabelDiv);
            let cartSection = document.getElementById('cart');
            if (cartSection !== null) {
                cartSection.prepend(cartItemDiv);
            }
        }
    });
}

checkForEmptyCartsToDisplayTextAndDisableButton();
displayCarts();
setCurrentCartCount();
calculateAndSetCartPrices();
