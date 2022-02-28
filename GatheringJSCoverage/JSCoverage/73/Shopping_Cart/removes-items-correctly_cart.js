var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    
    return new (P || (P = Promise))(function (resolve, reject) {
        
        
        function step(result) { result.done ? resolve(result.value) ; }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { calculatePrice, render } from "./frame.js";
import { ShoppingCart } from "./classes.js";
document.addEventListener("DOMContentLoaded", () => {
    //TODO remove following comment, just for local development
    /*localStorage.setItem('cart', JSON.stringify([
        new CartItem(100, 'L', 'elegant', 28, 'wine', 75),
        new CartItem(2, 'L', 'shabby', 3.3, 'mint', 83),
        new CartItem(5, 'M', 'classic', 37, 'ivory', 0),
        new CartItem(10, 'L', 'shabby', 41, 'indigo', 48),
        new CartItem(20, 'S', 'elegant', 25, 'indigo', 61),
    ]));*/
    const initialShoppingCart = new ShoppingCart();
    initialShoppingCart.setShoppingCartLinkValue();
    const cartSection = document.getElementById('cart');
    if (initialShoppingCart.cartItems) {
        displayCartItems();
        calculateTotalPrice();
    }
    handleCheckoutButton();
    function handleCheckoutButton() {
        let checkoutButton = document.querySelector("button");
        if (initialShoppingCart.cartItems === undefined || initialShoppingCart.cartItems.length == 0) 
        else {
            checkoutButton.onclick = ;
        }
    }
    
    function calculateTotalPrice() {
        const totalPrice = initialShoppingCart.cartItems.reduce((sum, item) => { return sum + calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth); }, 0);
        document.getElementById("price-total").innerHTML = totalPrice + '';
    }
    function displayCartItems() {
        initialShoppingCart.cartItems.forEach(cartItem => {
            let imageAvailable = false;
            fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + cartItem.objectID)
                .then(res => res.json())
                .then(data => {
                if (data.primaryImageSmall) {
                    imageAvailable = true;
                }
                printDetailsToPage(cartItem, data);
            });
            setTimeout(this, 1000);
            if (imageAvailable) 
        });
    }
    function removeFromCart(objectID) {
        //instantiate new shopping cart instance, to update current cart items, if there were added new ones meanwhile
        let storageItems = new ShoppingCart();
        storageItems.cartItems = storageItems.cartItems.filter(item => item.objectID != objectID);
        storageItems.updateLocalStorage();
        let itemDOMElement = document.getElementById("preview-container-" + objectID).parentElement;
        itemDOMElement.remove();
        if (storageItems.cartItems.length == 0) 
    }
    function printDetailsToPage(cartItem, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = document.createElement("div");
            template.className = "cart-item";
            const markup = `
        <div class="cart-preview" id="preview-container-${cartItem.objectID}">
          <a href="/config.html?objectID=${cartItem.objectID}&printSize=${cartItem.printSize}&frameStyle=${cartItem.frameStyle}&frameWidth=${cartItem.frameWidth}&matColor=${cartItem.matColor}&matWidth=${cartItem.matWidth}">
            <img class="cart-thumb" src="${data.primaryImageSmall}" id="preview-${cartItem.objectID}" alt="">
          </a>
        </div>
        <div class="museum-label">
          <div>
            <span class="artist">${data.artistDisplayName}</span>
            <span class="title">${data.title}</span>,
            <span class="date">${data.objectDate}</span>
            <br><br>
            <span class="frame-description">${getFrameDescription(cartItem)}</span>
          </div>
          <div class="cart-price">€ <span id="price-0">${calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth)}</span></div>
          <button class="cart-remove"></button>
        </div>
        `;
            template.innerHTML = markup;
            cartSection.insertBefore(template, cartSection.firstChild);
            let removeButton = template.querySelector("button");
            removeButton.onclick = () => {
                removeFromCart(cartItem.objectID);
            };
        });
    }
    function getFrameDescription(cartItem) {
        let descriptionText = '';
        switch (cartItem.printSize) {
            case 'L':
                descriptionText += "Large ";
                break;
            case 'M':
                descriptionText += "Medium ";
                break;
            case 'S':
                descriptionText += "Small ";
                break;
            
        }
        descriptionText += `print in a ${cartItem.frameWidth / 10} cm ${cartItem.frameStyle} frame`;
        if (cartItem.matWidth > 0) {
            descriptionText += ` with a ${cartItem.matWidth / 10} cm ${cartItem.matColor} mat.`;
        }
        return descriptionText;
    }
});
