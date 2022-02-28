var __awaiter = (this ) || ;
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
    if (initialShoppingCart.cartItems) 
    handleCheckoutButton();
    function handleCheckoutButton() {
        let checkoutButton = document.querySelector("button");
        if (initialShoppingCart.cartItems === undefined ) {
            checkoutButton.disabled = true;
            printNoContentContent();
        }
    }
    function printNoContentContent() {
        let noContentContent = document.createElement("h3");
        noContentContent.innerHTML = `There are no items in your shopping cart.`;
        cartSection.insertBefore(noContentContent, cartSection.firstChild);
    }
    
    
    
    
    
});
