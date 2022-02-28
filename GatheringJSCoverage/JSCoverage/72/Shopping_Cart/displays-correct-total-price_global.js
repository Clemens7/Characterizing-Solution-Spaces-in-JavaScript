const LOCAL_STORAGE_KEY = 'cart';

/**
 * Sets the number of elements currently in the cart
 */
function setCartNumber() {
    let cartLink = document.getElementById('cart-link');
    let cartStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (cartStorage != null) {
        let cart = JSON.parse(cartStorage);
        if (cart.length != 0) {
            cartLink.innerText = `Cart (${cart.length})`;
        }
    }
}