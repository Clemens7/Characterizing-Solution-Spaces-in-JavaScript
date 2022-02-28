const cartKey = "cart";

export class CartItem {
    
} 

export function getCartItems() {
    ensureCartInitialized();
    return getLocalStorageItem(cartKey);
}

export function showNumCartItems(){
    let cart = document.getElementById("cart-link");
    let cart_items = getCartItems().length;
    if (cart_items > 0) else {
        cart.innerHTML = "Cart";
    }
}

export 

export 

export function cartIsEmpty() {
    ensureCartInitialized();
    return getCartItems().length === 0;
}

export 

function ensureCartInitialized() {
    const item = localStorage.getItem(cartKey);
    if (item === null) {
        setLocalStorageItem(cartKey, []);
    }
    const parsed = JSON.parse(item);
    if (!Array.isArray(parsed)) {
        setLocalStorageItem(cartKey, []);
    }
}

function setLocalStorageItem(key, object) {
    const str = JSON.stringify(object);
    localStorage.setItem(key, str);
}

function getLocalStorageItem(key) {
    const value = localStorage[key];
    return JSON.parse(value);
}