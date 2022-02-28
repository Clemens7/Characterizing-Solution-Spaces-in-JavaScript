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
    if (cart_items > 0){
        cart.innerHTML = `Cart (${cart_items})`;
    }
}

export 

export function removeFromCart(objectID) {
    ensureCartInitialized();
    const cart = getLocalStorageItem(cartKey);
    const filtered = cart.filter(item => item.objectID !== objectID);
    setLocalStorageItem(cartKey, filtered);
}

export function cartIsEmpty() {
    ensureCartInitialized();
    return getCartItems().length === 0;
}

export 

function ensureCartInitialized() {
    const item = localStorage.getItem(cartKey);
    if (item === null) 
    const parsed = JSON.parse(item);
    if (!Array.isArray(parsed)) 
}

function setLocalStorageItem(key, object) {
    const str = JSON.stringify(object);
    localStorage.setItem(key, str);
}

function getLocalStorageItem(key) {
    const value = localStorage[key];
    return JSON.parse(value);
}