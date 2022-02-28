const CART_STORAGE_KEY = 'cart';

export function getCartItems() {
    if (localStorage[CART_STORAGE_KEY])  else {
        return [];
    }
}

export 

export 

export function refreshNumberOfCartItems() {
    const count = getNumberOfCartItems();
    const cartText = count > 0  : 'Cart';
    document.getElementById('cart-link').innerText = cartText;
}

export 

function getNumberOfCartItems() {
    return getCartItems().length;
}
