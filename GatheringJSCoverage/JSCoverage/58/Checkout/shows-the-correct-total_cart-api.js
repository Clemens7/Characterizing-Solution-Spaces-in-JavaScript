const cartKey = "cart";

export class CartItem {
    
} 

export function getCartItems() {
    ensureCartInitialized();
    return getLocalStorageItem(cartKey);
}

export 

export 

export 

export 

export 

function ensureCartInitialized() {
    const item = localStorage.getItem(cartKey);
    if (item === null) 
    const parsed = JSON.parse(item);
    if (!Array.isArray(parsed)) 
}



function getLocalStorageItem(key) {
    const value = localStorage[key];
    return JSON.parse(value);
}