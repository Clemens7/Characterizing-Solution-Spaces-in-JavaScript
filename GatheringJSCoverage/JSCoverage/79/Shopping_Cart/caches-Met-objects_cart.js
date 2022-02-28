
let cart = 'cart';

export function getItemsFromStorage() {
return window.localStorage[cart] ? JSON.parse(window.localStorage.getItem(cart)) ;
}

export 

export 

export function displayCartCount() {
    const cartLink = document.getElementById("cart-link");
    const count = getItemsFromStorage().length;
    if (count > 0) {
        cartLink.innerHTML = "Cart (" + count + ")";
    }
}